import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const MobileMenu = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const { user, logout } = useAuth();
  const { theme } = useTheme();

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    open: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    closed: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    open: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          initial="closed"
          animate="open"
          exit="closed"
          variants={overlayVariants}
          onClick={onClose}
        >
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-gray-800 shadow-lg p-4"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-heading font-semibold">Menu</span>
              <button 
                onClick={onClose} 
                className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>
            <nav className="space-y-4">
              <Link 
                href="/explore" 
                className={`block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium ${location === '/explore' ? 'text-primary-600 dark:text-primary-500' : ''}`}
                onClick={onClose}
              >
                Explore
              </Link>
              <Link 
                href="/categories" 
                className={`block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium ${location === '/categories' ? 'text-primary-600 dark:text-primary-500' : ''}`}
                onClick={onClose}
              >
                Categories
              </Link>
              <Link 
                href="/map" 
                className={`block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium ${location === '/map' ? 'text-primary-600 dark:text-primary-500' : ''}`}
                onClick={onClose}
              >
                Local Map
              </Link>
              <Link 
                href="/seller/dashboard" 
                className={`block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium ${location.startsWith('/seller') ? 'text-primary-600 dark:text-primary-500' : ''}`}
                onClick={onClose}
              >
                Become a Seller
              </Link>
              
              {/* Theme Section */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-3">
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Theme</p>
                  <ThemeToggle />
                </div>
              </div>
              
              {/* User Section */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {user ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium"
                      onClick={onClose}
                    >
                      My Profile
                    </Link>
                    <button 
                      onClick={() => {
                        logout();
                        onClose();
                      }} 
                      className="block w-full text-left text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth" 
                      className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium"
                      onClick={onClose}
                    >
                      Sign In
                    </Link>
                    <Link 
                      href="/auth?register=true" 
                      className="block text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 py-2 text-sm font-medium"
                      onClick={onClose}
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            </nav>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
