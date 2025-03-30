import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useTheme } from '@/context/ThemeContext';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/use-auth';
import MobileMenu from './MobileMenu';
import ThemeToggle from './ThemeToggle';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <svg className="h-8 w-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
              </svg>
              <span className="ml-2 text-xl font-heading font-bold">LocalMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/explore" className={`text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium ${location === '/explore' ? 'text-primary-600 dark:text-primary-500' : ''}`}>
              Explore
            </Link>
            <Link href="/categories" className={`text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium ${location === '/categories' ? 'text-primary-600 dark:text-primary-500' : ''}`}>
              Categories
            </Link>
            <Link href="/map" className={`text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium ${location === '/map' ? 'text-primary-600 dark:text-primary-500' : ''}`}>
              Local Map
            </Link>
            <Link href="/seller/dashboard" className={`text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium ${location.startsWith('/seller') ? 'text-primary-600 dark:text-primary-500' : ''}`}>
              Become a Seller
            </Link>
          </nav>

          {/* Right navigation */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search products or shops..."
                className="w-64 pl-10 pr-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-700 border-0 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <i className="bx bx-search text-lg"></i>
              </div>
            </div>

            {/* Wishlist */}
            <Link href="/wishlist">
              <button className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 focus:outline-none">
                <i className="bx bx-heart text-2xl"></i>
              </button>
            </Link>

            {/* Cart */}
            <Link href="/cart">
              <button className="p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 focus:outline-none relative">
                <i className="bx bx-cart text-2xl"></i>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cartCount}</span>
                )}
              </button>
            </Link>

            {/* Theme toggle */}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button 
              onClick={toggleTheme}
              className="md:hidden p-1 rounded-full text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 focus:outline-none"
            >
              <i className={`bx ${isDarkMode ? 'bx-sun' : 'bx-moon'} text-2xl`}></i>
            </button>

            {/* User menu */}
            {user ? (
              <div className="relative">
                <button className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-500 focus:outline-none">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${user.fullName}&background=random`} 
                    alt="Profile picture" 
                    className="h-8 w-8 rounded-full"
                  />
                  <span className="ml-2 hidden md:inline">{user.fullName}</span>
                </button>
                {/* Dropdown would go here */}
              </div>
            ) : (
              <Link href="/auth">
                <button className="px-4 py-1 rounded-lg border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white transition-colors">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile menu button */}
            <button 
              onClick={toggleMobileMenu}
              className="md:hidden p-1 rounded-md text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500 focus:outline-none"
            >
              <i className="bx bx-menu text-2xl"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={toggleMobileMenu} />
    </header>
  );
};

export default Header;
