
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: string;
  image: string;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  return (
    <Link to={`/restaurants/${restaurant.id}`}>
      <Card className="overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
        <div className="relative h-48 bg-muted animate-pulse-slow">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-foreground font-medium">
              ⭐ {restaurant.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="pt-4">
          <h3 className="text-lg font-semibold">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            {restaurant.deliveryTime}
          </div>
          <div>
            {restaurant.deliveryFee}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
