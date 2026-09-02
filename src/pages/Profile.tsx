import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import * as z from "zod";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CreditCard,
  UserRound,
  Lock,
  Trash2,
  Settings,
  Gift,
  HelpCircle,
  AlertCircle,
  X,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Profile schema
const profileFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  phone: z.string().optional(),
  address: z
    .string()
    .min(5, { message: "Please enter a valid address." })
    .optional(),
});

// Password schema
const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Mock data for payment methods
const mockPaymentMethods = [
  { id: 1, type: "Credit Card", lastFour: "4242", expiryDate: "12/24" },
  { id: 2, type: "Bank Account", lastFour: "1234", bankName: "Chase" },
];

// Mock data for order history
const mockOrderHistory = [
  {
    id: "ORD001",
    restaurant: "Pizza Heaven",
    date: "2025-05-18",
    total: "₦24,990",
    status: "Delivered",
  },
  {
    id: "ORD002",
    restaurant: "Burger Palace",
    date: "2025-05-15",
    total: "₦18,500",
    status: "Delivered",
  },
  {
    id: "ORD003",
    restaurant: "Sushi Express",
    date: "2025-05-10",
    total: "₦32,750",
    status: "Delivered",
  },
];

// Mock data for saved restaurants
const mockSavedRestaurants = [
  { id: "1", name: "Pizza Heaven", cuisine: "Italian", rating: 4.7 },
  { id: "2", name: "Burger Palace", cuisine: "American", rating: 4.5 },
  { id: "3", name: "Sushi Express", cuisine: "Japanese", rating: 4.6 },
];

