import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Store, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState(''); // '', 'buyer', or 'seller'
  const [location, navigate] = useLocation();
  const { user } = useAuth();
  
  // Get URL parameters
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('register') === 'true') {
      setActiveTab('register');
    }
    if (params.get('type') === 'seller') {
      setUserType('seller');
    } else if (params.get('type') === 'buyer') {
      setUserType('buyer');
    }
  }, []);
  
  // If user is already logged in, redirect to home page
  useEffect(() => {
    if (user) {
      if (user.isSeller) {
        navigate('/seller/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, navigate]);
  
  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      } 
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  // If no user type is selected yet, show the selection screen
  if (!userType) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-6">
            <svg className="h-12 w-12 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
            </svg>
            <Link href='/' className="ml-2 text-3xl font-heading font-bold">LocalMarket</Link>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">How would you like to sign in?</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Choose your account type to continue</p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full hover:border-primary-500 hover:shadow-md transition-all cursor-pointer" onClick={() => setUserType('buyer')}>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-10 w-10 text-primary-600" />
                </div>
                <CardTitle className="text-xl">I'm a Buyer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Shop from local businesses, discover unique products, and support your community.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Browse local shops and products</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Save favorite items to wishlist</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Track orders and delivery</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Continue as Buyer <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Card className="h-full hover:border-primary-500 hover:shadow-md transition-all cursor-pointer" onClick={() => setUserType('seller')}>
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary-100 dark:bg-primary-900 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-4">
                  <Store className="h-10 w-10 text-primary-600" />
                </div>
                <CardTitle className="text-xl">I'm a Seller</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Showcase your products, manage inventory, and grow your local business.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Manage products and inventory</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Access sales analytics and insights</span>
                  </li>
                  <li className="flex items-center">
                    <div className="h-5 w-5 rounded-full bg-green-500 flex items-center justify-center mr-2">
                      <svg className="h-3 w-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <span>Create special offers and promotions</span>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Continue as Seller <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </motion.div>
        
        <motion.p 
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Already know what you're looking for? <button className="text-primary-600 hover:underline" onClick={() => navigate('/')}><Link href="/">Continue without choosing</Link></button>
        </motion.p>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Auth Form Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-white dark:bg-gray-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card>
            <CardHeader className="space-y-1">
              <div className="flex items-center justify-center mb-6">
                <svg className="h-10 w-10 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M11,17V16H9V14H13V13H10A1,1 0 0,1 9,12V9A1,1 0 0,1 10,8H11V7H13V8H15V10H11V11H14A1,1 0 0,1 15,12V15A1,1 0 0,1 14,16H13V17H11Z" />
                </svg>
                <span className="ml-2 text-2xl font-heading font-bold">LocalMarket</span>
              </div>
              <div className="flex items-center mb-4">
                <Button 
                  variant="ghost" 
                  className="text-sm mr-auto" 
                  onClick={() => setUserType('')}
                >
                  <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                  </svg>
                  Back
                </Button>
                <div className="bg-primary-100 dark:bg-primary-900 px-3 py-1 rounded-full text-primary-600 text-sm font-medium">
                  {userType === 'seller' ? 'Seller Account' : 'Buyer Account'}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">
                {activeTab === 'login' ? 'Welcome back!' : 'Create an account'}
              </CardTitle>
              <CardDescription className="text-center">
                {activeTab === 'login' 
                  ? 'Enter your credentials to sign in to your account' 
                  : 'Fill out the form below to create your account'
                }
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Tabs 
                defaultValue={activeTab} 
                value={activeTab} 
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <LoginForm />
                  <div className="mt-4 text-center text-sm">
                    Don't have an account?{' '}
                    <button 
                      onClick={() => setActiveTab('register')} 
                      className="text-primary-600 dark:text-primary-500 hover:underline font-medium"
                    >
                      Sign up
                    </button>
                  </div>
                </TabsContent>
                
                <TabsContent value="register">
                  <RegisterForm isSeller={userType === 'seller'} />
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{' '}
                    <button 
                      onClick={() => setActiveTab('login')} 
                      className="text-primary-600 dark:text-primary-500 hover:underline font-medium"
                    >
                      Sign in
                    </button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Hero Side */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-500 p-8 flex flex-col justify-center hidden md:flex">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto text-white"
        >
          <h1 className="text-4xl font-heading font-bold mb-6">
            {userType === 'seller' 
              ? 'Grow Your Local Business Online'
              : 'Connect With Local Sellers in Your Neighborhood'
            }
          </h1>
          <p className="text-lg mb-8 opacity-90">
            {userType === 'seller'
              ? 'Showcase your products, manage your inventory, and connect with customers in your area.'
              : 'Discover unique products from local businesses. Support your community and shop sustainably with LocalMarket.'
            }
          </p>
          
          <div className="space-y-6">
            {userType === 'seller' ? (
              <>
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <Store className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Seller Dashboard</h3>
                    <p className="opacity-80">Easily manage your products and orders</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Analytics & Insights</h3>
                    <p className="opacity-80">Track sales and customer behavior</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Special Offers</h3>
                    <p className="opacity-80">Create promotions to attract customers</p>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Discover Local Shops</h3>
                    <p className="opacity-80">Find hidden gems in your neighborhood</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Interactive Maps</h3>
                    <p className="opacity-80">Browse shops based on your location</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="bg-white/20 p-2 rounded-full mr-4">
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Quality Guaranteed</h3>
                    <p className="opacity-80">All sellers are verified for authenticity</p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
