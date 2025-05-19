
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = () => {
  const { userProfile, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="sticky top-0 z-30 w-full bg-white border-b shadow-sm">
      <div className="container flex items-center justify-between h-16 mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-brand-orange">
            FoodHub
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden space-x-6 md:flex">
          <Link to="/" className="text-foreground hover:text-brand-orange transition-colors">
            Home
          </Link>
          <Link to="/restaurants" className="text-foreground hover:text-brand-orange transition-colors">
            Restaurants
          </Link>
        </div>

        {/* Desktop Right Navigation */}
        <div className="hidden items-center space-x-4 md:flex">
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="relative">
                <Button variant="ghost" className="p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground">
                    <circle cx="8" cy="21" r="1"/>
                    <circle cx="19" cy="21" r="1"/>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{userProfile?.name ? getInitials(userProfile.name) : "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium">{userProfile?.name}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button variant="default" className="bg-brand-orange hover:bg-brand-orange/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Link to="/cart" className="relative mr-2">
            <Button variant="ghost" size="sm" className="p-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brand-orange text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12"/>
                  <line x1="4" x2="20" y1="6" y2="6"/>
                  <line x1="4" x2="20" y1="18" y2="18"/>
                </svg>
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col h-full">
                <div className="py-6">
                  <Link to="/" className="flex items-center mb-6">
                    <span className="text-xl font-bold text-brand-orange">
                      FoodHub
                    </span>
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    <Link to="/" className="text-foreground hover:text-brand-orange transition-colors py-2">
                      Home
                    </Link>
                    <Link to="/restaurants" className="text-foreground hover:text-brand-orange transition-colors py-2">
                      Restaurants
                    </Link>
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center space-x-2 py-2">
                          <Avatar className="w-6 h-6">
                            <AvatarFallback className="text-xs">{userProfile?.name ? getInitials(userProfile.name) : "U"}</AvatarFallback>
                          </Avatar>
                          <p className="text-sm font-medium">{userProfile?.name}</p>
                        </div>
                        <Button variant="ghost" className="justify-start px-0" onClick={logout}>
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/auth?mode=login" className="py-2">
                          Login
                        </Link>
                        <Link to="/auth?mode=signup" className="py-2">
                          <Button size="sm" className="w-full bg-brand-orange hover:bg-brand-orange/90">
                            Sign Up
                          </Button>
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
