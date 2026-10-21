import React from 'react';
import { useCart } from '../context/CartContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const ToastNotification = () => {
  const { toasts, removeToast } = useCart();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarn = toast.type === 'warn';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${
              isSuccess
                ? 'bg-stone-900/95 text-white border-orange-500/40 shadow-orange-950/20'
                : isWarn
                ? 'bg-amber-900/95 text-white border-amber-500/40'
                : 'bg-stone-900/95 text-white border-stone-700'
            }`}
          >
            <div className="flex items-center gap-3">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-orange-400 shrink-0" />}
              {isWarn && <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />}
              {!isSuccess && !isWarn && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
              <p className="text-sm font-medium leading-tight">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

