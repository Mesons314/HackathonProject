import { Link } from 'wouter';
import { motion } from 'framer-motion';

const getGradientClass = (color) => {
  switch (color) {
    case 'primary':
      return 'from-primary-600 to-primary-700';
    case 'secondary':
      return 'from-secondary-500 to-secondary-600';
    case 'amber':
      return 'from-yellow-500 to-orange-500';
    default:
      return 'from-primary-600 to-primary-700';
  }
};

const OfferCard = ({ offer }) => {
  const { id, title, description, type, shopId, color, icon } = offer;
  const gradientClass = getGradientClass(color);
  
  return (
    <motion.div 
      className={`bg-gradient-to-r ${gradientClass} rounded-lg overflow-hidden shadow-md relative`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6 ">
        <span className="inline-block bg-white/20 rounded-full px-3 py-1 text-sm mb-4">
          {type}
        </span>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="opacity-90 mb-4">{description}</p>
        <Link href={`/shops/${shopId}`}>
          <motion.button 
            className="bg-white text-primary-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Shop Now
          </motion.button>
        </Link>
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 opacity-10">
        <i className={`bx ${icon} text-9xl text-white`}></i>
      </div>
    </motion.div>
  );
};

export default OfferCard;
