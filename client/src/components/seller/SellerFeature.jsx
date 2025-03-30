import { motion } from 'framer-motion';

const SellerFeature = ({ feature, index }) => {
  const { title, description } = feature;
  
  return (
    <motion.div 
      className="flex items-start"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="flex-shrink-0 mt-1">
        <div className="bg-primary-100 dark:bg-primary-900 rounded-full p-1">
          <i className="bx bx-check text-primary-600 dark:text-primary-400"></i>
        </div>
      </div>
      <div className="ml-3">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default SellerFeature;
