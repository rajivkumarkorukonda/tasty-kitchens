import { X, Bike, Phone, CheckCircle2, ChefHat, Package, Navigation, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ORDER_STAGES } from '../data/mockData';

export default function LiveOrderTracker() {
  const { orders, trackingOrderId, setTrackingOrderId, notify } = useApp();

  if (!trackingOrderId) return null;
  const order = orders.find((o) => o.id === trackingOrderId);
  if (!order) return null;

  const currentStage = ORDER_STAGES[order.statusIndex];
  const progressPercent = Math.round((order.statusIndex / (ORDER_STAGES.length - 1)) * 100);
  const isDelivered = order.statusIndex === ORDER_STAGES.length - 1;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-brand px-2 py-0.5 rounded-full">
                {isDelivered ? 'COMPLETED' : 'LIVE TRACKING'}
              </span>
              <span className="text-xs text-slate-400">{order.id}</span>
            </div>
            <h2 className="text-xl font-extrabold mt-1.5">{currentStage.label}</h2>
            <p className="text-sm text-slate-300 mt-0.5">{currentStage.desc}</p>
          </div>
          <button
            onClick={() => setTrackingOrderId(null)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Simulated Live Route Map Card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-orange-50 border border-slate-200 p-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-3">
              <span className="flex items-center gap-1.5">
                <ChefHat className="w-4 h-4 text-brand" /> {order.restaurantName}
              </span>
              <span className="flex items-center gap-1 text-emerald-700 font-bold">
                <Navigation className="w-3.5 h-3.5" />
                {isDelivered ? 'Arrived!' : `ETA ${currentStage.eta} mins`}
              </span>
            </div>

            <div className="relative h-3 bg-white rounded-full overflow-hidden border border-slate-200">
              <div
                className="h-full bg-gradient-to-r from-brand to-emerald-500 transition-all duration-700 rounded-full"
                style={{ width: `${Math.max(8, progressPercent)}%` }}
              />
            </div>

            <div className="mt-2 flex justify-between text-[11px] text-slate-500">
              <span>Kitchen</span>
              <span className="font-semibold text-brand">{progressPercent}% complete</span>
              <span>Your Doorstep</span>
            </div>
          </div>

          {/* Delivery Partner Card (Visible once assigned) */}
          {order.statusIndex >= 3 && (
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-brand/15 text-brand flex items-center justify-center">
                  <Bike className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900">{order.partner.name}</p>
                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    {order.partner.rating} • {order.partner.vehicle}
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  notify('Calling Delivery Partner', `Connecting to ${order.partner.name} (${order.partner.phone})...`, 'info')
                }
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
              >
                <Phone className="w-3.5 h-3.5" /> Call
              </button>
            </div>
          )}

          {/* Step-by-Step Live Timeline */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Live Order Timeline
            </h4>
            <div className="space-y-3">
              {ORDER_STAGES.map((stage, idx) => {
                const completed = idx <= order.statusIndex;
                const active = idx === order.statusIndex;
                return (
                  <div key={stage.key} className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                        completed ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                      } ${active && !isDelivered ? 'ring-4 ring-emerald-100 animate-pulse' : ''}`}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <Package className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          completed ? 'text-slate-900' : 'text-slate-400'
                        }`}
                      >
                        {stage.label}
                      </p>
                      {active && <p className="text-xs text-slate-500">{stage.desc}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order Items Summary */}
          <div className="border-t border-slate-100 pt-4 text-xs text-slate-600 space-y-1">
            <p className="font-bold text-slate-900 text-sm mb-1.5">Order Summary</p>
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.qty} × {item.name}
                </span>
                <span className="font-medium">₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="flex justify-between pt-2 border-t border-slate-100 font-bold text-slate-900 text-sm">
              <span>Total Paid ({order.paymentMethod})</span>
              <span>₹{order.totals.grandTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}