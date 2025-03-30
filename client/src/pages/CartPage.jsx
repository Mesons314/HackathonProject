import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/common/Layout';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, ArrowRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

// Format price from cents to dollars
const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

const CartPage = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  // Calculate shipping cost (free over $50)
  const shippingCost = cartTotal > 5000 ? 0 : 499;
  
  // Calculate tax (assumed 8%)
  const taxRate = 0.08;
  const taxAmount = Math.round(cartTotal * taxRate);
  
  // Total order cost
  const orderTotal = cartTotal + shippingCost + taxAmount;
  
  // Create order mutation
  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const res = await apiRequest('POST', '/api/orders', orderData);
      return await res.json();
    },
    onSuccess: () => {
      clearCart();
      toast({
        title: 'Order placed successfully',
        description: 'Thank you for your purchase!',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to place order',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: 'Cart is empty',
        description: 'Add items to your cart before checking out',
        variant: 'destructive',
      });
      return;
    }
    
    setIsCheckingOut(true);
    
    const orderItems = cartItems.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: item.price
    }));
    
    // Create an order
    createOrderMutation.mutate(
      {
        items: orderItems,
        total: orderTotal
      },
      {
        onSettled: () => {
          setIsCheckingOut(false);
        }
      }
    );
  };
  
  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      toast({
        title: 'Please enter a coupon code',
        variant: 'destructive',
      });
      return;
    }
    
    // In a real app, this would validate the coupon with the server
    toast({
      title: 'Invalid coupon code',
      description: 'The coupon code you entered is not valid',
      variant: 'destructive',
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-8">
            <ShoppingCart className="h-6 w-6 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold">Shopping Cart</h1>
          </div>
          
          {cartItems.length === 0 ? (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <div className="inline-block p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <ShoppingCart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Browse our marketplace to find products you'll love
                  </p>
                  <Link href="/explore">
                    <Button>Start Shopping</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle className="text-xl">Cart Items ({cartItems.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cartItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex flex-col sm:flex-row">
                            <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0">
                              <img 
                                src={`${item.imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} 
                                alt={item.name} 
                                className="w-full h-full object-cover rounded-md" 
                              />
                            </div>
                            
                            <div className="flex-1 sm:ml-6">
                              <div className="flex flex-col sm:flex-row justify-between">
                                <div>
                                  <h3 className="text-lg font-medium">{item.name}</h3>
                                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{item.shop}</p>
                                  <div className="text-primary-600 font-medium">
                                    {formatPrice(item.price)}
                                  </div>
                                </div>
                                
                                <div className="flex items-center mt-4 sm:mt-0">
                                  <div className="flex items-center border rounded-md mr-4">
                                    <button 
                                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                      disabled={item.quantity <= 1}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                    <span className="px-2 py-1 text-center w-10">{item.quantity}</span>
                                    <button 
                                      className="px-2 py-1 text-gray-600 hover:text-gray-800"
                                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </button>
                                  </div>
                                  
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    className="text-gray-500 hover:text-red-500"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Subtotal: {formatPrice(item.price * item.quantity)}
                              </div>
                            </div>
                          </div>
                          
                          {index < cartItems.length - 1 && (
                            <Separator className="my-6" />
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </Button>
                    
                    <Link href="/explore">
                      <Button variant="outline">Continue Shopping</Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="mb-6 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                        <span>{formatPrice(cartTotal)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                        <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Tax (8%)</span>
                        <span>{formatPrice(taxAmount)}</span>
                      </div>
                      
                      <div className="pt-4">
                        <Label htmlFor="coupon" className="mb-2 block">Have a coupon?</Label>
                        <div className="flex">
                          <Input
                            id="coupon"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="rounded-r-none"
                          />
                          <Button
                            onClick={handleApplyCoupon}
                            className="rounded-l-none"
                            variant="secondary"
                          >
                            Apply
                          </Button>
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="flex justify-between items-center pt-2">
                        <span className="text-lg font-semibold">Total</span>
                        <span className="text-lg font-semibold">{formatPrice(orderTotal)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={handleCheckout}
                      disabled={isCheckingOut || cartItems.length === 0}
                    >
                      {isCheckingOut ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2 h-4 w-4" />
                          Checkout
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Shipping Policy */}
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <p className="mb-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Free shipping</span> on orders over $50
                  </p>
                  <p>
                    Need help? <a href="#" className="text-primary-600 hover:underline">Contact our support team</a>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
