
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the food item type
export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
}

// Define the cart item type which extends food item with quantity
export interface CartItem extends FoodItem {
  quantity: number;
}

// Define the context type
interface CartContextType {
  items: CartItem[];
  restaurantId: string | null; // Track which restaurant items are from
  restaurantName: string | null;
  addItem: (item: FoodItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create a provider component
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [restaurantName, setRestaurantName] = useState<string | null>(null);

  // Calculate total items
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    const storedRestaurantId = localStorage.getItem('restaurantId');
    const storedRestaurantName = localStorage.getItem('restaurantName');
    
    if (storedCart) {
      setItems(JSON.parse(storedCart));
    }
    
    if (storedRestaurantId) {
      setRestaurantId(storedRestaurantId);
    }
    
    if (storedRestaurantName) {
      setRestaurantName(storedRestaurantName);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    
    if (restaurantId) {
      localStorage.setItem('restaurantId', restaurantId);
    } else {
      localStorage.removeItem('restaurantId');
    }
    
    if (restaurantName) {
      localStorage.setItem('restaurantName', restaurantName);
    } else {
      localStorage.removeItem('restaurantName');
    }
  }, [items, restaurantId, restaurantName]);

  // Add item to cart
  const addItem = (item: FoodItem) => {
    // If cart is empty or adding from same restaurant
    if (!restaurantId || restaurantId === item.restaurantId) {
      setItems(prevItems => {
        const existingItem = prevItems.find(i => i.id === item.id);
        
        if (existingItem) {
          // Item already in cart, update quantity
          return prevItems.map(i => 
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          // New item, add to cart
          return [...prevItems, { ...item, quantity: 1 }];
        }
      });
      
      // Set or update restaurant ID
      setRestaurantId(item.restaurantId);
      setRestaurantName(item.restaurantName);
    } else {
      // Attempting to add item from different restaurant
      if (confirm('Your cart contains items from a different restaurant. Would you like to clear your cart and add this item?')) {
        setItems([{ ...item, quantity: 1 }]);
        setRestaurantId(item.restaurantId);
        setRestaurantName(item.restaurantName);
      }
    }
  };

  // Remove item from cart
  const removeItem = (itemId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== itemId);
      
      // If cart is now empty, reset restaurant info
      if (newItems.length === 0) {
        setRestaurantId(null);
        setRestaurantName(null);
      }
      
      return newItems;
    });
  };

  // Update item quantity
  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Clear the cart
  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
    setRestaurantName(null);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        restaurantId,
        restaurantName,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Create a custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
