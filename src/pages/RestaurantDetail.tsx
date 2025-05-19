
import React from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FoodCard from '../components/FoodCard';
import { Restaurant } from '../components/RestaurantCard';
import { FoodItemProps } from '../components/FoodCard';

// Mock restaurant data
const restaurantsData: Restaurant[] = [
  {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American, Burgers',
    rating: 4.5,
    deliveryTime: '20-35 min',
    deliveryFee: '$0.99',
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '2',
    name: 'Pizza Heaven',
    cuisine: 'Italian, Pizza',
    rating: 4.7,
    deliveryTime: '25-40 min',
    deliveryFee: '$1.99',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '3',
    name: 'Sushi Express',
    cuisine: 'Japanese, Sushi',
    rating: 4.6,
    deliveryTime: '15-30 min',
    deliveryFee: '$2.99',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '4',
    name: 'Taco Fiesta',
    cuisine: 'Mexican, Tacos',
    rating: 4.3,
    deliveryTime: '10-25 min',
    deliveryFee: '$0.99',
    image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '5',
    name: 'Green Bowl',
    cuisine: 'Healthy, Salads',
    rating: 4.2,
    deliveryTime: '15-25 min',
    deliveryFee: '$1.49',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
  {
    id: '6',
    name: 'Noodle House',
    cuisine: 'Asian, Noodles',
    rating: 4.4,
    deliveryTime: '20-35 min',
    deliveryFee: '$1.99',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
  },
];

// Mock menu data
const generateMenuItems = (restaurantId: string, restaurantName: string): Record<string, FoodItemProps[]> => {
  const categories: Record<string, FoodItemProps[]> = {};
  
  if (restaurantId === '1') {
    categories['burgers'] = [
      {
        id: '101',
        name: 'Classic Cheeseburger',
        description: 'Beef patty with lettuce, tomato, onion, pickles, and American cheese',
        price: 8.99,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: '102',
        name: 'Bacon BBQ Burger',
        description: 'Beef patty with bacon, cheddar cheese, BBQ sauce, and onion rings',
        price: 10.99,
        image: 'https://images.unsplash.com/photo-1513185158878-8d8c2a2a3da3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: '103',
        name: 'Mushroom Swiss Burger',
        description: 'Beef patty with sautéed mushrooms and Swiss cheese',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1551615593-ef5fe247e8f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
    
    categories['sides'] = [
      {
        id: '104',
        name: 'French Fries',
        description: 'Crispy golden fries with sea salt',
        price: 3.99,
        image: 'https://images.unsplash.com/photo-1576777647209-e8733d7b851d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: '105',
        name: 'Onion Rings',
        description: 'Beer-battered onion rings with ranch dipping sauce',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1609167830220-7164aa360951?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
    
    categories['drinks'] = [
      {
        id: '106',
        name: 'Milkshake',
        description: 'Handspun vanilla, chocolate, or strawberry milkshake',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: '107',
        name: 'Soda',
        description: 'Coca-Cola, Diet Coke, Sprite, or Fanta',
        price: 1.99,
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
  } else if (restaurantId === '2') {
    categories['pizza'] = [
      {
        id: '201',
        name: 'Margherita Pizza',
        description: 'Fresh mozzarella, tomato sauce, and basil',
        price: 12.99,
        image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: '202',
        name: 'Pepperoni Pizza',
        description: 'Pepperoni, mozzarella, and tomato sauce',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1601924582970-9238bcb495d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
    // Add more menu categories for restaurant 2...
  } else {
    // Generic menu items for other restaurants
    categories['popular'] = [
      {
        id: `${restaurantId}01`,
        name: 'Popular Item 1',
        description: 'Delicious and popular menu item from this restaurant',
        price: 9.99,
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: `${restaurantId}02`,
        name: 'Popular Item 2',
        description: 'Another delicious and popular menu item',
        price: 11.99,
        image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
    
    categories['specials'] = [
      {
        id: `${restaurantId}03`,
        name: 'Special Item 1',
        description: 'A special dish prepared by our chef',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
      {
        id: `${restaurantId}04`,
        name: 'Special Item 2',
        description: 'Another special dish with unique flavors',
        price: 13.99,
        image: 'https://images.unsplash.com/photo-1541832676-9b763f77493b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
        restaurantId,
        restaurantName
      },
    ];
  }
  
  return categories;
};

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the restaurant based on ID
  const restaurant = restaurantsData.find(r => r.id === id);
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
          <p>The restaurant you're looking for doesn't exist or has been removed.</p>
        </div>
        <Footer />
      </div>
    );
  }
  
  // Generate menu items for the restaurant
  const menuCategories = generateMenuItems(restaurant.id, restaurant.name);
  const categoryNames = Object.keys(menuCategories);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Restaurant Hero */}
      <div className="relative h-64 md:h-80">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 pb-6 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {restaurant.name}
                </h1>
                <div className="flex items-center text-white/90">
                  <span>{restaurant.cuisine}</span>
                  <span className="mx-2">•</span>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="mr-1">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                    {restaurant.rating.toFixed(1)}
                  </span>
                </div>
              </div>
              <div className="text-white/90">
                <div className="text-sm">Delivery time</div>
                <div className="font-medium">{restaurant.deliveryTime}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Menu */}
      <div className="container py-8">
        <h2 className="text-2xl font-bold mb-6">Menu</h2>
        
        <Tabs defaultValue={categoryNames[0]} className="space-y-6">
          <div className="overflow-auto pb-2">
            <TabsList>
              {categoryNames.map(category => (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          {categoryNames.map(category => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {menuCategories[category].map(item => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
