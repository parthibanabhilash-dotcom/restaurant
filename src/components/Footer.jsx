import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { 
  UtensilsCrossed, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Instagram, 
  Facebook, 
  Twitter, 
  Heart,
  Calendar
} from 'lucide-react';

export const Footer = () => {
  const { addToast, setIsReservationOpen } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'warn');
      return;
    }
    addToast('Thank you for subscribing! Check your inbox for a VIP welcome dessert perk 🍰', 'success');
    setNewsletterEmail('');
  };

  return (
    <footer id="footer" className="bg-stone-950 text-stone-300 pt-20 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-stone-800">
          
          {/* Brand & Manifesto (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-sans">
                Eat<span className="text-orange-500">Now</span>
              </span>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              Artisanal culinary craft meets modern convenience. We serve premium wood-fired pizzas, Wagyu creations, and farm-fresh bowls delivered fresh to your door in 25 minutes.
            </p>

            <div className="pt-2 flex items-center gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((soc, i) => {
                const Icon = soc.icon;
                return (
                  <a
                    key={i}
                    href={soc.href}
                    className="w-10 h-10 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-white hover:bg-orange-500 hover:border-orange-500 transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li>
                <a href="#home" className="hover:text-orange-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-orange-400 transition-colors">Artisan Menu</a>
              </li>
              <li>
                <button
                  onClick={() => setIsReservationOpen(true)}
                  className="hover:text-orange-400 transition-colors text-left"
                >
                  Book a Table
                </button>
              </li>
              <li>
                <a href="#specials" className="hover:text-orange-400 transition-colors">Special Offers</a>
              </li>
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-orange-400 transition-colors">Guest Reviews</a>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Location (Col 7-9) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Restaurant Hours</h4>
            
            <div className="space-y-2 text-sm text-stone-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Mon – Friday:</p>
                  <p className="text-xs">11:00 AM – 11:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Saturday – Sunday:</p>
                  <p className="text-xs">10:00 AM – Midnight</p>
                </div>
              </div>

              <div className="pt-2 flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <p className="text-xs">
                  452 Culinary Boulevard, Suite 100, Arts District
                </p>
              </div>
            </div>
          </div>

          {/* Newsletter (Col 10-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black text-white uppercase tracking-wider">Join VIP Dining Club</h4>
            <p className="text-xs text-stone-400">
              Subscribe for exclusive secret menu releases, free chef appetizers, and weekly private promos.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full px-4 py-2.5 pr-11 rounded-xl bg-stone-900 border border-stone-800 text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-colors shadow-sm"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} EatNow Restaurant & Culinary Co. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-stone-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-stone-300 transition-colors">Cookie Preferences</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

