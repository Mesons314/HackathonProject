import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/common/Layout';
import ProductCard from '@/components/buyer/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Format price from cents to dollars
const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

const ProductSearchPage = () => {
  const { category } = useParams();
  const [location] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000, // $100.00
    sortBy: 'popularity',
    inStock: true,
    onSale: false,
    freeShipping: false,
    ratings: []
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Set initial search term from URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, []);
  
  // Fetch products based on search term and filters
  const { 
    data: products, 
    isLoading,
    refetch
  } = useQuery({
    queryKey: ['/api/products', searchTerm, category, filters],
    queryFn: async () => {
      // Build query params
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (category) params.append('category', category);
      if (filters.minPrice > 0) params.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice < 10000) params.append('maxPrice', filters.maxPrice.toString());
      if (filters.sortBy) params.append('sortBy', filters.sortBy);
      if (filters.inStock) params.append('inStock', 'true');
      if (filters.onSale) params.append('onSale', 'true');
      if (filters.freeShipping) params.append('freeShipping', 'true');
      if (filters.ratings.length > 0) params.append('ratings', filters.ratings.join(','));
      
      const queryString = params.toString();
      
      try {
        const res = await fetch(`/api/products${queryString ? `?${queryString}` : ''}`);
        if (!res.ok) throw new Error('Failed to fetch products');
        return await res.json();
      } catch (error) {
        console.error('Error fetching products:', error);
        // For demo, return mock data
        return getMockProducts(category, searchTerm, filters);
      }
    },
    enabled: location.startsWith('/explore') || location.startsWith('/categories')
  });
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  const handleRatingToggle = (rating) => {
    setFilters(prev => {
      const ratings = [...prev.ratings];
      if (ratings.includes(rating)) {
        return { ...prev, ratings: ratings.filter(r => r !== rating) };
      } else {
        return { ...prev, ratings: [...ratings, rating] };
      }
    });
  };
  
  const handleSearch = (e) => {
    e.preventDefault();
    refetch();
  };
  
  const handleClearFilters = () => {
    setFilters({
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'popularity',
      inStock: true,
      onSale: false,
      freeShipping: false,
      ratings: []
    });
  };
  
  // For demo, return mock data based on filters
  const getMockProducts = (category, searchTerm, filters) => {
    // This is mock data for demo purposes
    const allProducts = [
      {
        id: 1,
        name: "Artisan Sourdough Bread",
        shop: "Sarah's Bakery",
        price: 699,
        rating: 4.9,
        soldCount: 268,
        imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
        isSale: false,
        category: "Groceries"
      },
      {
        id: 2,
        name: "Organic Wild Flower Honey",
        shop: "Green Grocer",
        price: 849,
        originalPrice: 1099,
        rating: 4.7,
        soldCount: 142,
        imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
        isSale: true,
        category: "Groceries"
      },
      {
        id: 3,
        name: "Handmade Lavender Soap",
        shop: "Craft & Co.",
        price: 599,
        rating: 4.8,
        soldCount: 85,
        imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe",
        isSale: false,
        category: "Gifts"
      },
      {
        id: 4,
        name: "Vintage Desk Lamp (1960s)",
        shop: "Vintage Finds",
        price: 4500,
        rating: 4.6,
        soldCount: 32,
        imageUrl: "https://images.unsplash.com/photo-1492778297155-7be4c83960c7",
        isSale: false,
        category: "Home"
      },
      {
        id: 5,
        name: "Local Roast Coffee Beans",
        shop: "Brew House",
        price: 1299,
        rating: 4.9,
        soldCount: 203,
        imageUrl: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1",
        isSale: false,
        category: "Beverages"
      },
      {
        id: 6,
        name: "Handcrafted Leather Wallet",
        shop: "Artisan Goods",
        price: 2499,
        rating: 4.7,
        soldCount: 87,
        imageUrl: "https://images.unsplash.com/photo-1627123424574-724758594e93",
        isSale: false,
        category: "Fashion"
      },
      {
        id: 7,
        name: "Locally Grown Organic Apples",
        shop: "Green Grocer",
        price: 499,
        rating: 4.5,
        soldCount: 312,
        imageUrl: "https://images.unsplash.com/photo-1569870499705-504209102861",
        isSale: false,
        category: "Groceries"
      },
      {
        id: 8,
        name: "Handwoven Basket",
        shop: "Craft & Co.",
        price: 1899,
        originalPrice: 2499,
        rating: 4.3,
        soldCount: 64,
        imageUrl: "https://images.unsplash.com/photo-1615196534232-c599935908e9",
        isSale: true,
        category: "Home"
      }
    ];
    
    let filtered = [...allProducts];
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    
    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.shop.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    
    // Apply price range
    filtered = filtered.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice);
    
    // Apply sale filter
    if (filters.onSale) {
      filtered = filtered.filter(p => p.isSale);
    }
    
    // Apply ratings filter
    if (filters.ratings.length > 0) {
      filtered = filtered.filter(p => {
        const rating = Math.floor(p.rating);
        return filters.ratings.includes(rating);
      });
    }
    
    // Apply sorting
    if (filters.sortBy === 'price-low-high') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sortBy === 'price-high-low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (filters.sortBy === 'newest') {
      // Sort by id as a proxy for date in our mock data
      filtered.sort((a, b) => b.id - a.id);
    } else {
      // Default: sort by popularity (soldCount)
      filtered.sort((a, b) => b.soldCount - a.soldCount);
    }
    
    return filtered;
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2">
            {category ? `${category} Products` : 'Explore Products'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {category 
              ? `Browse our selection of ${category.toLowerCase()} products from local sellers`
              : 'Discover unique products from local sellers in your area'
            }
          </p>
        </div>
        
        {/* Search and Sort Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <form onSubmit={handleSearch} className="w-full md:w-auto flex-1 md:max-w-md">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </form>
          
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="w-full md:w-48">
              <Select
                value={filters.sortBy}
                onValueChange={(value) => handleFilterChange('sortBy', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popularity">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                  <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <SlidersHorizontal className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">Filters</h3>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleClearFilters}
                >
                  Clear all
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Price Range</h4>
                <Slider
                  defaultValue={[filters.minPrice, filters.maxPrice]}
                  min={0}
                  max={10000}
                  step={100}
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => {
                    setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
                  }}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                  <span>{formatPrice(filters.minPrice)}</span>
                  <span>{formatPrice(filters.maxPrice)}</span>
                </div>
              </div>
              
              {/* Customer Ratings */}
              <div className="mb-6">
                <h4 className="text-sm font-medium mb-3">Customer Ratings</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <Checkbox
                        id={`rating-${rating}`}
                        checked={filters.ratings.includes(rating)}
                        onCheckedChange={() => handleRatingToggle(rating)}
                      />
                      <Label
                        htmlFor={`rating-${rating}`}
                        className="ml-2 flex items-center cursor-pointer"
                      >
                        {Array(rating).fill(0).map((_, i) => (
                          <svg key={i} className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                          </svg>
                        ))}
                        <span className="ml-1">& Up</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Other Filters */}
              <div>
                <h4 className="text-sm font-medium mb-3">Other Filters</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="in-stock"
                      checked={filters.inStock}
                      onCheckedChange={(value) => handleFilterChange('inStock', !!value)}
                    />
                    <Label
                      htmlFor="in-stock"
                      className="ml-2 cursor-pointer"
                    >
                      In Stock
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={(value) => handleFilterChange('onSale', !!value)}
                    />
                    <Label
                      htmlFor="on-sale"
                      className="ml-2 cursor-pointer"
                    >
                      On Sale
                    </Label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox
                      id="free-shipping"
                      checked={filters.freeShipping}
                      onCheckedChange={(value) => handleFilterChange('freeShipping', !!value)}
                    />
                    <Label
                      htmlFor="free-shipping"
                      className="ml-2 cursor-pointer"
                    >
                      Free Shipping
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar Filters - Mobile */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-40 md:hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}></div>
              <div className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-800 p-6 overflow-auto">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-semibold">Filters</h3>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Price Range</h4>
                  <Slider
                    defaultValue={[filters.minPrice, filters.maxPrice]}
                    min={0}
                    max={10000}
                    step={100}
                    value={[filters.minPrice, filters.maxPrice]}
                    onValueChange={([min, max]) => {
                      setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
                    }}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                    <span>{formatPrice(filters.minPrice)}</span>
                    <span>{formatPrice(filters.maxPrice)}</span>
                  </div>
                </div>
                
                {/* Customer Ratings */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Customer Ratings</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <Checkbox
                          id={`mobile-rating-${rating}`}
                          checked={filters.ratings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
                        />
                        <Label
                          htmlFor={`mobile-rating-${rating}`}
                          className="ml-2 flex items-center cursor-pointer"
                        >
                          {Array(rating).fill(0).map((_, i) => (
                            <svg key={i} className="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 24 24">
                              <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                            </svg>
                          ))}
                          <span className="ml-1">& Up</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Other Filters */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-3">Other Filters</h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-in-stock"
                        checked={filters.inStock}
                        onCheckedChange={(value) => handleFilterChange('inStock', !!value)}
                      />
                      <Label
                        htmlFor="mobile-in-stock"
                        className="ml-2 cursor-pointer"
                      >
                        In Stock
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-on-sale"
                        checked={filters.onSale}
                        onCheckedChange={(value) => handleFilterChange('onSale', !!value)}
                      />
                      <Label
                        htmlFor="mobile-on-sale"
                        className="ml-2 cursor-pointer"
                      >
                        On Sale
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox
                        id="mobile-free-shipping"
                        checked={filters.freeShipping}
                        onCheckedChange={(value) => handleFilterChange('freeShipping', !!value)}
                      />
                      <Label
                        htmlFor="mobile-free-shipping"
                        className="ml-2 cursor-pointer"
                      >
                        Free Shipping
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    className="w-full" 
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    Apply Filters
                  </Button>
                  <Button 
                    variant="outline"
                    className="flex-shrink-0"
                    onClick={handleClearFilters}
                  >
                    Clear
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Products Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
              </div>
            ) : products && products.length > 0 ? (
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <svg className="h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-lg font-medium mb-1">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mb-4">
                  We couldn't find any products matching your criteria. Try adjusting your filters or search term.
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductSearchPage;
