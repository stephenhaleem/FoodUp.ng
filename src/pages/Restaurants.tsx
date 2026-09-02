import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import RestaurantCard, { Restaurant } from "../components/RestaurantCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useFavorites } from "../context/FavoritesContext";

// Mock restaurant data
const restaurantsData: Restaurant[] = [
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
  {
    id: "4",
    name: "Taco Fiesta",
    cuisine: "Mexican, Tacos",
    rating: 4.3,
    deliveryTime: "10-25 min",
    deliveryFee: "₦1,500",
    image:
      "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "5",
    name: "Green Bowl",
    cuisine: "Healthy, Salads",
    rating: 4.2,
    deliveryTime: "15-25 min",
    deliveryFee: "₦2,000",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "6",
    name: "Noodle House",
    cuisine: "Asian, Noodles",
    rating: 4.4,
    deliveryTime: "20-35 min",
    deliveryFee: "₦2,500",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80",
  },
];

const Restaurants = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [cuisineFilter, setCuisineFilter] = useState("all");
  const [showFavorites, setShowFavorites] = useState(false);
  const [searchParams] = useSearchParams();
  const { isFavorite } = useFavorites();

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setCuisineFilter(searchParams.get("category") || "all");
  }, [searchParams]);

  // Extract unique cuisines for filter
  const allCuisines = Array.from(
    new Set(
      restaurantsData.flatMap((restaurant) =>
        restaurant.cuisine.split(",").map((cuisine) => cuisine.trim()),
      ),
    ),
  );

  // Filter and sort restaurants
  const filteredRestaurants = restaurantsData
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCuisine =
        cuisineFilter === "all" ||
        restaurant.cuisine.toLowerCase().includes(cuisineFilter.toLowerCase());

      return (
        matchesSearch &&
        matchesCuisine &&
        (!showFavorites || isFavorite(restaurant.id))
      );
    })
    .sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "delivery") {
        return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
      }
      return 0;
    });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-muted/30 py-8">
        <div className="container">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-chili">
                Find your next favorite
              </p>
              <h1 className="mb-2 text-3xl font-bold">Restaurants</h1>
            </div>
            <Button
              variant={showFavorites ? "default" : "outline"}
              onClick={() => setShowFavorites(!showFavorites)}
              className={
                showFavorites ? "bg-brand-chili hover:bg-brand-chili/90" : ""
              }
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              {showFavorites ? "Showing favorites" : "My favorites"}
            </Button>
          </div>
          <p className="mb-6 text-muted-foreground">
            Discover the best food & drinks in your area
          </p>

          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search for restaurants or cuisines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by cuisine" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  {allCuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine.toLowerCase()}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="delivery">Fastest Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 container py-8">
        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-xl font-medium mb-2">No restaurants found</h2>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setCuisineFilter("all");
                setShowFavorites(false);
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRestaurants.map((restaurant) => (
              <div key={restaurant.id}>
                <RestaurantCard restaurant={restaurant} />
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Restaurants;
