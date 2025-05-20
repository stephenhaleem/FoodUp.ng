
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CheckCircle, Clock } from 'lucide-react';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isPending = location.state?.isPending;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 container py-16">
        <div className="max-w-lg mx-auto text-center">
          {isPending ? (
            <Clock className="w-20 h-20 text-brand-orange mx-auto mb-6" />
          ) : (
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
          )}
          
          <h1 className="text-3xl font-bold mb-4">
            {isPending ? "Bank Transfer Initiated" : "Payment Successful!"}
          </h1>
          
          <p className="text-lg mb-6">
            {isPending ? 
              "Your order has been received and will be processed once your bank transfer is confirmed." :
              "Thank you for your order! Your payment has been processed successfully."
            }
          </p>
          
          {isPending && (
            <div className="mb-8 p-6 bg-muted/30 rounded-lg text-left">
              <h3 className="font-medium mb-2">Payment Instructions:</h3>
              <ol className="list-decimal ml-5 space-y-2">
                <li>Transfer the exact amount to our bank account.</li>
                <li>Include your reference number in the payment description.</li>
                <li>Your order will be processed once payment is verified (usually within 24 hours).</li>
              </ol>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              onClick={() => navigate('/restaurants')}
              className="bg-brand-orange hover:bg-brand-orange/90"
            >
              Browse More Restaurants
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/profile?tab=orders')}
            >
              View Your Orders
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
