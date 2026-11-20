import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { COUPONS, LOCATIONS, ORDER_STAGES } from '../data/mockData';
import {
  playNotificationChime,
  requestBrowserNotificationPermission,
  triggerBrowserNotification,
} from '../utils/notifications';

const AppContext = createContext(null);

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function AppProvider({ children }) {
  const [user, setUser] = useState(() => loadJSON('tk_user', null));
  const [location, setLocation] = useState(() => loadJSON('tk_location', LOCATIONS[0]));
  const [favorites, setFavorites] = useState(() => loadJSON('tk_favorites', []));
  const [cart, setCart] = useState(() =>
    loadJSON('tk_cart', {
      restaurantId: null,
      restaurantName: '',
      items: [],
      couponCode: null,
    })
  );
  const [orders, setOrders] = useState(() => loadJSON('tk_orders', []));
  const [notifications, setNotifications] = useState(() => loadJSON('tk_notifications', []));
  const [toasts, setToasts] = useState([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [conflictModal, setConflictModal] = useState(null);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const notifiedStagesRef = useRef(new Set());

  // Persist to localStorage
  useEffect(() => localStorage.setItem('tk_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('tk_location', JSON.stringify(location)), [location]);
  useEffect(() => localStorage.setItem('tk_favorites', JSON.stringify(favorites)), [favorites]);
  useEffect(() => localStorage.setItem('tk_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('tk_orders', JSON.stringify(orders)), [orders]);
  useEffect(
    () => localStorage.setItem('tk_notifications', JSON.stringify(notifications.slice(0, 30))),
    [notifications]
  );

  // Unified Real-Time Notification Dispatcher
  const notify = useCallback(
    (title, message, type = 'info', browserPush = false) => {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      setToasts((prev) => [{ id, title, message, type }, ...prev].slice(0, 4));
      setNotifications((prev) => [
        { id, title, message, type, timestamp, read: false },
        ...prev,
      ]);

      if (soundEnabled) playNotificationChime(type);
      if (browserPush) triggerBrowserNotification(title, message);

      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 4500);
    },
    [soundEnabled]
  );

  const dismissToast = (id) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearNotifications = () => setNotifications([]);

  // Auth Actions
  const login = (userData) => {
    setUser(userData);
    requestBrowserNotificationPermission();
    notify('Welcome to Tasty Kitchens!', `Delivering hot meals to ${location}.`, 'success');
  };

  const logout = () => {
    setUser(null);
    setTrackingOrderId(null);
  };

  // Favorites
  const toggleFavorite = (restaurantId, restaurantName) => {
    setFavorites((prev) => {
      const exists = prev.includes(restaurantId);
      if (exists) {
        notify('Removed from Favorites', `${restaurantName} removed from saved kitchens.`, 'info');
        return prev.filter((id) => id !== restaurantId);
      }
      notify('Saved to Favorites', `${restaurantName} added to your favorites.`, 'success');
      return [...prev, restaurantId];
    });
  };

  // Cart Actions with Single-Restaurant Guard
  const addItemToCart = (restaurant, item, forceReplace = false) => {
    if (
      cart.restaurantId &&
      cart.restaurantId !== restaurant.id &&
      cart.items.length > 0 &&
      !forceReplace
    ) {
      setConflictModal({ restaurant, item });
      return;
    }

    setCart((prev) => {
      const baseItems = forceReplace ? [] : prev.items;
      const existing = baseItems.find((i) => i.id === item.id);
      const updatedItems = existing
        ? baseItems.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i))
        : [...baseItems, { ...item, qty: 1 }];

      return {
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        items: updatedItems,
        couponCode: forceReplace ? null : prev.couponCode,
      };
    });

    if (forceReplace) {
      setConflictModal(null);
      notify('Cart Replaced', `Started a fresh cart from ${restaurant.name}.`, 'info');
    }
  };

  const updateItemQty = (itemId, delta) => {
    setCart((prev) => {
      const updated = prev.items
        .map((i) => (i.id === itemId ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);

      if (updated.length === 0) {
        return { restaurantId: null, restaurantName: '', items: [], couponCode: null };
      }
      return { ...prev, items: updated };
    });
  };

  const clearCart = () => {
    setCart({ restaurantId: null, restaurantName: '', items: [], couponCode: null });
  };

  const applyCoupon = (rawCode) => {
    const code = rawCode.trim().toUpperCase();
    const coupon = COUPONS[code];
    const itemTotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

    if (!coupon) {
      notify('Invalid Coupon', `Code "${code}" is not valid. Try TASTY50 or FREEDEL.`, 'warning');
      return false;
    }
    if (itemTotal < coupon.minOrder) {
      notify(
        'Minimum Order Not Met',
        `Add ₹${coupon.minOrder - itemTotal} more to apply ${code}.`,
        'warning'
      );
      return false;
    }

    setCart((prev) => ({ ...prev, couponCode: code }));
    notify('Coupon Applied!', `${code} unlocked instant savings.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setCart((prev) => ({ ...prev, couponCode: null }));
  };

  // Bill Summary Calculator
  const getCartTotals = () => {
    const itemCount = cart.items.reduce((sum, i) => sum + i.qty, 0);
    const itemTotal = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    let deliveryFee = itemTotal > 0 ? 39 : 0;
    const platformFee = itemTotal > 0 ? 6 : 0;
    let discount = 0;

    if (cart.couponCode && COUPONS[cart.couponCode]) {
      const c = COUPONS[cart.couponCode];
      if (itemTotal >= c.minOrder) {
        if (c.type === 'PERCENT') {
          discount = Math.min(Math.round((itemTotal * c.value) / 100), c.maxDiscount);
        } else if (c.type === 'FREE_DELIVERY') {
          discount = deliveryFee;
          deliveryFee = 0;
        }
      }
    }

    const gst = Math.round((itemTotal - (cart.couponCode === 'FREEDEL' ? 0 : discount)) * 0.05);
    const grandTotal = Math.max(
      0,
      itemTotal + deliveryFee + platformFee + gst - (cart.couponCode === 'FREEDEL' ? 0 : discount)
    );

    return { itemCount, itemTotal, deliveryFee, platformFee, gst, discount, grandTotal };
  };

  // Place Order & Kick Off Real-Time Simulation
  const placeOrder = ({ address, paymentMethod, instructions }) => {
    const totals = getCartTotals();
    const orderId = `TK-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder = {
      id: orderId,
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantName,
      items: cart.items,
      totals,
      address,
      paymentMethod,
      instructions,
      createdAt: new Date().toISOString(),
      statusIndex: 0,
      nextUpdateAt: Date.now() + 6000,
      userRating: 0,
      partner: {
        name: 'Karthik Reddy',
        rating: 4.9,
        phone: '+91 98480 11223',
        vehicle: 'TS 07 EX 4421',
      },
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setTrackingOrderId(orderId);

    notify(
      `Order ${orderId} Placed!`,
      `Sent to ${newOrder.restaurantName}. Live tracking started.`,
      'success',
      true
    );
    return orderId;
  };

  const reorderItems = (order) => {
    setCart({
      restaurantId: order.restaurantId,
      restaurantName: order.restaurantName,
      items: order.items,
      couponCode: null,
    });
    notify('Added to Cart', `Items from ${order.restaurantName} restored to your cart.`, 'success');
  };

  const rateOrder = (orderId, stars) => {
    setOrders((prev) => prev.map((o) => (o.id === orderId ? { ...o, userRating: stars } : o)));
    notify('Thanks for Rating!', `You rated order ${orderId} ${stars} stars.`, 'success');
  };

  // Real-Time Order Status Progression Loop (Simulates live WebSocket push events)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setOrders((prevOrders) => {
        let changed = false;
        const nextOrders = prevOrders.map((order) => {
          if (order.statusIndex < ORDER_STAGES.length - 1 && now >= order.nextUpdateAt) {
            changed = true;
            const nextIdx = order.statusIndex + 1;
            const stage = ORDER_STAGES[nextIdx];
            const eventKey = `${order.id}-${nextIdx}`;

            if (!notifiedStagesRef.current.has(eventKey)) {
              notifiedStagesRef.current.add(eventKey);
              const isDelivered = nextIdx === ORDER_STAGES.length - 1;
              setTimeout(() => {
                notify(
                  `${stage.label} (${order.id})`,
                  stage.desc,
                  isDelivered ? 'success' : 'info',
                  true
                );
              }, 0);
            }

            return {
              ...order,
              statusIndex: nextIdx,
              nextUpdateAt: now + 7500,
            };
          }
          return order;
        });

        return changed ? nextOrders : prevOrders;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [notify]);

  const activeOrder = orders.find((o) => o.statusIndex < ORDER_STAGES.length - 1) || null;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        location,
        setLocation,
        favorites,
        toggleFavorite,
        cart,
        addItemToCart,
        updateItemQty,
        clearCart,
        applyCoupon,
        removeCoupon,
        getCartTotals,
        orders,
        activeOrder,
        placeOrder,
        reorderItems,
        rateOrder,
        notifications,
        unreadCount,
        markAllNotificationsRead,
        clearNotifications,
        toasts,
        notify,
        dismissToast,
        soundEnabled,
        setSoundEnabled,
        conflictModal,
        setConflictModal,
        trackingOrderId,
        setTrackingOrderId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);