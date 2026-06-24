import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '../data/products';
import type { Product } from '../data/products';

export interface CartItem {
  id: string; // Composite unique key: productId-size-color
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: { name: string; hex: string };
}

export interface OrderDetails {
  orderId: string;
  shipping: {
    fullName: string;
    email: string;
    address: string;
    city: string;
    zipCode: string;
  };
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
}

export type ViewType = 'landing' | 'catalog' | 'checkout' | 'success';
export type SortType = 'featured' | 'price-low' | 'price-high' | 'rating';

interface ShopContextType {
  productsList: Product[];
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortOption: SortType;
  setSortOption: (sort: SortType) => void;
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  activeProductDetail: Product | null;
  setActiveProductDetail: (product: Product | null) => void;
  addToCart: (product: Product, quantity: number, size?: string, color?: { name: string; hex: string }) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  appliedPromo: { code: string; discountPercent: number } | null;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  checkoutSubtotal: number;
  checkoutDiscount: number;
  checkoutTotal: number;
  placedOrder: OrderDetails | null;
  setPlacedOrder: (order: OrderDetails | null) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<ViewType>('landing');
  
  // Products & Filtering
  const [productsList] = useState<Product[]>(products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState<SortType>('featured');
  
  // Modal & Cart overlays
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Cart State
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPercent: number } | null>(null);
  
  // Checkout State
  const [placedOrder, setPlacedOrder] = useState<OrderDetails | null>(null);

  // Load cart from localStorage on init
  useEffect(() => {
    const savedCart = localStorage.getItem('apex_sports_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to localStorage
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('apex_sports_cart', JSON.stringify(newCart));
  };

  const addToCart = (
    product: Product,
    quantity: number,
    size?: string,
    color?: { name: string; hex: string }
  ) => {
    // Generate unique composite ID for this size + color combo
    const itemKey = `${product.id}-${size || 'nosize'}-${color?.name || 'nocolor'}`;
    const existingIndex = cart.findIndex((item) => item.id === itemKey);

    if (existingIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      saveCart(updatedCart);
    } else {
      saveCart([
        ...cart,
        {
          id: itemKey,
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ]);
    }
    // Auto-open cart for premium UX feedback
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    const updatedCart = cart.map((item) =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    saveCart(updatedCart);
  };

  const removeFromCart = (cartItemId: string) => {
    const updatedCart = cart.filter((item) => item.id !== cartItemId);
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code: string): boolean => {
    const formattedCode = code.trim().toUpperCase();
    if (formattedCode === 'APEX20') {
      setAppliedPromo({ code: 'APEX20', discountPercent: 20 });
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  
  const checkoutSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const checkoutDiscount = appliedPromo
    ? Math.round(checkoutSubtotal * (appliedPromo.discountPercent / 100) * 100) / 100
    : 0;

  // Add standard mock shipping ($10) unless subtotal > $150 (free shipping)
  const shippingCost = checkoutSubtotal > 150 || checkoutSubtotal === 0 ? 0 : 10;
  const checkoutTotal = Math.max(0, checkoutSubtotal - checkoutDiscount + shippingCost);

  return (
    <ShopContext.Provider
      value={{
        productsList,
        cart,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortOption,
        setSortOption,
        currentView,
        setCurrentView,
        activeProductDetail,
        setActiveProductDetail,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        checkoutSubtotal,
        checkoutDiscount,
        checkoutTotal,
        placedOrder,
        setPlacedOrder,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
