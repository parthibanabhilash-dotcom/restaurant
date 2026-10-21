import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const COUPONS = {
  'EATNOW20': { type: 'percent', value: 20, description: '20% Off Entire Order' },
  'TASTY10': { type: 'percent', value: 10, description: '10% Off Entire Order' },
  'FREESHIP': { type: 'free_delivery', value: 0, description: 'Free Delivery' },
};

export const CartProvider = ({ children }) => {
  // Cart items with LocalStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('eatnow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI state modals & drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState(false);
  const [quickViewDish, setQuickViewDish] = useState(null);

  // Active coupon & tip
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [tipAmount, setTipAmount] = useState(3.00);

  // Active tracked order
  const [activeOrder, setActiveOrder] = useState(() => {
    try {
      const saved = localStorage.getItem('eatnow_last_order');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Notification Toasts
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem('eatnow_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    if (activeOrder) {
      try {
        localStorage.setItem('eatnow_last_order', JSON.stringify(activeOrder));
      } catch (e) {
        console.error(e);
      }
    }
  }, [activeOrder]);

  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (dish, quantity = 1, options = {}) => {
    const itemKey = `${dish.id}-${options.spicyLevel || 'default'}-${options.extraCheese ? 'extraCheese' : 'noExtra'}`;
    
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.key === itemKey);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        const newItem = {
          ...dish,
          key: itemKey,
          quantity,
          options,
        };
        return [...prevItems, newItem];
      }
    });

    addToast(`Added "${dish.name}" to cart!`, 'success');
  };

  const updateQuantity = (key, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.key === key) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (key) => {
    const itemToRemove = cartItems.find((i) => i.key === key);
    setCartItems((prevItems) => prevItems.filter((item) => item.key !== key));
    if (itemToRemove) {
      addToast(`Removed "${itemToRemove.name}" from cart`, 'info');
    }
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    setCouponCode('');
  };

  // Coupons
  const applyCoupon = (codeToApply) => {
    const cleanCode = (codeToApply || couponCode).trim().toUpperCase();
    if (!cleanCode) {
      setCouponError('Please enter a promo code');
      return false;
    }

    if (COUPONS[cleanCode]) {
      setAppliedCoupon({ code: cleanCode, ...COUPONS[cleanCode] });
      setCouponError('');
      addToast(`Promo code "${cleanCode}" applied! ${COUPONS[cleanCode].description}`, 'success');
      return true;
    } else {
      setCouponError('Invalid promo code. Try "EATNOW20" for 20% off!');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponError('');
    addToast('Promo coupon removed', 'info');
  };

  // Math Calculations
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    let itemPrice = item.price;
    if (item.options?.extraCheese) itemPrice += 2.0;
    return acc + itemPrice * item.quantity;
  }, 0);

  // Delivery fee logic: Free over $40 or if coupon provides free delivery
  const standardDeliveryFee = 3.99;
  const isFreeDeliveryQualified = subtotal >= 40 || appliedCoupon?.type === 'free_delivery';
  const deliveryFee = subtotal === 0 ? 0 : (isFreeDeliveryQualified ? 0 : standardDeliveryFee);

  // Discount calculation
  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percent') {
      discount = (subtotal * appliedCoupon.value) / 100;
    } else if (appliedCoupon.type === 'free_delivery') {
      discount = 0; // delivery fee is zeroed directly
    }
  }

  // Estimated Tax 8%
  const tax = (subtotal - discount > 0 ? (subtotal - discount) : 0) * 0.08;

  // Final Total
  const total = Math.max(0, subtotal - discount + deliveryFee + tax + (subtotal > 0 ? tipAmount : 0));

  // Create & Place order
  const placeOrder = (orderData) => {
    const orderId = 'EN-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      orderId,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      discount,
      tax,
      tip: tipAmount,
      total,
      placedAt: new Date().toISOString(),
      customer: orderData,
      status: 'confirmed', // 'confirmed', 'preparing', 'out_for_delivery', 'delivered'
      estimatedMinutes: 28,
    };

    setActiveOrder(newOrder);
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    setIsOrderTrackerOpen(true);
    addToast(`Order #${orderId} confirmed successfully! 🎉`, 'success');
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItemsCount,
        subtotal,
        deliveryFee,
        isFreeDeliveryQualified,
        discount,
        tax,
        tipAmount,
        setTipAmount,
        total,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        // Coupon
        couponCode,
        setCouponCode,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        // Modals & Drawers
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isReservationOpen,
        setIsReservationOpen,
        isOrderTrackerOpen,
        setIsOrderTrackerOpen,
        quickViewDish,
        setQuickViewDish,
        // Order
        activeOrder,
        setActiveOrder,
        placeOrder,
        // Toasts
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

