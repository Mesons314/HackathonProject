import { Link } from 'wouter';

const ShopCard = ({ shop }) => {
  const { id, name, category, rating, distance, isOpen, imageUrl, description } = shop;
  
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <img 
        src={`${imageUrl}?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80`} 
        alt={`Shop front of ${name}`} 
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-heading font-semibold">{name}</h3>
          <span className={`${isOpen ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'} text-xs px-2 py-1 rounded-full`}>
            {isOpen ? 'Open Now' : 'Closed'}
          </span>
        </div>
        <div className="flex items-center mb-3">
          <i className="bx bxs-star text-yellow-500"></i>
          <span className="ml-1 text-sm">{rating}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{category}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-sm text-gray-600 dark:text-gray-300">{distance}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        <Link href={`/shops/${id}`}>
          <button className="text-primary-600 dark:text-primary-500 text-sm font-medium hover:underline">
            View Shop
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ShopCard;
