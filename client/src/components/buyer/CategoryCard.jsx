import { Link } from 'wouter';

const CategoryCard = ({ name, icon }) => {
  return (
    <Link href={`/categories/${name.toLowerCase()}`} className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow transition-shadow">
      <div className="w-12 h-12 bg-primary-50 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
        <i className={`bx ${icon} text-2xl text-primary-600`}></i>
      </div>
      <span className="text-sm font-medium">{name}</span>
    </Link>
  );
};

export default CategoryCard;
