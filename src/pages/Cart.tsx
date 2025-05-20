
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { toast } from '@/components/ui/sonner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Define delivery areas with prices
const deliveryAreas = [
  { id: 'downtown', name: 'Downtown', fee: 2.99 },
  { id: 'uptown', name: 'Uptown', fee: 3.99 },
  { id: 'midtown', name: 'Midtown', fee: 3.49 },
  { id: 'suburb', name: 'Suburbs', fee: 5.99 },
  { id: 'outer', name: 'Outer Areas', fee: 7.99 },
];

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const { items, totalItems, totalPrice, restaurantName, clearCart } = useCart();
  const navigate = useNavigate();
  
  // State for delivery options
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [deliveryArea, setDeliveryArea] = useState(deliveryAreas[0].id);
  
  // Calculate fees based on selection
  const selectedArea = deliveryAreas.find(area => area.id === deliveryArea);
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : (selectedArea?.fee || 3.99);
  const taxAmount = totalPrice * 0.08;
  const totalAmount = totalPrice + (deliveryMethod === 'delivery' ? deliveryFee : 0) + taxAmount;
  
  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/auth?mode=login');
      return;
    }
    
    // Navigate to payment page
    navigate('/payment', { 
      state: { 
        amount: totalAmount, 
        items,
        deliveryMethod,
        deliveryArea: deliveryMethod === 'delivery' ? selectedArea?.name : null,
        deliveryFee: deliveryMethod === 'delivery' ? deliveryFee : 0,
        taxAmount
      } 
    });
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
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Delivery Options</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup 
                    value={deliveryMethod} 
                    onValueChange={setDeliveryMethod}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Home Delivery</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup">Pickup from Restaurant</Label>
                    </div>
                  </RadioGroup>
                  
                  {deliveryMethod === 'delivery' && (
                    <div className="mt-6">
                      <Label htmlFor="area">Delivery Area</Label>
                      <Select value={deliveryArea} onValueChange={setDeliveryArea}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select your area" />
                        </SelectTrigger>
                        <SelectContent>
                          {deliveryAreas.map(area => (
                            <SelectItem key={area.id} value={area.id}>
                              {area.name} (${area.fee.toFixed(2)})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
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
                      <span>${deliveryMethod === 'pickup' ? '0.00' : deliveryFee.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${taxAmount.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-brand-orange hover:bg-brand-orange/90"
                  >
                    {isAuthenticated ? 'Proceed to Payment' : 'Sign in to Order'}
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
