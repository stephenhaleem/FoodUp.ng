
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';

export interface FoodItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: string;
  restaurantName: string;
}

interface FoodCardProps {
  item: FoodItemProps;
}

const FoodCard: React.FC<FoodCardProps> = ({ item }) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(item);
  };

  return (
    <Card className="overflow-hidden h-full transition-transform hover:shadow-md">
      <div className="relative h-40 bg-muted animate-pulse-slow">
        <img 
          src={item.image} 
          alt={item.name}
          className="object-cover w-full h-full"
        />
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <span className="font-medium">${item.price.toFixed(2)}</span>
        <Button 
          onClick={handleAddToCart} 
          size="sm" 
          className="bg-brand-orange hover:bg-brand-orange/90"
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodCard;
