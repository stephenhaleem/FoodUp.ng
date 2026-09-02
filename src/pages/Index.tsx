import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import RestaurantCard, { Restaurant } from "../components/RestaurantCard";

// Featured restaurants (subset of all restaurants)
const featuredRestaurants: Restaurant[] = [
  {
    id: "1",
    name: "Burger Palace",
    cuisine: "American, Burgers",
    rating: 4.5,
    deliveryTime: "20-35 min",
    deliveryFee: "₦1,500",
    image:
      "https://images.unsplash.com/photo-1571091718767-18b5b1457add?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "2",
    name: "Pizza Heaven",
    cuisine: "Italian, Pizza",
    rating: 4.7,
    deliveryTime: "25-40 min",
    deliveryFee: "₦2,500",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "3",
    name: "Sushi Express",
    cuisine: "Japanese, Sushi",
    rating: 4.6,
    deliveryTime: "15-30 min",
    deliveryFee: "₦3,500",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
];

// Featured categories
const categories = [
  {
    id: "burgers",
    name: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pizza",
    name: "Pizza",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "sushi",
    name: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "healthy",
    name: "Healthy",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar transparent />

      <Hero />

      {/* Featured Categories */}
      <section className="py-16 bg-brand-cream">
        <div className="container">
          <h2 className="mb-8">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/restaurants?category=${category.id}`}
                className="group relative overflow-hidden rounded-lg aspect-square shadow-md transition-transform hover:scale-[1.02]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover h-full w-full group-hover:scale-[1.05] transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                  <h3 className="font-bold text-white text-lg">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16 bg-brand-charcoal">
        <div className="container">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-brand-cream">Popular right now</h2>
            <Link to="/restaurants">
              <Button
                variant="ghost"
                className="text-brand-gold hover:text-brand-gold/80 hover:bg-brand-cream/5"
              >
                View all
              </Button>
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-brand-cream">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-lightPurple rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-purple font-bold text-xl">1</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Choose a Restaurant
              </h3>
              <p className="text-muted-foreground">
                Browse through our wide selection of restaurants and cuisines
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-lightPurple rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-purple font-bold text-xl">2</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">Select Your Meal</h3>
              <p className="text-muted-foreground">
                Choose from a variety of delicious meals and add them to your
                cart
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-brand-lightPurple rounded-full flex items-center justify-center mb-4">
                <span className="text-brand-purple font-bold text-xl">3</span>
              </div>
              <h3 className="font-semibold text-lg mb-2">
                Enjoy Your Delivery
              </h3>
              <p className="text-muted-foreground">
                Place your order and wait for your food to be delivered to your
                doorstep
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-brand-charcoal text-brand-cream">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-brand-cream">Hungry yet?</h2>
            <p className="mb-6 mt-3 text-brand-cream/70">
              Sign up now and your first delivery is on us.
            </p>
            <Link to="/auth?mode=signup">
              <Button
                size="lg"
                className="rounded-full bg-brand-chili hover:bg-brand-chili/90"
              >
                Sign up now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