const Profile = () => {
  const { userProfile, updateUserProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRemovePaymentDialogOpen, setIsRemovePaymentDialogOpen] =
    useState(false);
  const [paymentToRemove, setPaymentToRemove] = useState<number | null>(null);

  // Profile form
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: userProfile?.name || "",
      phone: userProfile?.phone_number || "",
      address: userProfile?.address || "",
    },
  });

  // Password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Update profile
  const onProfileSubmit = async (values: z.infer<typeof profileFormSchema>) => {
    try {
      await updateUserProfile({
        id: userProfile?.id || "",
        email: userProfile?.email || "",
        name: values.name,
        avatar_url: userProfile?.avatar_url,
        phone_number: values.phone,
        address: values.address,
      });

      toast("Profile updated", {
        description: "Your profile information has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast("Update failed", {
        description:
          "There was a problem updating your profile. Please try again.",
      });
    }
  };

  // Update password
  const onPasswordSubmit = async (
    values: z.infer<typeof passwordFormSchema>,
  ) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (error) throw error;

      toast("Password updated", {
        description: "Your password has been updated successfully.",
      });

      passwordForm.reset();
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast("Update failed", {
        description:
          error.message ||
          "There was a problem updating your password. Please try again.",
      });
    }
  };

  // Delete account
  const handleDeleteAccount = async () => {
    try {
      // In a real app, you would delete the account data and auth account
      // For now we'll just log out the user and show a toast
      await logout();
      toast("Account deleted", {
        description: "Your account has been deleted successfully.",
      });
      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      toast("Delete failed", {
        description:
          "There was a problem deleting your account. Please try again.",
      });
    } finally {
      setIsDeleteDialogOpen(false);
    }
  };

  // Remove payment method
  const handleRemovePayment = (id: number) => {
    setPaymentToRemove(id);
    setIsRemovePaymentDialogOpen(true);
  };

  const confirmRemovePayment = () => {
    const updatedPaymentMethods = mockPaymentMethods.filter(
      (method) => method.id !== paymentToRemove,
    );
    // In a real app, you would update the payment methods in the database
    toast("Payment method removed", {
      description: "Your payment method has been removed successfully.",
    });
    setIsRemovePaymentDialogOpen(false);
  };

  // View restaurant menu
  const handleViewMenu = (restaurantId: string) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  // View order details
  const handleViewOrderDetails = (orderId: string) => {
    toast("Order Details", {
      description: `Viewing details for order ${orderId}`,
    });
    // In a real app, you would navigate to the order details page
    // navigate(`/orders/${orderId}`);
  };

  // Add payment method
  const handleAddPayment = () => {
    navigate("/payment/add");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="bg-brand-charcoal py-10 text-brand-cream">
        <div className="container">
          <h1 className="text-brand-cream">Your Profile</h1>
          <p className="mt-2 text-brand-cream/70">
            Manage your account settings and preferences.
          </p>
        </div>
      </div>

      <div className="flex-1 container py-12">

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 mb-8">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              <span className="hidden md:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="h-4 w-4" />
              <span className="hidden md:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden md:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="restaurants"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden md:inline">Saved</span>
            </TabsTrigger>
            <TabsTrigger value="referrals" className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="hidden md:inline">Referrals</span>
            </TabsTrigger>
            <TabsTrigger value="help" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              <span className="hidden md:inline">Help</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your personal information and contact details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...profileForm}>
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex items-center space-x-2">
                      <AlertCircle className="h-4 w-4 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Email can be updated in the Security tab
                      </p>
                    </div>

                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={profileForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Delivery Address</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-brand-chili hover:bg-brand-chili/90"
                    >
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>
                  Update your password to keep your account secure.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-6"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="bg-brand-chili hover:bg-brand-chili/90"
                    >
                      Update Password
                    </Button>
                  </form>
                </Form>

                <div className="mt-12 border-t pt-8">
                  <div className="flex flex-col space-y-2">
                    <h3 className="text-lg font-medium text-red-600">
                      Delete Account
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                  </div>

                  <Button
                    variant="destructive"
                    className="mt-4"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Delete Account Dialog */}
            <AlertDialog
              open={isDeleteDialogOpen}
              onOpenChange={setIsDeleteDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Manage your payment methods for seamless checkout.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockPaymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center justify-between border p-4 rounded-md"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="bg-muted h-12 w-12 rounded-md flex items-center justify-center">
                          <CreditCard className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="font-medium">{method.type}</p>
                          <p className="text-sm text-muted-foreground">
                            Ending in {method.lastFour}{" "}
                            {method.expiryDate &&
                              `• Expires ${method.expiryDate}`}
                          </p>
                          {method.bankName && (
                            <p className="text-sm text-muted-foreground">
                              {method.bankName}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRemovePayment(method.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  ))}

                  <Button
                    className="bg-brand-chili hover:bg-brand-chili/90"
                    onClick={handleAddPayment}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Remove Payment Method Dialog */}
            <AlertDialog
              open={isRemovePaymentDialogOpen}
              onOpenChange={setIsRemovePaymentDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Remove payment method?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to remove this payment method from
                    your account?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmRemovePayment}>
                    Remove
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </TabsContent>

          {/* Order History Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  View your past orders and their status.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order ID</TableHead>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockOrderHistory.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">
                            {order.id}
                          </TableCell>
                          <TableCell>{order.restaurant}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                              {order.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewOrderDetails(order.id)}
                            >
                              View Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Saved Restaurants Tab */}
          <TabsContent value="restaurants">
            <Card>
              <CardHeader>
                <CardTitle>Saved Restaurants</CardTitle>
                <CardDescription>
                  Your favorite places to order from.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Restaurant</TableHead>
                        <TableHead>Cuisine</TableHead>
                        <TableHead>Rating</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockSavedRestaurants.map((restaurant) => (
                        <TableRow key={restaurant.id}>
                          <TableCell className="font-medium">
                            {restaurant.name}
                          </TableCell>
                          <TableCell>{restaurant.cuisine}</TableCell>
                          <TableCell>⭐ {restaurant.rating}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewMenu(restaurant.id)}
                            >
                              View Menu
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Referrals Tab */}
          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referrals & Gift Cards</CardTitle>
                <CardDescription>
                  Share the love and get rewarded.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="rounded-md bg-muted/50 p-6">
                    <h3 className="text-lg font-medium mb-2">Invite Friends</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      For every friend you refer who signs up, you'll both
                      receive ₦10,000 in credit.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Input
                        value="https://foodhub.com/ref/user123"
                        readOnly
                        className="bg-background"
                      />
                      <Button className="bg-brand-chili hover:bg-brand-chili/90">
                        Copy Link
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">Gift Cards</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-medium mb-2">Send a Gift Card</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Share the joy of delicious meals with your loved
                            ones.
                          </p>
                          <Button variant="outline" className="w-full">
                            Send Gift Card
                          </Button>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-6">
                          <h4 className="font-medium mb-2">
                            Redeem a Gift Card
                          </h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            Enter your code to add credit to your account.
                          </p>
                          <Button variant="outline" className="w-full">
                            Redeem Gift Card
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Help Tab */}
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>Help & Support</CardTitle>
                <CardDescription>
                  Find answers to common questions or contact our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Frequently Asked Questions
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          q: "How do I track my order?",
                          a: "You can track your order in real-time from the Orders tab in your profile or directly from the order confirmation page.",
                        },
                        {
                          q: "What is the delivery fee?",
                          a: "Delivery fees vary by restaurant and distance. The exact fee will be displayed during checkout before you place your order.",
                        },
                        {
                          q: "How can I get a refund?",
                          a: "If there's an issue with your order, you can request a refund directly from your order details page within 24 hours of delivery.",
                        },
                        {
                          q: "How do I report an issue with my order?",
                          a: "Go to your order history, select the problematic order, and click on 'Report Issue' to let us know what went wrong.",
                        },
                      ].map((faq, i) => (
                        <div key={i} className="border-b pb-4">
                          <h4 className="font-medium mb-2">{faq.q}</h4>
                          <p className="text-sm text-muted-foreground">
                            {faq.a}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Contact Support
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Still need help? Our support team is available 24/7.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button className="bg-brand-chili hover:bg-brand-chili/90">
                        Chat with Support
                      </Button>
                      <Button variant="outline">Email Support</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
