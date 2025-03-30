import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  CATEGORIES,
  FEATURED_SHOPS,
  POPULAR_PRODUCTS,
  SPECIAL_OFFERS,
  NEARBY_SHOPS,
  TESTIMONIALS
} from '@/lib/constants';

// Create context
const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Fetch categories
  const { data: categories = CATEGORIES } = useQuery({
    queryKey: ['/api/categories'],
    enabled: false, // Disable for now, we'll use mock data from constants
  });
  
  // Fetch featured shops
  const { 
    data: featuredShops = FEATURED_SHOPS,
    isLoading: isLoadingShops 
  } = useQuery({
    queryKey: ['/api/shops'],
    queryFn: async () => {
      const res = await fetch('/api/shops');
      if (!res.ok) throw new Error('Failed to fetch shops');
      return await res.json();
    },
    enabled: false, // Disable for now, we'll use mock data from constants
  });
  
  // Fetch popular products
  const { 
    data: popularProducts = POPULAR_PRODUCTS,
    isLoading: isLoadingProducts 
  } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const res = await fetch('/api/products');
      if (!res.ok) throw new Error('Failed to fetch products');
      return await res.json();
    },
    enabled: false, // Disable for now, we'll use mock data from constants
  });
  
  // Fetch offers
  const { 
    data: specialOffers = SPECIAL_OFFERS,
    isLoading: isLoadingOffers 
  } = useQuery({
    queryKey: ['/api/offers'],
    queryFn: async () => {
      const res = await fetch('/api/offers');
      if (!res.ok) throw new Error('Failed to fetch offers');
      return await res.json();
    },
    enabled: false, // Disable for now, we'll use mock data from constants
  });
  
  // Nearby shops - in a real app this would use the user's location
  const { 
    data: nearbyShops = NEARBY_SHOPS,
    isLoading: isLoadingNearbyShops 
  } = useQuery({
    queryKey: ['/api/shops/nearby'],
    enabled: false, // Disable for now, we'll use mock data from constants
  });
  
  return (
    <ShopContext.Provider value={{
      categories,
      featuredShops,
      popularProducts,
      specialOffers,
      nearbyShops,
      testimonials: TESTIMONIALS,
      isLoading: isLoadingShops || isLoadingProducts || isLoadingOffers || isLoadingNearbyShops
    }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
}
