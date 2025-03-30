import { useState } from 'react';
import { useShop } from '@/context/ShopContext';
import NearbyShopItem from './NearbyShopItem';

const MapSection = () => {
  const { nearbyShops } = useShop();
  const [selectedShopId, setSelectedShopId] = useState(null);
  const [filterDistance, setFilterDistance] = useState('1');
  const [filterCategory, setFilterCategory] = useState('');
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  
  const handleShopSelect = (shopId) => {
    setSelectedShopId(shopId);
    // In a real app, this would update the map center and highlight the selected shop
  };
  
  const handleApplyFilters = () => {
    // In a real app, this would filter shops based on the selected criteria
    console.log('Applying filters:', { filterDistance, filterCategory, showOpenOnly });
  };
  
  return (
    <section className="py-12 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-full md:w-1/3">
            <h2 className="text-2xl font-heading font-semibold mb-4">Discover Shops Near You</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Find local businesses within walking or driving distance. Support your neighborhood economy and reduce your carbon footprint.
            </p>
            
            {/* Filter Panel */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm mb-6">
              <h3 className="font-medium mb-3">Filter Shops</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Distance</label>
                  <select 
                    className="w-full p-2 bg-gray-100 dark:bg-gray-600 border-0 rounded text-sm"
                    value={filterDistance}
                    onChange={(e) => setFilterDistance(e.target.value)}
                  >
                    <option value="1">Within 1 mile</option>
                    <option value="5">Within 5 miles</option>
                    <option value="10">Within 10 miles</option>
                    <option value="20">Within 20 miles</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Category</label>
                  <select 
                    className="w-full p-2 bg-gray-100 dark:bg-gray-600 border-0 rounded text-sm"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="">All Categories</option>
                    <option value="food">Food & Drinks</option>
                    <option value="groceries">Groceries</option>
                    <option value="fashion">Fashion</option>
                    <option value="home">Home Goods</option>
                    <option value="arts">Arts & Crafts</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-gray-600 dark:text-gray-300 block mb-1">Open Now</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="open-now" 
                      checked={showOpenOnly}
                      onChange={() => setShowOpenOnly(!showOpenOnly)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="open-now" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                      Show only open shops
                    </label>
                  </div>
                </div>
              </div>
              <button 
                onClick={handleApplyFilters}
                className="mt-4 w-full bg-primary-600 hover:bg-primary-700 text-white py-2 rounded font-medium"
              >
                Apply Filters
              </button>
            </div>

            {/* Nearby Shops List */}
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <h3 className="font-medium mb-3">Nearby Shops</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {nearbyShops.map(shop => (
                  <NearbyShopItem 
                    key={shop.id}
                    shop={shop} 
                    onSelect={handleShopSelect}
                    isSelected={selectedShopId === shop.id}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Map Container */}
          <div className="w-full md:w-2/3 bg-white dark:bg-gray-700 rounded-lg shadow-sm overflow-hidden h-96">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center relative">
              <div className="absolute inset-0 opacity-50" style={{backgroundImage: 'url("https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-74.5,40,9,0/800x600?access_token=placeholder")', backgroundSize: 'cover'}}></div>
              <div className="text-center z-10 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-lg">
                <i className="bx bx-map-alt text-4xl text-primary-600 mb-2"></i>
                <p className="text-gray-600 dark:text-gray-300">
                  Interactive map would be integrated here<br />showing nearby local shops.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;
