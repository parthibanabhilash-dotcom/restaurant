import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Tag, Sparkles, Copy, Check, Percent } from 'lucide-react';

export const SpecialsBanner = () => {
  const { applyCoupon, addToast } = useCart();
  const [copied, setCopied] = useState(false);

  const promoCode = 'EATNOW20';

  const handleCopyCode = () => {
    navigator.clipboard?.writeText(promoCode);
    setCopied(true);
    applyCoupon(promoCode);
    addToast('Promo code EATNOW20 applied automatically!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="specials" className="py-8 bg-stone-900 border-y border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-6 sm:p-10 shadow-2xl shadow-orange-950/40 text-white">
          {/* Subtle geometric circles */}
          <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-32 h-32 bg-amber-400/20 rounded-full blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Time Promotion</span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight leading-tight">
                Get 20% Off Your Entire Culinary Experience
              </h2>
              <p className="text-white/90 text-sm sm:text-base font-medium">
                Valid on all gourmet burgers, wood-fired pizzas, artisan pasta, and bowls. Plus enjoy free express delivery on orders over $40!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="flex items-center bg-stone-950/80 backdrop-blur-md border border-white/20 rounded-2xl p-1.5 pl-4 shadow-lg">
                <div className="flex items-center gap-2 mr-3 font-mono text-base font-extrabold tracking-wider text-amber-300">
                  <Tag className="w-4 h-4 text-orange-400" />
                  <span>{promoCode}</span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Applied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Apply Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

