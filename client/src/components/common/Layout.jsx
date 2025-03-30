import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './Footer';

const pageVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header />
      <motion.main 
        className="flex-grow"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;
