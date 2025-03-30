import { useState } from 'react';
import Layout from '@/components/common/Layout';
import HeroSection from '@/components/buyer/HeroSection';
import CategoryCard from '@/components/buyer/CategoryCard';
import ShopCard from '@/components/buyer/ShopCard';
import ProductCard from '@/components/buyer/ProductCard';
import OfferCard from '@/components/buyer/OfferCard';
import MapSection from '@/components/buyer/MapSection';
import TestimonialCard from '@/components/buyer/TestimonialCard';
import SellerFeature from '@/components/seller/SellerFeature';
import { motion } from 'framer-motion';
import { useShop } from '@/context/ShopContext';
import { Link } from 'wouter';
import { SELLER_FEATURES } from '@/lib/constants';

const HomePage = () => {
  const { 
    categories, 
    featuredShops, 
    popularProducts, 
    specialOffers, 
    testimonials, 
    isLoading 
  } = useShop();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <HeroSection />

      {/* Category Navigation */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-heading font-semibold mb-4">Browse Categories</h2>
          <motion.div 
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {categories.map((category, index) => (
              <motion.div key={category.name} variants={item}>
                <CategoryCard name={category.name} icon={category.icon} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Featured Shops */}
      <section className="py-12 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-semibold">Featured Local Shops</h2>
            <Link href="/explore" className="text-primary-600 dark:text-primary-500 font-medium hover:underline flex items-center">
              View all <i className="bx bx-right-arrow-alt ml-1"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredShops.map((shop) => (
              <ShopCard key={shop.id} shop={shop} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-semibold">Popular Products</h2>
            <Link href="/explore" className="text-primary-600 dark:text-primary-500 font-medium hover:underline flex items-center">
              View all <i className="bx bx-right-arrow-alt ml-1"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {popularProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Local Map Section */}
      <MapSection />

      {/* Special Offers & Deals */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-heading font-semibold">Special Offers & Deals</h2>
            <Link href="/offers" className="text-primary-600 dark:text-primary-500 font-medium hover:underline flex items-center">
              View all <i className="bx bx-right-arrow-alt ml-1"></i>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialOffers.map((offer) => (
              <OfferCard key={offer.id} offer={offer} />
            ))}
          </div>
        </div>
      </section>

      {/* Become a Seller */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/2 p-8 md:p-12">
                <h2 className="text-3xl font-heading font-bold mb-4">Become a Local Seller</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Join our marketplace and reach customers in your area. Setup is quick and easy with our seller tools.</p>
                
                <div className="space-y-4 mb-6">
                  {SELLER_FEATURES.map((feature, index) => (
                    <SellerFeature key={index} feature={feature} index={index} />
                  ))}
                </div>
                
                <Link href="/seller/apply">
                  <motion.button 
                    className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Apply to Become a Seller
                  </motion.button>
                </Link>
              </div>
              <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-600">
                <img 
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Local seller working in shop" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-heading font-semibold text-center mb-8">What Our Community Says</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
