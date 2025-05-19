
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t">
      <div className="container py-12 mx-auto">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex items-center">
              <span className="text-2xl font-bold text-brand-orange">
                FoodHub
              </span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Bringing the best local restaurants right to your doorstep.
              Quality food, fast delivery, satisfaction guaranteed.
            </p>
          </div>
          
          <div>
            <h3 className="text-base font-medium">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Restaurants
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Your Cart
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium">Account</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link to="/auth?mode=login" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/auth?mode=signup" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-brand-orange transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 mt-8 border-t">
          <p className="text-sm text-center text-muted-foreground">
            © {currentYear} FoodHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
