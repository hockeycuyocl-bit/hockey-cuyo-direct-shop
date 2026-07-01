import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { type Product } from "@/data/catalog";

type CartItem = {
  product: Product;
  size: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (product: Product, size: string, quantity: number) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hc_cart_v1");
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("hc_cart_v1", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (product: Product, size: string, quantity: number) => {
    setItems(prev => {
      const existing = prev.findIndex(i => i.product.slug === product.slug && i.size === size);
      if (existing >= 0) {
        const next = [...prev];
        next[existing].quantity += quantity;
        return next;
      }
      return [...prev, { product, size, quantity }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, quantity: number) => {
    if (quantity < 1) return;
    setItems(prev => {
      const next = [...prev];
      next[index].quantity = quantity;
      return next;
    });
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = items.reduce((acc, item) => acc + (item.product.promoPrice || item.product.price) * item.quantity, 0);

  return (
    <CartContext.Provider value={{
      items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
