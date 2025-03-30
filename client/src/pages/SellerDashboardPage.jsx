import { useState } from 'react';
import Layout from '@/components/common/Layout';
import { useAuth } from '@/hooks/use-auth';
import SellerDashboard from '@/components/seller/SellerDashboard';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SellerDashboardPage = () => {
  const { user, isLoading } = useAuth();
  const [isBecomingSeller, setIsBecomingSeller] = useState(false);
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </Layout>
    );
  }
  
  // If user is not a seller, show become a seller page
  if (!user.isSeller) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <Card className="max-w-3xl mx-auto p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                <svg className="h-10 w-10 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold mb-2">Become a Seller</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                Join our marketplace and showcase your products to local customers. Get started today!
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Benefits
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Reach local customers in your area</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Powerful seller dashboard with analytics</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Easy inventory management</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Create special offers and promotions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-green-500 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Low commission rates</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <svg className="h-5 w-5 mr-2 text-primary-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.5 9H15.5M8.5 13H12M15.5 17H8.5M7 21H17C19.2091 21 21 19.2091 21 17V7C21 4.79086 19.2091 3 17 3H7C4.79086 3 3 4.79086 3 7V17C3 19.2091 4.79086 21 7 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Requirements
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-600 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Valid business information</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-600 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Clear product images and descriptions</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-600 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Physical business address</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 mr-2 text-primary-600 mt-0.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-gray-600 dark:text-gray-300">Agree to seller terms and conditions</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <Button
                size="lg"
                onClick={() => setIsBecomingSeller(true)}
                disabled={isBecomingSeller}
              >
                {isBecomingSeller ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Apply to Become a Seller'
                )}
              </Button>
              <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                Applications are typically reviewed within 1-2 business days
              </p>
            </div>
          </Card>
        </div>
      </Layout>
    );
  }
  
  // If user is a seller, show the seller dashboard
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <SellerDashboard />
      </div>
    </Layout>
  );
};

export default SellerDashboardPage;
