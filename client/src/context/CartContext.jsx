import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from localStorage on component mount
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      return savedCart ? JSON.parse(savedCart) : [];
    }
    return [];
  });
  
  const [cartTotal, setCartTotal] = useState(0);

  // Update localStorage whenever cart changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cartItems));
      // Calculate total
      const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setCartTotal(total);
    }
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newItems[existingItemIndex].quantity + quantity
        };
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity }];
      }
    });
    
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart`,
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    
    toast({
      title: 'Removed from cart',
      description: 'Item has been removed from your cart',
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: 'Cart cleared',
      description: 'Your cart has been emptied',
    });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        cartTotal,
        cartCount: cartItems.reduce((count, item) => count + item.quantity, 0),
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart 
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
