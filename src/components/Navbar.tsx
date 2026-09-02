// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound, Settings, LogOut, ShoppingBag, Menu } from "lucide-react";

interface NavbarProps {
  /** Only true on the homepage hero, where the nav floats over a dark photo */
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const { userProfile, isAuthenticated, logout } = useAuth();
  const { totalItems } = useCart();

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

  return (
    <nav
      className={
        transparent
          ? "absolute left-0 top-0 z-30 w-full bg-transparent"
          : "sticky top-0 z-30 w-full bg-brand-charcoal shadow-sm"
      }
    >
      <div className="container mx-auto flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-display text-2xl font-semibold text-brand-cream">
            Food<span className="text-brand-chili">Up</span>
          </span>
        </Link>

        <div
          className={
            transparent
              ? "hidden items-center space-x-2 rounded-full border border-brand-cream/10 bg-brand-charcoal/35 px-2 py-1.5 backdrop-blur-xl md:flex"
              : "hidden items-center space-x-2 md:flex"
          }
        >
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-sm font-medium text-brand-cream/75 transition-colors hover:bg-brand-cream/10 hover:text-brand-cream"
          >
            Home
          </Link>
          <Link
            to="/restaurants"
            className="rounded-full px-4 py-2 text-sm font-medium text-brand-cream/75 transition-colors hover:bg-brand-cream/10 hover:text-brand-cream"
          >
            Kitchens
          </Link>
        </div>

        <div
          className={
            transparent
              ? "hidden items-center space-x-2 rounded-full border border-brand-cream/10 bg-brand-charcoal/35 px-2 py-1.5 backdrop-blur-xl md:flex"
              : "hidden items-center space-x-2 md:flex"
          }
        >
          {isAuthenticated ? (
            <>
              <Link to="/cart" className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-brand-cream hover:bg-brand-cream/10 hover:text-brand-cream"
                >
                  <ShoppingBag className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-chili text-xs text-brand-cream">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center space-x-2 cursor-pointer">
                    <Avatar className="h-8 w-8 border border-brand-cream/20">
                      <AvatarFallback className="bg-brand-gold text-brand-charcoal text-xs">
                        {userProfile?.name
                          ? getInitials(userProfile.name)
                          : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 border-brand-cream/10 bg-brand-charcoal/90 text-brand-cream shadow-2xl backdrop-blur-xl"
                >
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      <UserRound className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile?tab=orders"
                      className="w-full cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Order History
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to="/auth?mode=login">
                <Button
                  variant="ghost"
                  className="text-brand-cream hover:bg-brand-cream/10 hover:text-brand-cream"
                >
                  Login
                </Button>
              </Link>
              <Link to="/auth?mode=signup">
                <Button className="rounded-full bg-brand-chili hover:bg-brand-chili/90">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <Link to="/cart" className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="text-brand-cream hover:bg-brand-cream/10"
            >
              <ShoppingBag className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-chili text-xs text-brand-cream">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-brand-cream hover:bg-brand-cream/10"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-brand-cream/10 bg-brand-charcoal/85 text-brand-cream shadow-2xl backdrop-blur-xl"
            >
              <div className="flex flex-col h-full pt-6">
                <span className="font-display text-xl font-semibold mb-6">
                  Food<span className="text-brand-chili">Up</span>
                </span>
                <nav className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="py-2 text-brand-cream/80 hover:text-brand-cream"
                  >
                    Home
                  </Link>
                  <Link
                    to="/restaurants"
                    className="py-2 text-brand-cream/80 hover:text-brand-cream"
                  >
                    Kitchens
                  </Link>
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="py-2 text-brand-cream/80 hover:text-brand-cream"
                      >
                        Profile
                      </Link>
                      <Button
                        variant="ghost"
                        className="justify-start px-0 text-brand-cream/80 hover:text-brand-cream"
                        onClick={logout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/auth?mode=login"
                        className="py-2 text-brand-cream/80 hover:text-brand-cream"
                      >
                        Login
                      </Link>
                      <Link to="/auth?mode=signup">
                        <Button className="w-full rounded-full bg-brand-chili hover:bg-brand-chili/90">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
