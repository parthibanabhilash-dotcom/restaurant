import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { X, Calendar, Clock, Users, CheckCircle2, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ReservationModal = () => {
  const { isReservationOpen, setIsReservationOpen, addToast } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2 Guests',
    date: new Date().toISOString().split('T')[0],
    time: '7:00 PM',
    occasion: 'Casual Dining',
    notes: '',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(null);

  if (!isReservationOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      addToast('Please fill in your name and phone number', 'warn');
      return;
    }

    const bookingRef = 'EN-RES-' + Math.floor(1000 + Math.random() * 9000);
    setBookingConfirmed({
      ...formData,
      bookingRef,
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}

    addToast(`Table reserved! Ref: ${bookingRef}`, 'success');
  };

  const handleClose = () => {
    setIsReservationOpen(false);
    setBookingConfirmed(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-stone-200 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-black">Reserve a Table</h3>
              <p className="text-xs text-stone-300">Enjoy fine dining in our restaurant</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-stone-800 text-stone-300 hover:text-white hover:bg-stone-700 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        {!bookingConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Date, Time, Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Time Slot
                </label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option>12:00 PM</option>
                  <option>1:00 PM</option>
                  <option>5:30 PM</option>
                  <option>6:30 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  <option>1 Guest</option>
                  <option>2 Guests</option>
                  <option>3 Guests</option>
                  <option>4 Guests</option>
                  <option>5 Guests</option>
                  <option>6+ Guests (Party)</option>
                </select>
              </div>
            </div>

            {/* Occasion */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Dining Occasion
              </label>
              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option>Casual Dining</option>
                <option>Romantic Date Night</option>
                <option>Birthday / Celebration</option>
                <option>Business Meeting</option>
                <option>Anniversary</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                Special Requests (Optional)
              </label>
              <textarea
                name="notes"
                rows="2"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Window table preferred, high chair needed, dietary allergies..."
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-lg shadow-orange-500/25 transition-all mt-4"
            >
              Confirm Reservation
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-mono font-bold uppercase tracking-wider mb-2">
                Booking ID: {bookingConfirmed.bookingRef}
              </span>
              <h4 className="text-2xl font-black text-stone-900">Table Reserved Successfully!</h4>
              <p className="text-stone-600 text-sm mt-1">
                We look forward to welcoming you, <span className="font-bold text-stone-900">{bookingConfirmed.name}</span>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-stone-500">Date & Time:</span>
                <span className="font-bold text-stone-900">{bookingConfirmed.date} at {bookingConfirmed.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Party Size:</span>
                <span className="font-bold text-stone-900">{bookingConfirmed.guests}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Occasion:</span>
                <span className="font-bold text-stone-900">{bookingConfirmed.occasion}</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm"
            >
              Done & Return
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

