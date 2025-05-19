
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-brand-lightPurple/30 to-white/0" />
      
      <div className="container relative z-10 px-6 py-16 mx-auto text-center md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
            <span className="block text-foreground">Delicious Food.</span>
            <span className="block text-brand-orange">
              Delivered Fast.
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-muted-foreground md:text-xl">
            Order from your favorite local restaurants with just a few taps. 
            From comfort food to healthy options - we deliver it all to your doorstep.
          </p>
          
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link to="/restaurants">
              <Button size="lg" className="bg-brand-orange hover:bg-brand-orange/90 text-white">
                Browse Restaurants
              </Button>
            </Link>
            <Link to="/auth?mode=signup">
              <Button size="lg" variant="outline" className="border-brand-purple text-brand-purple hover:bg-brand-purple/5">
                Sign Up to Order
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative mt-12 md:mt-16 lg:mt-20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-brand-orange/10 rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <div className="overflow-hidden bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="w-48 h-48 bg-muted animate-pulse-slow">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Pizza" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="overflow-hidden bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105">
              <div className="w-48 h-48 bg-muted animate-pulse-slow">
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Burger" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="hidden overflow-hidden bg-white rounded-lg shadow-lg md:block transform transition-transform hover:scale-105">
              <div className="w-48 h-48 bg-muted animate-pulse-slow">
                <img 
                  src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
                  alt="Sushi" 
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
