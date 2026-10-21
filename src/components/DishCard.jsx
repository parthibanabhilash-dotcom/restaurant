import React from 'react';
import { useCart } from '../context/CartContext';
import { Star, Plus, Flame, Clock, Sparkles, Eye, Check } from 'lucide-react';

export const DishCard = ({ dish }) => {
  const { addToCart, cartItems, setQuickViewDish } = useCart();

  // Find if this dish is already in the cart and how many
  const cartItemMatches = cartItems.filter((i) => i.id === dish.id);
  const inCartQty = cartItemMatches.reduce((acc, i) => acc + i.quantity, 0);

  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(dish, 1);
  };

  const handleQuickView = () => {
    setQuickViewDish(dish);
  };

  return (
    <div
      onClick={handleQuickView}
      className="group relative bg-white rounded-3xl border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500/30 transition-all duration-300 flex flex-col justify-between cursor-pointer transform hover:-translate-y-1"
    >
      {/* Top Image Section */}
      <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={dish.image}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

        {/* Badges Top Left */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {dish.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-amber-500 text-stone-950 shadow-md">
              <Sparkles className="w-3 h-3 fill-current" />
              <span>Chef's Choice</span>
            </span>
          )}
          {dish.isPopular && !dish.isChefSpecial && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide uppercase bg-orange-500 text-white shadow-md">
              <Flame className="w-3 h-3 fill-current" />
              <span>Popular</span>
            </span>
          )}
          {dish.dietary === 'veg' && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-[11px] font-black bg-emerald-600 text-white shadow-md">
              🌱 Veg
            </span>
          )}
        </div>

        {/* Quick View Button on Image Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleQuickView();
          }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-stone-900/80 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-orange-500 hover:scale-110 shadow-lg z-10"
          title="Quick View Details"
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Floating Rating Tag Bottom Left of Image */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-white text-xs font-bold border border-white/10">
          <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
          <span>{dish.rating}</span>
          <span className="text-stone-400 text-[10px]">({dish.reviewsCount})</span>
        </div>

        {/* Prep Time Tag Bottom Right of Image */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-950/80 backdrop-blur-md text-stone-300 text-[11px] font-medium border border-white/10">
          <Clock className="w-3 h-3 text-orange-400" />
          <span>{dish.prepTime}</span>
        </div>
      </div>

      {/* Card Body Info */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-extrabold text-stone-900 text-lg group-hover:text-orange-600 transition-colors line-clamp-1">
              {dish.name}
            </h3>
          </div>

          <p className="text-stone-500 text-xs sm:text-sm line-clamp-2 leading-relaxed">
            {dish.description}
          </p>
        </div>

        {/* Card Footer: Price & Add to Cart */}
        <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-black text-stone-900">
                ${dish.price.toFixed(2)}
              </span>
              {dish.originalPrice && (
                <span className="text-xs text-stone-400 line-through font-semibold">
                  ${dish.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[11px] font-semibold text-stone-400 block -mt-0.5">
              {dish.calories}
            </span>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAdd}
            className={`relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm ${
              inCartQty > 0
                ? 'bg-stone-900 text-white hover:bg-orange-600'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20'
            }`}
          >
            {inCartQty > 0 ? (
              <>
                <Check className="w-3.5 h-3.5 text-orange-400" />
                <span>{inCartQty} in Cart</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

