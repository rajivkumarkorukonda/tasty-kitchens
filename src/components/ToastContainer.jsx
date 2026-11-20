import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success'
            ? CheckCircle2
            : toast.type === 'warning'
            ? AlertTriangle
            : Info;

        const accent =
          toast.type === 'success'
            ? 'border-emerald-500 text-emerald-600'
            : toast.type === 'warning'
            ? 'border-amber-500 text-amber-600'
            : 'border-brand text-brand';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-white border-l-4 ${accent} rounded-xl shadow-xl p-3.5 flex items-start gap-3 transition-all`}
          >
            <Icon className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 leading-tight">{toast.title}</p>
              <p className="text-xs text-slate-600 mt-0.5 leading-snug">{toast.message}</p>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}