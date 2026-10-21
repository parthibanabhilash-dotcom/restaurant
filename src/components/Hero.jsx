import React from 'react';
import { useCart } from '../context/CartContext';
import { ArrowRight, Star, Clock, ShieldCheck, Flame, Sparkles } from 'lucide-react';

export const Hero = () => {
  const { setIsReservationOpen, applyCoupon } = useCart();

  const handleApplyPromo = () => {
    applyCoupon('EATNOW20');
  };

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-stone-900 text-white">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/15 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute top-1/3 -left-20 w-96 h-96 bg-amber-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Promo Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-stone-800/90 border border-orange-500/30 text-xs sm:text-sm text-stone-200 shadow-inner">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white text-xs">
                <Flame className="w-3.5 h-3.5 fill-current" />
              </span>
              <span className="font-semibold text-orange-400">Special Offer:</span>
              <span>Use code <button onClick={handleApplyPromo} className="underline font-bold text-white hover:text-orange-300">EATNOW20</button> for 20% off</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.1] font-sans">
              Artisanal Flavors, <br />
              <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
                Delivered in Minutes.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Experience chef-curated gourmet dining crafted with farm-fresh organic ingredients.
              From wood-fired sourdough pizzas to premium Wagyu burgers, savor culinary excellence at home or at our table.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Food Now</span>
                <ArrowRight className="w-5 h-5" />
              </a>

              <button
                onClick={() => setIsReservationOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-stone-800/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-bold text-base transition-all hover:border-orange-500/50"
              >
                <span>Reserve a Table</span>
              </button>
            </div>

            {/* Quick Metrics Badges */}
            <div className="pt-6 border-t border-stone-800/80 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Star className="w-5 h-5 fill-current text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-black text-white">4.9 / 5.0</p>
                  <p className="text-[11px] text-stone-400">12k+ Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Clock className="w-5 h-5 text-orange-400" />
                </div>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-black text-white">25 Mins</p>
                  <p className="text-[11px] text-stone-400">Avg. Delivery</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-base sm:text-lg font-black text-white">100%</p>
                  <p className="text-[11px] text-stone-400">Fresh & Organic</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual & Floating Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Visual Ring Backdrop */}
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[420px] md:h-[420px]">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-orange-500/30 animate-spin" style={{ animationDuration: '40s' }}></div>
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-orange-500/20 to-amber-500/10 blur-xl"></div>
              
              {/* Hero Dish Image */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-stone-800 shadow-2xl shadow-orange-950/50">
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80"
                  alt="Artisanal Wagyu Burger"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Floating Pill Card 1: Top Left */}
              <div className="absolute -top-4 -left-4 sm:-left-8 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 text-lg">
                  🔥
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Chef's Signature</p>
                  <p className="text-[11px] text-stone-400">Wagyu Truffle Burger</p>
                </div>
              </div>

              {/* Floating Pill Card 2: Bottom Right */}
              <div className="absolute -bottom-4 -right-4 sm:-right-6 bg-stone-900/90 backdrop-blur-md border border-stone-700/80 rounded-2xl p-3 shadow-xl flex items-center gap-3 animate-float-delayed">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  ⚡ 20m
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Express Courier</p>
                  <p className="text-[11px] text-emerald-400 font-semibold">Free Delivery on $40+</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

