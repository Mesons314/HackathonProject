import { useState } from 'react';
import { Link } from 'wouter';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

// Helper to format price in dollars
const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { 
    id, 
    name, 
    shop, 
    price, 
    originalPrice, 
    rating, 
    soldCount, 
    imageUrl, 
    isSale 
  } = product;

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // In a real app, would make API call to add/remove from wishlist
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/products/${id}`}>
      <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="relative">
          <img 
            src={`${imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80`}
            alt={name} 
            className="w-full h-48 object-cover"
          />
          <motion.button 
            className="absolute top-2 right-2 bg-white dark:bg-gray-700 rounded-full p-1.5 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-500"
            onClick={toggleWishlist}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <i className={`bx ${isWishlisted ? 'bxs-heart text-red-500' : 'bx-heart'}`}></i>
          </motion.button>
          
          {isSale && (
            <div className="absolute top-2 left-2 bg-secondary-500 text-white text-xs px-2 py-1 rounded">
              Sale
            </div>
          )}
        </div>
        <div className="p-4">
          <span className="text-xs text-gray-600 dark:text-gray-300">{shop}</span>
          <h3 className="text-sm font-medium mb-1">{name}</h3>
          <div className="flex items-center mb-2">
            <i className="bx bxs-star text-yellow-500 text-sm"></i>
            <span className="ml-1 text-xs">{rating}</span>
            <span className="mx-1 text-gray-400 text-xs">•</span>
            <span className="text-xs text-gray-600 dark:text-gray-300">{soldCount} sold</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">{formatPrice(price)}</span>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through ml-1">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
            <motion.button 
              className="text-xs bg-primary-600 text-white px-2 py-1 rounded hover:bg-primary-700"
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add to Cart
            </motion.button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
