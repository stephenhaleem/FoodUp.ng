
import React from 'react';
import { Button } from '@/components/ui/button';
import { useCart, CartItem as CartItemType } from '../context/CartContext';
import { formatNaira } from '../lib/currency';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();
  
  return (
    <div className="flex items-center py-4 border-b last:border-0">
      <div className="flex-shrink-0 w-16 h-16 mr-4 overflow-hidden rounded-md bg-muted">
        <img 
          src={item.image} 
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      
      <div className="flex flex-col flex-1">
        <h4 className="font-medium">{item.name}</h4>
        <span className="text-sm text-muted-foreground">{formatNaira(item.price)}</span>
      </div>
      
      <div className="flex items-center space-x-1">
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8" 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span className="sr-only">Remove one</span>
        </Button>
        
        <span className="w-8 text-center">{item.quantity}</span>
        
        <Button 
          variant="outline" 
          size="icon" 
          className="w-8 h-8" 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span className="sr-only">Add one</span>
        </Button>
      </div>
      
      <div className="ml-4 font-medium w-16 text-right">
        {formatNaira(item.price * item.quantity)}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        className="ml-2 text-muted-foreground" 
        onClick={() => removeItem(item.id)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
        <span className="sr-only">Remove</span>
      </Button>
    </div>
  );
};

export default CartItem;
