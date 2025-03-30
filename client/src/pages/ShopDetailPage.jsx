import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/common/Layout';
import ProductCard from '@/components/buyer/ProductCard';
import OfferCard from '@/components/buyer/OfferCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Phone, Mail, MapPin, Clock, AlignLeft, Tag, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ShopDetailPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('products');
  
  // Fetch shop details
  const { 
    data: shop, 
    isLoading: isLoadingShop 
  } = useQuery({
    queryKey: [`/api/shops/${id}`],
    queryFn: async () => {
      const res = await fetch(`/api/shops/${id}`);
      if (!res.ok) throw new Error('Failed to fetch shop details');
      return await res.json();
    },
  });
  
  // Fetch shop products
  const { 
    data: products, 
    isLoading: isLoadingProducts 
  } = useQuery({
    queryKey: [`/api/shops/${id}/products`],
    queryFn: async () => {
      const res = await fetch(`/api/shops/${id}/products`);
      if (!res.ok) throw new Error('Failed to fetch shop products');
      return await res.json();
    },
    enabled: !!shop,
  });
  
  // Fetch shop offers
  const { 
    data: offers, 
    isLoading: isLoadingOffers 
  } = useQuery({
    queryKey: [`/api/shops/${id}/offers`],
    queryFn: async () => {
      const res = await fetch(`/api/shops/${id}/offers`);
      if (!res.ok) throw new Error('Failed to fetch shop offers');
      return await res.json();
    },
    enabled: !!shop,
  });
  
  // Mock data for demo purposes
  useEffect(() => {
    if (!isLoadingShop && !shop) {
      // This would normally come from the API
      console.log("Using mock data for shop", id);
    }
  }, [id, shop, isLoadingShop]);
  
  const mockShop = {
    id: parseInt(id),
    name: "Sarah's Bakery",
    category: "Bakery",
    rating: 4.8,
    distance: "1.2 mi",
    isOpen: true,
    description: "Fresh artisan bread, pastries and cakes baked daily with organic ingredients. We've been serving the neighborhood since 2010 with a commitment to quality and taste.",
    address: "123 Baker Street, Anytown, ST 12345",
    phone: "(555) 123-4567",
    email: "info@sarahsbakery.com",
    hours: "Mon-Fri: 7am-7pm, Sat-Sun: 8am-5pm",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    bannerUrl: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f",
    lat: "40.7128",
    lng: "-74.0060"
  };
  
  const mockProducts = [
    {
      id: 1,
      name: "Artisan Sourdough Bread",
      shop: "Sarah's Bakery",
      price: 699,
      rating: 4.9,
      soldCount: 268,
      imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
      isSale: false
    },
    {
      id: 2,
      name: "Chocolate Croissants (3-pack)",
      shop: "Sarah's Bakery",
      price: 849,
      rating: 4.8,
      soldCount: 182,
      imageUrl: "https://images.unsplash.com/photo-1600175074449-611d2a8dde29",
      isSale: false
    },
    {
      id: 3,
      name: "Cinnamon Rolls (2-pack)",
      shop: "Sarah's Bakery",
      price: 599,
      originalPrice: 799,
      rating: 4.7,
      soldCount: 134,
      imageUrl: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd",
      isSale: true
    },
    {
      id: 4,
      name: "Artisan Baguette",
      shop: "Sarah's Bakery",
      price: 549,
      rating: 4.6,
      soldCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1568471173762-f89a9977b48e",
      isSale: false
    }
  ];
  
  const mockOffers = [
    {
      id: 1,
      title: "Buy 2 Get 1 Free",
      description: "On all baked goods. Valid this Saturday and Sunday only.",
      type: "Weekend Special",
      shopId: parseInt(id),
      color: "amber",
      icon: "bx-cookie"
    },
    {
      id: 2,
      title: "15% Off Your First Order",
      description: "Use code WELCOME15 at checkout for new customers only.",
      type: "New Customer",
      shopId: parseInt(id),
      color: "primary",
      icon: "bx-gift"
    }
  ];
  
  // Use mock data or real data
  const shopData = shop || mockShop;
  const productData = products || mockProducts;
  const offerData = offers || mockOffers;
  
  const isLoading = isLoadingShop || isLoadingProducts || isLoadingOffers;
  
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      {/* Shop Banner */}
      <div 
        className="w-full h-64 md:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${shopData.bannerUrl || shopData.imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80)` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="container mx-auto px-4 h-full flex items-end">
          <div className="mb-8 relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              {shopData.name}
            </h1>
            <div className="flex flex-wrap items-center text-white gap-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                <span>{shopData.rating}</span>
              </div>
              <Badge variant={shopData.isOpen ? "success" : "destructive"}>
                {shopData.isOpen ? "Open Now" : "Closed"}
              </Badge>
              <span className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {shopData.distance} away
              </span>
              <span>{shopData.category}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Shop Details Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <AlignLeft className="h-5 w-5 mr-2" />
                About
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {shopData.description}
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">{shopData.address}</span>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">{shopData.phone}</span>
                </div>
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">{shopData.email}</span>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-primary-600 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-200">{shopData.hours}</span>
                </div>
              </div>
            </div>
            
            {/* Map */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Location</h2>
              <div className="w-full h-48 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden relative">
                <div 
                  className="absolute inset-0 opacity-50" 
                  style={{
                    backgroundImage: `url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${shopData.lng},${shopData.lat},15,0/600x300?access_token=placeholder")`, 
                    backgroundSize: 'cover'
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-700 p-2 rounded-lg shadow-md">
                    <MapPin className="h-5 w-5 text-primary-600" />
                  </div>
                </div>
              </div>
              <div className="mt-4 flex">
                <Button className="w-full">Get Directions</Button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="offers">Special Offers</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Products Tab */}
              <TabsContent value="products">
                <h2 className="text-2xl font-heading font-semibold mb-6">Products</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {productData.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </TabsContent>
              
              {/* Offers Tab */}
              <TabsContent value="offers">
                <h2 className="text-2xl font-heading font-semibold mb-6">Special Offers</h2>
                
                {offerData.length > 0 ? (
                  <div className="space-y-6">
                    {offerData.map((offer) => (
                      <OfferCard key={offer.id} offer={offer} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Tag className="h-10 w-10 mb-3 mx-auto text-gray-400" />
                    <h3 className="text-lg font-medium mb-2">No Special Offers</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      This shop doesn't have any active offers at the moment.
                    </p>
                  </div>
                )}
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-heading font-semibold">Reviews</h2>
                  <Button>Write a Review</Button>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-6">
                  <div className="flex items-center mb-4">
                    <div className="text-4xl font-bold mr-4">{shopData.rating}</div>
                    <div>
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-5 w-5 ${i < Math.floor(shopData.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                          />
                        ))}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Based on 128 reviews</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-12 text-sm text-gray-600 dark:text-gray-300">{rating} stars</div>
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-full mx-3">
                          <div 
                            className="h-full bg-yellow-500 rounded-full" 
                            style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` }}
                          ></div>
                        </div>
                        <div className="w-12 text-sm text-right text-gray-600 dark:text-gray-300">
                          {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 3 ? 3 : 2}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample Reviews - in a real app, these would come from the API */}
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <motion.div 
                      key={i}
                      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-start">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${10 + i}`}
                          alt="Reviewer" 
                          className="w-10 h-10 rounded-full mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">
                              {i === 1 ? 'John D.' : i === 2 ? 'Sarah M.' : 'Alex T.'}
                            </h3>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {i === 1 ? '2 days ago' : i === 2 ? '1 week ago' : '2 weeks ago'}
                            </span>
                          </div>
                          <div className="flex my-1">
                            {[...Array(5)].map((_, star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${star < (i === 3 ? 4 : 5) ? 'text-yellow-500 fill-current' : 'text-gray-300 dark:text-gray-500'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mt-2">
                            {i === 1 
                              ? 'The sourdough bread is simply amazing! It has the perfect crust and tangy flavor. I buy it every week.' 
                              : i === 2 
                                ? 'Great selection of pastries and friendly service. Their chocolate croissants are to die for.' 
                                : 'Good bakery with fresh products. Prices are a bit high, but the quality is worth it.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Load More Reviews</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopDetailPage;
