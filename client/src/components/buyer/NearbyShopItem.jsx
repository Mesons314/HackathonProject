import { useCallback } from 'react';
import { motion } from 'framer-motion';

const NearbyShopItem = ({ shop, onSelect, isSelected }) => {
  const { id, name, category, distance, imageUrl } = shop;
  
  const handleClick = useCallback(() => {
    onSelect(id);
  }, [id, onSelect]);
  
  return (
    <motion.div 
      className={`flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded cursor-pointer ${isSelected ? 'bg-gray-100 dark:bg-gray-600' : ''}`}
      onClick={handleClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
    >
      <img 
        src={`${imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80`} 
        alt={name} 
        className="w-10 h-10 rounded-full object-cover mr-3" 
      />
      <div>
        <h4 className="text-sm font-medium">{name}</h4>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {distance} away • {category}
        </p>
      </div>
    </motion.div>
  );
};

export default NearbyShopItem;
