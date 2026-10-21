import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  X, 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Mail, 
  ShieldCheck, 
  Truck, 
  Store, 
  DollarSign, 
  Lock 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutModal = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    deliveryFee,
    discount,
    tax,
    tipAmount,
    setTipAmount,
    total,
    placeOrder,
    addToast,
  } = useCart();

  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'pickup'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'applepay' | 'cash'
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    apt: '',
    notes: '',
    cardNumber: '4532 •••• •••• 8821',
    cardExp: '08/28',
    cardCvc: '842',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || (orderType === 'delivery' && !form.address)) {
      addToast('Please complete all required delivery details', 'warn');
      return;
    }

    setIsSubmitting(true);

    // Simulate immediate order confirmation & culinary kitchen dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      placeOrder({
        ...form,
        orderType,
        paymentMethod,
      });
    }, 900);
  };

  const effectiveDeliveryFee = orderType === 'pickup' ? 0 : deliveryFee;
  const grandTotal = Math.max(0, subtotal - discount + effectiveDeliveryFee + tax + tipAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Express Checkout</h3>
              <p className="text-xs text-stone-300">Fast, secure 256-bit encrypted dining checkout</p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Order Type Toggle */}
          <div className="grid grid-cols-2 gap-3 p-1 rounded-2xl bg-stone-100 border border-stone-200">
            <button
              type="button"
              onClick={() => setOrderType('delivery')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                orderType === 'delivery'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Express Delivery (25m)</span>
            </button>
            <button
              type="button"
              onClick={() => setOrderType('pickup')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                orderType === 'pickup'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Store className="w-4 h-4 text-orange-500" />
              <span>Restaurant Pickup (15m)</span>
            </button>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-orange-500" />
              <span>1. Contact Information</span>
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Alex Rivera"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 234-5678"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-600 mb-1">Email for Receipt</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                placeholder="alex.rivera@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Delivery Address (if Delivery selected) */}
          {orderType === 'delivery' && (
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
                <MapPin className="w-4 h-4 text-orange-500" />
                <span>2. Delivery Address</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-600 mb-1">Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={form.address}
                    onChange={handleInputChange}
                    placeholder="742 Evergreen Terrace"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-stone-600 mb-1">Apt / Suite</label>
                  <input
                    type="text"
                    name="apt"
                    value={form.apt}
                    onChange={handleInputChange}
                    placeholder="Apt 4B"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-600 mb-1">Delivery Instructions</label>
                <input
                  type="text"
                  name="notes"
                  value={form.notes}
                  onChange={handleInputChange}
                  placeholder="e.g. Ring front doorbell, leave at doorstep..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          )}

          {/* Driver Tip Selection */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Support Your Courier / Kitchen
              </span>
              <span className="text-xs font-bold text-orange-600">
                ${tipAmount.toFixed(2)} Tip
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[2.00, 3.50, 5.00, 0.00].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setTipAmount(amount)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    tipAmount === amount
                      ? 'bg-orange-500 text-white border-orange-500 shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-orange-300'
                  }`}
                >
                  {amount === 0 ? 'No Tip' : `$${amount.toFixed(2)}`}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <h4 className="text-sm font-black text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-500" />
              <span>3. Payment Method</span>
            </h4>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'applepay', label: 'Apple / Google Pay', icon: '📱' },
                { id: 'cash', label: 'Cash on Delivery', icon: '💵' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPaymentMethod(p.id)}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    paymentMethod === p.id
                      ? 'border-orange-500 bg-orange-50 text-stone-900 font-bold shadow-sm'
                      : 'border-stone-200 bg-white text-stone-600 hover:border-stone-300 font-medium'
                  }`}
                >
                  <span className="text-lg block mb-1">{p.icon}</span>
                  <span className="text-xs">{p.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-500 mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1">Expiration</label>
                    <input
                      type="text"
                      name="cardExp"
                      value={form.cardExp}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-stone-500 mb-1">CVC Code</label>
                    <input
                      type="text"
                      name="cardCvc"
                      value={form.cardCvc}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-mono bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary & Submit Button */}
          <div className="pt-4 border-t border-stone-200">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Securing Your Culinary Order...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ${grandTotal.toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

