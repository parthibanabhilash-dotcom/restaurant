import React from 'react';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SpecialsBanner } from './components/SpecialsBanner';
import { MenuSection } from './components/MenuSection';
import { Features } from './components/Features';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { DishDetailModal } from './components/DishDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ReservationModal } from './components/ReservationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { ToastNotification } from './components/ToastNotification';

export default function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-stone-50 flex flex-col font-sans text-stone-900 selection:bg-orange-500 selection:text-white">
        {/* Sticky Header Navbar */}
        <Navbar />

        {/* Main Content Sections */}
        <main className="flex-1">
          <Hero />
          <SpecialsBanner />
          <MenuSection />
          <Features />
          <ReviewsSection />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Overlay Drawers & Modals */}
        <CartDrawer />
        <DishDetailModal />
        <CheckoutModal />
        <ReservationModal />
        <OrderTrackerModal />
        <ToastNotification />
      </div>
    </CartProvider>
  );
}

