import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, Calendar, Menu as MenuIcon, X, UtensilsCrossed, Sparkles } from 'lucide-react';

export const Navbar = () => {
  const { totalItemsCount, setIsCartOpen, setIsReservationOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Menu', href: '#menu' },
    { name: 'Special Deals', href: '#specials' },
    { name: 'Why EatNow', href: '#features' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#footer' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-900/90 backdrop-blur-md shadow-lg shadow-black/10 py-3.5 border-b border-stone-800'
          : 'bg-stone-900/80 backdrop-blur-sm py-5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#home" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              <UtensilsCrossed className="w-5 h-5" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1 font-sans">
                Eat<span className="text-orange-500">Now</span>
                <span className="inline-block w-2 h-2 rounded-full bg-orange-500 ml-0.5 animate-pulse"></span>
              </span>
              <p className="text-[10px] text-stone-400 font-medium tracking-wider uppercase -mt-1 hidden sm:block">
                Gourmet & Express
              </p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-semibold text-stone-300 hover:text-orange-400 transition-colors py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Book Table CTA */}
            <button
              onClick={() => setIsReservationOpen(true)}
              className="hidden lg:flex items-center gap-2 px-4 py-2.5 rounded-full text-xs uppercase font-bold tracking-wider text-orange-400 border border-orange-500/30 hover:bg-orange-500/10 hover:border-orange-500 transition-all active:scale-95"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Table</span>
            </button>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-sm shadow-md shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition-all active:scale-95"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Cart</span>
              <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-xs font-black bg-stone-900 text-orange-400 rounded-full border border-orange-400/30">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white rounded-xl bg-stone-800/80 border border-stone-700/60"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-stone-900/98 border-b border-stone-800 px-6 py-6 mt-3 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-stone-200 hover:text-orange-400 py-1 border-b border-stone-800/50"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsReservationOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-orange-500/40 text-orange-400 font-bold text-sm hover:bg-orange-500/10"
              >
                <Calendar className="w-4 h-4" />
                Reserve a Table
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

