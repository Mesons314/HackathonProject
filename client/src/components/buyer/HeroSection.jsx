import { motion } from 'framer-motion';
import { Link } from 'wouter';

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-primary-600 to-secondary-500 py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
              Discover Local Treasures Near You
            </h1>
            <p className="text-lg opacity-90 mb-6">
              Connect with local sellers and find unique products in your neighborhood. Support your local economy and community.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <Link href="/map">
                <motion.button 
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg shadow-md font-medium hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Find Local Shops
                </motion.button>
              </Link>
              <Link href="/explore">
                <motion.button 
                  className="px-6 py-3 bg-transparent border border-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Products
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Local shopping" 
              className="rounded-lg shadow-lg max-h-96 object-cover"
            />
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
    </section>
  );
};

export default HeroSection;
