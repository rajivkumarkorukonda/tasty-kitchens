import { AlertTriangle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ReplaceCartModal() {
  const { conflictModal, setConflictModal, cart, addItemToCart } = useApp();

  if (!conflictModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="w-11 h-11 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">Items already in cart</h3>
        <p className="text-sm text-slate-600 mt-2">
          Your cart contains items from <span className="font-semibold">{cart.restaurantName}</span>.
          Would you like to reset your cart and add{' '}
          <span className="font-semibold">{conflictModal.item.name}</span> from{' '}
          <span className="font-semibold">{conflictModal.restaurant.name}</span>?
        </p>

        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setConflictModal(null)}
            className="flex-1 py-2.5 rounded-xl border border-slate-300 font-semibold text-sm text-slate-700 hover:bg-slate-50 transition"
          >
            No, Keep Current
          </button>
          <button
            onClick={() => addItemToCart(conflictModal.restaurant, conflictModal.item, true)}
            className="flex-1 py-2.5 rounded-xl bg-brand text-white font-semibold text-sm hover:bg-brand-dark transition"
          >
            Yes, Start Fresh
          </button>
        </div>
      </div>
    </div>
  );
}