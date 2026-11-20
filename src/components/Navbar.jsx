import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  MapPin,
  ChevronDown,
  ShoppingBag,
  Bell,
  LogOut,
  UtensilsCrossed,
  Volume2,
  VolumeX,
  Bike,
  Clock,
  CheckCheck,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LOCATIONS, ORDER_STAGES } from '../data/mockData';

export default function Navbar() {
  const {
    user,
    logout,
    location,
    setLocation,
    getCartTotals,
    notifications,
    unreadCount,
    markAllNotificationsRead,
    clearNotifications,
    soundEnabled,
    setSoundEnabled,
    activeOrder,
    setTrackingOrderId,
  } = useApp();

  const { pathname } = useLocation();
  const { itemCount } = getCartTotals();
  const [showLocMenu, setShowLocMenu] = useState(false);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand + Location Picker */}
        <div className="flex items-center gap-4 min-w-0">
          <Link to="/" className="flex items-center gap-2 shrink-0 group">
            <div className="w-9 h-9 rounded-xl bg-brand text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight text-slate-900 hidden sm:block">
              Tasty<span className="text-brand">Kitchens</span>
            </span>
          </Link>

          <div className="relative">
            <button
              onClick={() => setShowLocMenu((v) => !v)}
              className="flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-brand px-2.5 py-1.5 rounded-lg hover:bg-orange-50 transition max-w-[200px] sm:max-w-xs"
            >
              <MapPin className="w-4 h-4 text-brand shrink-0" />
              <span className="truncate">{location}</span>
              <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />
            </button>

            {showLocMenu && (
              <div className="absolute left-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg py-1.5 z-50">
                <p className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase">
                  Select Delivery Area
                </p>
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocation(loc);
                      setShowLocMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-orange-50 flex items-center gap-2 ${
                      location === loc ? 'text-brand font-semibold bg-orange-50/50' : 'text-slate-700'
                    }`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Live Active Order Pill */}
          {activeOrder && (
            <button
              onClick={() => setTrackingOrderId(activeOrder.id)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition animate-pulse"
            >
              <Bike className="w-4 h-4 text-emerald-600" />
              <span>{ORDER_STAGES[activeOrder.statusIndex].label}</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white">
                {ORDER_STAGES[activeOrder.statusIndex].eta}m
              </span>
            </button>
          )}

          {/* Orders Link */}
          <Link
            to="/orders"
            className={`hidden sm:flex items-center gap-1.5 text-sm font-semibold px-2.5 py-1.5 rounded-lg transition ${
              pathname === '/orders'
                ? 'text-brand bg-orange-50'
                : 'text-slate-700 hover:text-brand hover:bg-slate-100'
            }`}
          >
            <Clock className="w-4 h-4" />
            Orders
          </Link>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled((s) => !s)}
            title={soundEnabled ? 'Mute notification chimes' : 'Unmute notification chimes'}
            className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Real-Time Notification Bell */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifPanel((v) => !v);
                if (!showNotifPanel) markAllNotificationsRead();
              }}
              className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifPanel && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900">Live Notifications</span>
                    <span className="text-[11px] bg-orange-100 text-brand font-semibold px-2 py-0.5 rounded-full">
                      {notifications.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                    >
                      <CheckCheck className="w-3.5 h-3.5" /> Read
                    </button>
                    <button
                      onClick={clearNotifications}
                      className="text-xs text-rose-500 hover:text-rose-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Clear
                    </button>
                  </div>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <p className="p-6 text-center text-sm text-slate-400">
                      No notifications yet. Place an order to see live updates!
                    </p>
                  ) : (
                    notifications.map((n) => (
                      <div key={n.id} className="px-4 py-3 hover:bg-slate-50 transition">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-semibold text-slate-900">{n.title}</p>
                          <span className="text-[11px] text-slate-400 shrink-0">{n.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{n.message}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Button */}
          <Link
            to="/cart"
            className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-sm transition ${
              pathname === '/cart'
                ? 'bg-brand text-white'
                : 'bg-orange-50 text-brand hover:bg-brand hover:text-white'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {itemCount > 0 && (
              <span className="px-1.5 py-0.5 text-xs rounded-full bg-slate-900 text-white">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User + Logout */}
          {user && (
            <button
              onClick={logout}
              title={`Sign out (${user.name})`}
              className="p-2 rounded-lg text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}