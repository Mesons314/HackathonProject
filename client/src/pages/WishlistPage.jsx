import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/common/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Link } from 'wouter';

// Format price from cents to dollars
const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

const WishlistPage = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [isMovingToCart, setIsMovingToCart] = useState(null);
  const [isRemoving, setIsRemoving] = useState(null);
  
  // Fetch wishlist items
  const { 
    data: wishlistItems, 
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['/api/wishlist'],
    queryFn: async () => {
      const res = await fetch('/api/wishlist', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch wishlist');
      return await res.json();
    },
  });
  
  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (wishlistItemId) => {
      await apiRequest('DELETE', `/api/wishlist/${wishlistItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: 'Item removed',
        description: 'Item has been removed from your wishlist',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to remove item',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  
  const handleRemoveFromWishlist = (wishlistItemId) => {
    setIsRemoving(wishlistItemId);
    removeFromWishlistMutation.mutate(wishlistItemId, {
      onSettled: () => {
        setIsRemoving(null);
      }
    });
  };
  
  const handleMoveToCart = (item) => {
    setIsMovingToCart(item.id);
    try {
      addToCart(item.product);
      handleRemoveFromWishlist(item.id);
    } catch (error) {
      toast({
        title: 'Failed to add to cart',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsMovingToCart(null);
    }
  };
  
  // If the API call fails, use mock data for demo
  const mockWishlistItems = [
    {
      id: 1,
      product: {
        id: 1,
        name: "Artisan Sourdough Bread",
        shop: "Sarah's Bakery",
        price: 699,
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        category: "Groceries"
      }
    },
    {
      id: 2,
      product: {
        id: 3,
        name: "Handmade Lavender Soap",
        shop: "Craft & Co.",
        price: 599,
        imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe",
        category: "Gifts"
      }
    },
    {
      id: 3,
      product: {
        id: 5,
        name: "Local Roast Coffee Beans",
        shop: "Brew House",
        price: 1299,
        imageUrl: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1",
        category: "Beverages"
      }
    }
  ];
  
  const displayItems = wishlistItems || [];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-8">
            <Heart className="h-6 w-6 text-primary-600 mr-3" fill="currentColor" />
            <h1 className="text-3xl font-bold">My Wishlist</h1>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            </div>
          ) : isError ? (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <p className="text-red-500 mb-2">Error loading your wishlist</p>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">{error.message}</p>
                  <Button onClick={() => refetch()}>Try Again</Button>
                </div>
              </CardContent>
            </Card>
          ) : displayItems.length === 0 ? (
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <div className="inline-block p-3 bg-gray-100 dark:bg-gray-800 rounded-full mb-4">
                    <Heart className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Browse our marketplace to find products you'll love
                  </p>
                  <Link href="/explore">
                    <Button>Explore Products</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {displayItems.length} {displayItems.length === 1 ? 'item' : 'items'} in your wishlist
              </p>
              
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {displayItems.map((item, index) => (
                      <motion.div 
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                          <div className="flex-shrink-0 w-24 h-24 mb-4 sm:mb-0">
                            <img 
                              src={`${item.product.imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80`} 
                              alt={item.product.name} 
                              className="w-full h-full object-cover rounded-md" 
                            />
                          </div>
                          
                          <div className="flex-1 sm:ml-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                              <div>
                                <h3 className="text-lg font-medium">
                                  {item.product.name}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                  {item.product.shop}
                                </p>
                                <div className="text-primary-600 font-medium">
                                  {formatPrice(item.product.price)}
                                </div>
                              </div>
                              
                              <div className="flex mt-4 sm:mt-0 space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMoveToCart(item)}
                                  disabled={isMovingToCart === item.id}
                                >
                                  {isMovingToCart === item.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                  ) : (
                                    <ShoppingCart className="h-4 w-4 mr-2" />
                                  )}
                                  Add to Cart
                                </Button>
                                
                                <Button 
                                  variant="ghost" 
                                  size="icon"
                                  className="text-gray-500 hover:text-red-500"
                                  onClick={() => handleRemoveFromWishlist(item.id)}
                                  disabled={isRemoving === item.id}
                                >
                                  {isRemoving === item.id ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Trash2 className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < displayItems.length - 1 && (
                          <Separator className="my-6" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex justify-between">
                <Link href="/explore">
                  <Button variant="outline">Continue Shopping</Button>
                </Link>
                
                <Button
                  onClick={() => {
                    displayItems.forEach(item => {
                      addToCart(item.product);
                    });
                    toast({
                      title: 'Success',
                      description: 'All items added to cart',
                    });
                  }}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add All to Cart
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
