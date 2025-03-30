import { Link } from 'wouter';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <svg className="h-8 w-8 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
              </svg>
              <span className="ml-2 text-xl font-heading font-bold text-white">LocalMarket</span>
            </div>
            <p className="mb-4 text-sm">Connecting local buyers with local sellers. Supporting communities and reducing environmental impact.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white"><i className="bx bxl-facebook text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bx bxl-twitter text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bx bxl-instagram text-xl"></i></a>
              <a href="#" className="text-gray-400 hover:text-white"><i className="bx bxl-linkedin text-xl"></i></a>
            </div>
          </div>
          
          {/* For Buyers */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">For Buyers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/categories" className="hover:text-white">Browse Categories</Link></li>
              <li><Link href="/map" className="hover:text-white">Find Local Shops</Link></li>
              <li><Link href="/offers" className="hover:text-white">Special Offers</Link></li>
              <li><Link href="/buyer-protection" className="hover:text-white">Buyer Protection</Link></li>
            </ul>
          </div>
          
          {/* For Sellers */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">For Sellers</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/seller/dashboard" className="hover:text-white">Seller Dashboard</Link></li>
              <li><Link href="/seller/apply" className="hover:text-white">How to Apply</Link></li>
              <li><Link href="/seller/guidelines" className="hover:text-white">Seller Guidelines</Link></li>
              <li><Link href="/seller/analytics" className="hover:text-white">Sales Analytics</Link></li>
              <li><Link href="/seller/marketing" className="hover:text-white">Marketing Tools</Link></li>
            </ul>
          </div>
          
          {/* Get in Touch */}
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i className="bx bx-envelope mt-1 mr-2"></i>
                <span>support@localmarket.com</span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-phone mt-1 mr-2"></i>
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-start">
                <i className="bx bx-map mt-1 mr-2"></i>
                <span>123 Market Street, Anytown, ST 12345</span>
              </li>
            </ul>
            <div className="mt-4">
              <form className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-3 py-2 text-sm bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500"
                />
                <button 
                  type="submit" 
                  className="bg-primary-600 hover:bg-primary-700 px-3 py-2 rounded-r-lg text-sm"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} LocalMarket. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-sm hover:text-white">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-sm hover:text-white">Terms of Service</Link>
            <Link href="/accessibility" className="text-sm hover:text-white">Accessibility</Link>
            <Link href="/contact" className="text-sm hover:text-white">Contact Us</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
