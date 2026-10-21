import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  Sparkles, 
  Bike 
} from 'lucide-react';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalItemsCount,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    isFreeDeliveryQualified,
    discount,
    tax,
    total,
    couponCode,
    setCouponCode,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (applyCoupon(inputCode)) {
      setInputCode('');
    }
  };

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Amount needed for free delivery (threshold: $40)
  const freeDeliveryThreshold = 40;
  const amountNeeded = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/20">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-stone-900 text-lg">Your Culinary Cart</h3>
                <p className="text-xs text-stone-500 font-medium">{totalItemsCount} items selected</p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            
            {/* Free Delivery Bar */}
            {cartItems.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-orange-900">
                  <span className="flex items-center gap-1.5">
                    <Bike className="w-4 h-4 text-orange-600" />
                    {isFreeDeliveryQualified
                      ? "🎉 You've unlocked FREE Express Delivery!"
                      : `Add $${amountNeeded.toFixed(2)} more for FREE Delivery`}
                  </span>
                  <span>{progressPercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-orange-200/60 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {cartItems.length > 0 ? (
              <div className="space-y-4 divide-y divide-stone-100">
                {cartItems.map((item) => {
                  let unitPrice = item.price;
                  if (item.options?.extraCheese) unitPrice += 2.0;

                  return (
                    <div key={item.key} className="pt-4 first:pt-0 flex gap-3.5 items-start">
                      {/* Image Thumbnail */}
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 sm:w-20 sm:h-20 w-20 h-20 rounded-2xl object-cover border border-stone-200 shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-extrabold text-stone-900 text-sm truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.key)}
                            className="text-stone-400 hover:text-red-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Custom Options / Spice Level */}
                        <div className="text-[11px] text-stone-500 mt-0.5 space-y-0.5">
                          {item.options?.spicyLevel && <span>Spice: {item.options.spicyLevel}</span>}
                          {item.options?.extraCheese && <span className="block text-orange-600 font-semibold">+ Extra Melted Cheese</span>}
                          {item.options?.specialNote && <span className="block italic text-stone-400 truncate">"{item.options.specialNote}"</span>}
                        </div>

                        {/* Price & Quantity Stepper */}
                        <div className="flex items-center justify-between mt-3">
                          <span className="font-black text-stone-900 text-sm">
                            ${(unitPrice * item.quantity).toFixed(2)}
                          </span>

                          <div className="flex items-center bg-stone-100 border border-stone-200 rounded-xl p-0.5">
                            <button
                              onClick={() => updateQuantity(item.key, -1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-bold text-xs text-stone-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.key, 1)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-stone-600 hover:bg-white hover:text-stone-900 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <div className="w-20 h-20 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-3xl">
                  🍽️
                </div>
                <h4 className="text-xl font-bold text-stone-900">Your cart is empty</h4>
                <p className="text-stone-500 text-sm max-w-xs mx-auto">
                  Add appetizing burgers, artisan pizzas, and handcrafted ramen from our interactive menu!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md shadow-orange-500/20"
                >
                  Explore Food Menu
                </button>
              </div>
            )}

            {/* Promo Code Input */}
            {cartItems.length > 0 && (
              <div className="pt-2">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-emerald-600" />
                      <div>
                        <span className="font-extrabold uppercase">{appliedCoupon.code}</span>
                        <span className="text-emerald-700 ml-1.5 font-medium">({appliedCoupon.description})</span>
                      </div>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-stone-400 hover:text-red-500 font-bold ml-2"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="space-y-1">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={inputCode}
                          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
                          placeholder="Promo code (e.g. EATNOW20)"
                          className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-orange-500 uppercase font-mono"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && <p className="text-[11px] text-red-500 font-medium">{couponError}</p>}
                  </form>
                )}
              </div>
            )}

            {/* Cost Breakdown Summary */}
            {cartItems.length > 0 && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">${subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount ({appliedCoupon.code})</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-600">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="font-bold text-emerald-600 uppercase">FREE</span>
                  ) : (
                    <span className="font-bold text-stone-900">${deliveryFee.toFixed(2)}</span>
                  )}
                </div>

                <div className="flex justify-between text-stone-600">
                  <span>Estimated Sales Tax (8%)</span>
                  <span className="font-bold text-stone-900">${tax.toFixed(2)}</span>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between text-base font-black text-stone-900">
                  <span>Total</span>
                  <span className="text-orange-600">${total.toFixed(2)}</span>
                </div>
              </div>
            )}

          </div>

          {/* Footer Actions */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-stone-200 bg-white space-y-3">
              <button
                onClick={handleOpenCheckout}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base shadow-lg shadow-orange-500/25 flex items-center justify-between px-6 transition-all active:scale-[0.99]"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1.5">
                  ${total.toFixed(2)}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-stone-400 hover:text-red-500 font-bold py-1 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

