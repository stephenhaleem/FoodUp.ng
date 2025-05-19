
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { useToast } from '@/components/ui/use-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { items, totalItems, totalPrice, restaurantName, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/auth?mode=login');
      return;
    }
    
    // Simulate checkout process
    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed.",
    });
    
    clearCart();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
        
        {totalItems === 0 ? (
          <div className="text-center py-16">
            <div className="mb-6 text-muted-foreground">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="64" 
                height="64" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="mx-auto opacity-50"
              >
                <circle cx="8" cy="21" r="1"/>
                <circle cx="19" cy="21" r="1"/>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
              </svg>
            </div>
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any food to your cart yet.</p>
            <Button 
              onClick={() => navigate('/restaurants')}
              className="bg-brand-orange hover:bg-brand-orange/90"
            >
              Browse Restaurants
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div>Items from {restaurantName}</div>
                    <Button variant="ghost" onClick={clearCart} className="text-sm">Clear cart</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {items.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery fee</span>
                      <span>$3.99</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${(totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${(totalPrice + 3.99 + totalPrice * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90"
                  >
                    {isAuthenticated ? 'Place Order' : 'Sign in to Order'}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
