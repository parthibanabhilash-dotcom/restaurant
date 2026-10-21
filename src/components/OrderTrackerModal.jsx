import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Bike, 
  ShoppingBag, 
  Copy, 
  Printer, 
  Sparkles 
} from 'lucide-react';

export const OrderTrackerModal = () => {
  const { isOrderTrackerOpen, setIsOrderTrackerOpen, activeOrder, addToast } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 0: placed, 1: preparing, 2: delivery, 3: completed
  const [minutesLeft, setMinutesLeft] = useState(26);

  useEffect(() => {
    if (!isOrderTrackerOpen) return;
    // Simulate step progression
    const timer = setInterval(() => {
      setMinutesLeft((m) => Math.max(1, m - 1));
    }, 15000);

    return () => clearInterval(timer);
  }, [isOrderTrackerOpen]);

  if (!isOrderTrackerOpen || !activeOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard?.writeText(activeOrder.orderId);
    addToast(`Order ID ${activeOrder.orderId} copied!`, 'info');
  };

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { label: 'Order Confirmed', icon: CheckCircle2, desc: 'Kitchen received order' },
    { label: 'Crafting in Kitchen', icon: ChefHat, desc: 'Chefs cooking to order' },
    { label: 'Out for Delivery', icon: Bike, desc: 'Courier on the way' },
    { label: 'Bon Appétit', icon: ShoppingBag, desc: 'Arrived at your door' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Clock className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-black">Live Order Tracker</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-stone-300 font-mono">Order #{activeOrder.orderId}</p>
            </div>
          </div>
          <button
            onClick={() => setIsOrderTrackerOpen(false)}
            className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Estimated Time Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/20 text-center space-y-1">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">
              Estimated Arrival Time
            </span>
            <p className="text-4xl font-black text-stone-900">
              {minutesLeft} <span className="text-lg font-bold text-stone-500">Mins</span>
            </p>
            <p className="text-xs text-stone-500">
              Delivering to: <span className="font-semibold text-stone-700">{activeOrder.customer?.address || 'Restaurant Counter'}</span>
            </p>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider">
              Kitchen & Delivery Status
            </h4>

            <div className="grid grid-cols-4 gap-2 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStep;
                const isCurrent = idx === currentStep;

                return (
                  <div key={idx} className="flex flex-col items-center text-center">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center mb-2 transition-all ${
                        isCurrent
                          ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-110'
                          : isPassed
                          ? 'bg-stone-900 text-orange-400'
                          : 'bg-stone-100 text-stone-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-stone-900 leading-tight">
                      {step.label}
                    </span>
                    <span className="text-[9px] text-stone-400 hidden sm:block mt-0.5">
                      {step.desc}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Interactive Step Switcher for Demonstration */}
            <div className="flex justify-center gap-2 pt-2">
              <span className="text-[11px] text-stone-400 mr-2 self-center">Simulate courier:</span>
              {[0, 1, 2, 3].map((s) => (
                <button
                  key={s}
                  onClick={() => setCurrentStep(s)}
                  className={`text-[10px] px-2 py-0.5 rounded-md font-bold ${
                    currentStep === s ? 'bg-orange-500 text-white' : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  Step {s + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Itemized Order Details */}
          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3">
            <div className="flex items-center justify-between border-b border-stone-200 pb-2">
              <span className="text-xs font-bold text-stone-600 uppercase tracking-wider">Receipt Summary</span>
              <button
                onClick={handleCopyOrderId}
                className="text-xs text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy ID</span>
              </button>
            </div>

            <div className="space-y-2 text-xs divide-y divide-stone-100">
              {activeOrder.items?.map((item) => (
                <div key={item.key} className="pt-2 first:pt-0 flex justify-between">
                  <div>
                    <span className="font-bold text-stone-900">{item.quantity}x {item.name}</span>
                    {item.options?.spicyLevel && (
                      <span className="text-stone-400 text-[10px] block">({item.options.spicyLevel})</span>
                    )}
                  </div>
                  <span className="font-semibold text-stone-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-stone-200 space-y-1 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span>${activeOrder.subtotal?.toFixed(2)}</span>
              </div>
              {activeOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount</span>
                  <span>-${activeOrder.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-stone-500">
                <span>Delivery</span>
                <span>${activeOrder.deliveryFee?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Tax & Tip</span>
                <span>${((activeOrder.tax || 0) + (activeOrder.tip || 0)).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-black text-sm text-stone-900 pt-1 border-t border-stone-200">
                <span>Grand Total</span>
                <span className="text-orange-600">${activeOrder.total?.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex-1 py-3 rounded-2xl border border-stone-200 text-stone-700 hover:bg-stone-50 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
            <button
              onClick={() => setIsOrderTrackerOpen(false)}
              className="flex-1 py-3 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider"
            >
              Done & Return
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

