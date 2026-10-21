import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Star, Clock, Flame, Plus, Minus, Check, Sparkles } from 'lucide-react';

export const DishDetailModal = () => {
  const { quickViewDish, setQuickViewDish, addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [spicyLevel, setSpicyLevel] = useState('Medium');
  const [extraCheese, setExtraCheese] = useState(false);
  const [specialNote, setSpecialNote] = useState('');

  if (!quickViewDish) return null;

  const dish = quickViewDish;
  const basePrice = dish.price + (extraCheese ? 2.0 : 0);
  const totalPrice = basePrice * quantity;

  const handleClose = () => {
    setQuickViewDish(null);
    setQuantity(1);
    setExtraCheese(false);
    setSpecialNote('');
  };

  const handleAddToCart = () => {
    addToCart(dish, quantity, {
      spicyLevel,
      extraCheese,
      specialNote: specialNote.trim(),
    });
    handleClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-stone-900/80 backdrop-blur-md text-white flex items-center justify-center hover:bg-orange-500 transition-colors shadow-lg"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        <div className="relative h-64 sm:h-72 w-full bg-stone-900">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {dish.isChefSpecial && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-amber-500 text-stone-950 uppercase tracking-wide">
                    Chef's Choice
                  </span>
                )}
                {dish.dietary === 'veg' && (
                  <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-600 text-white">
                    🌱 Vegetarian
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white">{dish.name}</h2>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-orange-400">
                ${dish.price.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Body & Options */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            {dish.description}
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-3 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-center">
            <div>
              <span className="text-xs text-stone-400 block font-medium">Rating</span>
              <span className="text-sm font-bold text-stone-900 flex items-center justify-center gap-1">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                {dish.rating} ({dish.reviewsCount})
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block font-medium">Prep Time</span>
              <span className="text-sm font-bold text-stone-900 flex items-center justify-center gap-1">
                <Clock className="w-4 h-4 text-orange-500" />
                {dish.prepTime}
              </span>
            </div>
            <div>
              <span className="text-xs text-stone-400 block font-medium">Calories</span>
              <span className="text-sm font-bold text-stone-900">{dish.calories}</span>
            </div>
          </div>

          {/* Spice Level Preference */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Spice Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Mild', 'Medium', 'Extra Spicy'].map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSpicyLevel(lvl)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    spicyLevel === lvl
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20'
                      : 'bg-white text-stone-700 border-stone-200 hover:border-orange-300'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Extra Add-ons */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Add-ons & Upgrades
            </label>
            <button
              type="button"
              onClick={() => setExtraCheese(!extraCheese)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-sm font-medium transition-colors ${
                extraCheese
                  ? 'border-orange-500 bg-orange-50 text-orange-950'
                  : 'border-stone-200 bg-white hover:border-stone-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                    extraCheese ? 'bg-orange-500 border-orange-500 text-white' : 'border-stone-300 bg-white'
                  }`}
                >
                  {extraCheese && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span>Double Melted Artisan Cheese / Cream</span>
              </div>
              <span className="font-bold text-stone-900">+$2.00</span>
            </button>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
              Special Kitchen Instructions
            </label>
            <input
              type="text"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              placeholder="e.g. Dressing on the side, no onions..."
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Modal Footer with Quantity and Add Button */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-100 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center bg-white border border-stone-200 rounded-2xl p-1 shadow-sm">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 disabled:opacity-40 transition-colors"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-10 text-center font-black text-stone-900 text-base">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-600 hover:bg-stone-100 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Submit Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-orange-500/25 flex items-center justify-between transition-all active:scale-[0.99]"
          >
            <span>Add to Order</span>
            <span>${totalPrice.toFixed(2)}</span>
          </button>
        </div>

      </div>
    </div>
  );
};

