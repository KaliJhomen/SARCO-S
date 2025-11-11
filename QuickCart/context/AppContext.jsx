'use client';
import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  // ✅ Solo estado de UI (NO datos del servidor)
  const [cart, setCart] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [theme, setTheme] = useState('light');

  // ✅ Utilidades puras (sin fetch)
  const normalize = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  };

  // ✅ Funciones de carrito (estado local)
  const addToCart = (productId, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { id: productId, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const value = {
    // Estado UI
    cart,
    sidebarOpen,
    setSidebarOpen,
    viewMode,
    setViewMode,
    theme,
    setTheme,

    // Funciones carrito
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,

    // Utilidades
    normalize,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe usarse dentro de AppProvider');
  }
  return context;
}