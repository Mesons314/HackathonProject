import { motion } from 'framer-motion';

// Helper to render stars based on rating
const RatingStars = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <i key={`star-${i}`} className="bx bxs-star text-yellow-500"></i>
      ))}
      {hasHalfStar && (
        <i className="bx bxs-star-half text-yellow-500"></i>
      )}
      {[...Array(5 - fullStars - (hasHalfStar ? 1 : 0))].map((_, i) => (
        <i key={`empty-star-${i}`} className="bx bx-star text-yellow-500"></i>
      ))}
    </div>
  );
};

const TestimonialCard = ({ testimonial }) => {
  const { name, rating, text, imageUrl } = testimonial;
  
  return (
    <motion.div 
      className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <img 
          src={`${imageUrl}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`} 
          alt={`${name}'s profile`} 
          className="w-12 h-12 rounded-full object-cover" 
        />
        <div className="ml-3">
          <h3 className="text-lg font-medium">{name}</h3>
          <RatingStars rating={rating} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-gray-300">"{text}"</p>
    </motion.div>
  );
};

export default TestimonialCard;
