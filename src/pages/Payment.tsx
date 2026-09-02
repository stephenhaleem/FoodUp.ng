import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { formatNaira } from "../lib/currency";

const cardSchema = z.object({
  cardNumber: z
    .string()
    .min(13)
    .max(19)
    .regex(/^\d+$/, "Card number must contain only digits"),
  cardName: z.string().min(2, "Name on card is required"),
  expiry: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
      "Expiry date must be in MM/YY format",
    ),
  cvv: z.string().length(3).regex(/^\d+$/, "CVV must be 3 digits"),
});

const bankTransferSchema = z.object({
  accountName: z.string().min(2, "Account name is required"),
  reference: z.string().min(2, "Reference is required"),
});

const Payment = () => {
  const { userProfile } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const paymentData = location.state;

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);

  const cardForm = useForm<z.infer<typeof cardSchema>>({
    resolver: zodResolver(cardSchema),
    defaultValues: {
      cardNumber: "",
      cardName: "",
      expiry: "",
      cvv: "",
    },
  });

  const bankForm = useForm<z.infer<typeof bankTransferSchema>>({
    resolver: zodResolver(bankTransferSchema),
    defaultValues: {
      accountName: "",
      reference: `ORDER-${Math.floor(Math.random() * 1000000)}`,
    },
  });

  if (!paymentData || !paymentData.amount) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 container py-12 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Payment Information Missing
          </h2>
          <p className="mb-6">
            There was a problem with your payment information. Please return to
            your cart.
          </p>
          <Button
            onClick={() => navigate("/cart")}
            className="bg-brand-chili hover:bg-brand-chili/90"
          >
            Return to Cart
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const onCardSubmit = async (values: z.infer<typeof cardSchema>) => {
    setIsProcessing(true);
    // Simulate payment processing
    try {
      // In a real app, this would be an API call to a payment provider
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast("Payment Successful", {
        description: "Your order has been placed successfully.",
      });

      clearCart();
      navigate("/payment-success");
    } catch (error) {
      console.error("Payment failed:", error);
      toast("Payment Failed", {
        description:
          "There was a problem processing your payment. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const onBankSubmit = async (values: z.infer<typeof bankTransferSchema>) => {
    setIsProcessing(true);
    // Simulate bank transfer verification
    try {
      // In a real app, this might just record the intent to pay via bank transfer
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast("Bank Transfer Initiated", {
        description: "Your order will be confirmed once payment is received.",
      });

      clearCart();
      navigate("/payment-success", { state: { isPending: true } });
    } catch (error) {
      console.error("Bank transfer initiation failed:", error);
      toast("Process Failed", {
        description:
          "There was a problem initiating your bank transfer. Please try again.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-brand-charcoal py-10 text-brand-cream">
        <div className="container">
          <h1 className="text-brand-cream">Payment</h1>
          <p className="mt-2 text-brand-cream/70">
            Complete your order by providing payment details.
          </p>
        </div>
      </div>

      <div className="flex-1 container py-12">

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>
                  Choose how you would like to pay for your order.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4 mb-6"
                >
                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex-1">
                      Credit / Debit Card
                    </Label>
                    <div className="flex space-x-1">
                      <div className="w-8 h-5 bg-blue-500 rounded"></div>
                      <div className="w-8 h-5 bg-red-500 rounded"></div>
                      <div className="w-8 h-5 bg-green-500 rounded"></div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 border p-4 rounded-md">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex-1">
                      Bank Transfer
                    </Label>
                  </div>
                </RadioGroup>

                {paymentMethod === "card" ? (
                  <Form {...cardForm}>
                    <form
                      onSubmit={cardForm.handleSubmit(onCardSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={cardForm.control}
                        name="cardName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name on Card</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={cardForm.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="1234 5678 9012 3456"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={cardForm.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="MM/YY" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={cardForm.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl>
                                <Input {...field} placeholder="123" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-brand-chili hover:bg-brand-chili/90"
                        disabled={isProcessing}
                      >
                        {isProcessing ? "Processing..." : "Pay Now"}
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <Form {...bankForm}>
                    <form
                      onSubmit={bankForm.handleSubmit(onBankSubmit)}
                      className="space-y-6"
                    >
                      <div className="p-4 bg-muted/40 rounded-md mb-4">
                        <p className="font-medium mb-2">Bank Account Details</p>
                        <p>Bank: FoodHub Banking</p>
                        <p>Account Name: FoodHub Inc.</p>
                        <p>Account Number: 1234567890</p>
                        <p>Sort Code / Routing: 12-34-56</p>
                      </div>

                      <FormField
                        control={bankForm.control}
                        name="accountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Bank Account Name</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={bankForm.control}
                        name="reference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Payment Reference</FormLabel>
                            <FormControl>
                              <Input {...field} readOnly />
                            </FormControl>
                            <FormMessage />
                            <p className="text-sm text-muted-foreground">
                              Please include this reference when making your
                              transfer.
                            </p>
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full bg-brand-chili hover:bg-brand-chili/90"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : "Confirm Bank Transfer"}
                      </Button>
                    </form>
                  </Form>
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
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>
                      {formatNaira(
                        paymentData.amount -
                          paymentData.taxAmount -
                          paymentData.deliveryFee,
                      )}
                    </span>
                  </div>

                  {paymentData.deliveryFee > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery fee ({paymentData.deliveryArea})
                      </span>
                      <span>{formatNaira(paymentData.deliveryFee)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatNaira(paymentData.taxAmount)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{formatNaira(paymentData.amount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate("/cart")}
              >
                Return to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
