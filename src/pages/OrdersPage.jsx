import { Link, useNavigate } from 'react-router-dom';
import { Bike, RotateCcw, Star, Clock, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ORDER_STAGES } from '../data/mockData';

export default function OrdersPage() {
  const { orders, setTrackingOrderId, reorderItems, rateOrder } = useApp();
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <Clock className="w-14 h-14 text-slate-300 mx-auto mb-4" />
        <h2 className="text-2xl font-extrabold text-slate-900">No orders yet</h2>
        <p className="text-sm text-slate-500 mt-1">
          Place your first order to watch real-time kitchen and delivery updates live.
        </p>
        <Link
          to="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-brand text-white font-bold text-sm"
        >
          Explore Kitchens
        </Link>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5 pb-20">
      <h1 className="text-2xl font-extrabold text-slate-900">Your Orders</h1>

      {orders.map((order) => {
        const stage = ORDER_STAGES[order.statusIndex];
        const isDelivered = order.statusIndex === ORDER_STAGES.length - 1;

        return (
          <div
            key={order.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900">
                    {order.restaurantName}
                  </h3>
                  <span className="text-xs text-slate-400">{order.id}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  {new Date(order.createdAt).toLocaleString()} • {order.paymentMethod}
                </p>
              </div>

              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isDelivered
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'bg-orange-50 text-brand animate-pulse'
                }`}
              >
                {isDelivered ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Bike className="w-3.5 h-3.5" />}
                {stage.label}
              </span>
            </div>

            <div className="text-sm text-slate-700 space-y-1">
              {order.items.map((item) => (
                <p key={item.id} className="text-xs">
                  {item.qty} × {item.name}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
              <p className="font-extrabold text-sm text-slate-900">
                Total: ₹{order.totals.grandTotal}
              </p>

              <div className="flex flex-wrap items-center gap-2.5">
                {isDelivered && (
                  <div className="flex items-center gap-1 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => rateOrder(order.id, star)}
                        aria-label={`Rate ${star} stars`}
                      >
                        <Star
                          className={`w-4 h-4 transition ${
                            star <= order.userRating
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-slate-300 hover:text-amber-400'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                )}

                <button
                  onClick={() => setTrackingOrderId(order.id)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand transition"
                >
                  {isDelivered ? 'View Summary' : 'Track Live'}
                </button>

                <button
                  onClick={() => {
                    reorderItems(order);
                    navigate('/cart');
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Reorder
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </main>
  );
}