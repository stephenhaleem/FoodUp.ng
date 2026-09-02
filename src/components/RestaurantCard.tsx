
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Clock3, Bike } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

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
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(restaurant.id);

  const handleFavorite = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFavorite(restaurant.id);
  };

  return (
    <Link to={`/restaurants/${restaurant.id}`} className="group block">
      <Card className="overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative h-52 overflow-hidden bg-muted">
          <img 
            src={restaurant.image} 
            alt={restaurant.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
            <Badge className="border-0 bg-white/95 text-foreground shadow-sm">
              <span className="mr-1 text-amber-500">★</span>{restaurant.rating.toFixed(1)}
            </Badge>
            <button
              type="button"
              onClick={handleFavorite}
              aria-label={favorite ? `Remove ${restaurant.name} from favorites` : `Save ${restaurant.name} to favorites`}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-foreground shadow-sm transition-colors hover:bg-white"
            >
              <Heart className={favorite ? 'h-4 w-4 fill-brand-orange text-brand-orange' : 'h-4 w-4'} />
            </button>
          </div>
          <div className="absolute bottom-3 left-3 rounded-full bg-brand-green px-3 py-1 text-xs font-semibold text-white">
            Open now
          </div>
        </div>
        <CardContent className="space-y-2 pt-5">
          <h3 className="text-lg font-semibold tracking-tight">{restaurant.name}</h3>
          <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t border-border/60 pt-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock3 className="h-4 w-4 text-brand-orange" />
            {restaurant.deliveryTime}
          </div>
          <div className="flex items-center gap-1.5">
            <Bike className="h-4 w-4 text-brand-purple" />
            {restaurant.deliveryFee}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
