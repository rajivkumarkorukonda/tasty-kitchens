import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Plus,
  Minus,
  Tag,
  MapPin,
  CreditCard,
  Wallet,
  Banknote,
  ShoppingBag,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { COUPONS } from '../data/mockData';

export default function CartPage() {
  const {
    cart,
    location,
    updateItemQty,
    clearCart,
    applyCoupon,
    removeCoupon,
    getCartTotals,
    placeOrder,
  } = useApp();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [address, setAddress] = useState(`Flat 402, Cyber Residency, ${location}`);
  const [instructions, setInstructions] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const totals = getCartTotals();

  if (cart.items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-orange-50 text-brand mx-auto flex items-center justify-center mb-5">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900">Your cart is empty</h2>
        <p className="text-sm text-slate-500 mt-2">
          Add delicious dishes from top kitchens near you to get started.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm hover:bg-brand-dark transition"
        >
          Browse Restaurants
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    placeOrder({ address, paymentMethod, instructions });
    navigate('/orders');
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 grid lg:grid-cols-3 gap-6 pb-20">
      {/* Left: Cart Items + Address + Payment */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
            <div>
              <p className="text-xs font-semibold text-slate-400 uppercase">Ordering From</p>
              <h2 className="text-lg font-extrabold text-slate-900">{cart.restaurantName}</h2>
            </div>
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear Cart
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {cart.items.map((item) => (
              <div key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`w-3.5 h-3.5 rounded border-2 shrink-0 flex items-center justify-center ${
                      item.isVeg ? 'border-emerald-600' : 'border-rose-600'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        item.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
                      }`}
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">₹{item.price} each</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex items-center gap-2.5 px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 font-bold text-xs">
                    <button
                      onClick={() => updateItemQty(item.id, -1)}
                      className="text-slate-600 hover:text-rose-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => updateItemQty(item.id, 1)}
                      className="text-emerald-600 hover:text-emerald-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <span className="font-bold text-sm text-slate-900 w-16 text-right">
                    ₹{item.price * item.qty}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Any cooking instructions? (e.g. Make it less spicy, no cutlery)"
            className="mt-4 w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2 mb-3">
            <MapPin className="w-4 h-4 text-brand" /> Delivery Address
          </h3>
          <textarea
            rows={2}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand"
          />
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <h3 className="font-extrabold text-base text-slate-900 mb-3">Payment Method</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { id: 'UPI', label: 'UPI / GPay', icon: Wallet },
              { id: 'CARD', label: 'Credit / Debit Card', icon: CreditCard },
              { id: 'COD', label: 'Cash on Delivery', icon: Banknote },
            ].map((m) => {
              const Icon = m.icon;
              const active = paymentMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPaymentMethod(m.id)}
                  className={`p-3.5 rounded-xl border-2 text-left flex items-center gap-2.5 transition ${
                    active
                      ? 'border-brand bg-orange-50 text-brand font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50 font-medium'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{m.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right: Coupons & Bill Details */}
      <div className="space-y-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-1.5 mb-3">
            <Tag className="w-4 h-4 text-brand" /> Apply Coupon
          </h3>

          {cart.couponCode ? (
            <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3.5 py-2.5">
              <div>
                <p className="text-xs font-extrabold text-emerald-800">{cart.couponCode} Applied</p>
                <p className="text-[11px] text-emerald-700">You saved ₹{totals.discount}!</p>
              </div>
              <button
                onClick={removeCoupon}
                className="text-xs font-bold text-rose-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ) : (
            <>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter TASTY50 or FREEDEL"
                  className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs uppercase focus:outline-none focus:ring-2 focus:ring-brand"
                />
                <button
                  onClick={() => {
                    if (applyCoupon(couponInput)) setCouponInput('');
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand transition"
                >
                  Apply
                </button>
              </div>
              <div className="mt-3 space-y-1.5">
                {Object.values(COUPONS).map((c) => (
                  <button
                    key={c.code}
                    onClick={() => applyCoupon(c.code)}
                    className="w-full text-left text-[11px] px-3 py-2 rounded-lg bg-slate-50 hover:bg-orange-50 border border-dashed border-slate-300 flex justify-between items-center"
                  >
                    <span className="font-bold text-slate-800">{c.code}</span>
                    <span className="text-slate-500 truncate ml-2">{c.description}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3">
          <h3 className="font-extrabold text-base text-slate-900">Bill Details</h3>

          <div className="space-y-2 text-sm text-slate-600">
            <div className="flex justify-between">
              <span>Item Total</span>
              <span>₹{totals.itemTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>
                {totals.deliveryFee === 0 ? (
                  <span className="text-emerald-600 font-bold">FREE</span>
                ) : (
                  `₹${totals.deliveryFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹{totals.platformFee}</span>
            </div>
            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{totals.gst}</span>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-semibold">
                <span>Coupon Discount</span>
                <span>- ₹{totals.discount}</span>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 pt-3 flex justify-between font-extrabold text-base text-slate-900">
            <span>TO PAY</span>
            <span>₹{totals.grandTotal}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full mt-2 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-lg shadow-emerald-100 transition"
          >
            Place Order • ₹{totals.grandTotal}
          </button>
        </div>
      </div>
    </main>
  );
}