import { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, LogIn, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';

const LoginForm = () => {
  const { login, isLoggingIn } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear any previous error when the user types
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    
    try {
      await login(formData);
      // Login is handled by the auth context including success/error states
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  const inputVariants = {
    focus: { scale: 1.01, borderColor: 'var(--primary)' },
    filled: { borderColor: 'var(--border)' },
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}
      
      <div className="space-y-2">
        <Label htmlFor="login-username">Username</Label>
        <motion.div
          whileFocus="focus"
          animate={formData.username ? "filled" : undefined}
          variants={inputVariants}
        >
          <Input
            id="login-username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
            autoComplete="username"
            className="transition-all duration-200"
          />
        </motion.div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password">Password</Label>
          <a 
            href="#" 
            className="text-sm text-primary-600 dark:text-primary-500 hover:underline transition-colors"
          >
            Forgot Password?
          </a>
        </div>
        <motion.div
          whileFocus="focus"
          animate={formData.password ? "filled" : undefined}
          variants={inputVariants}
        >
          <Input
            id="login-password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
            className="transition-all duration-200"
          />
        </motion.div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="remember-me" 
          checked={rememberMe} 
          onCheckedChange={setRememberMe} 
        />
        <Label 
          htmlFor="remember-me" 
          className="text-sm font-normal cursor-pointer"
        >
          Remember me
        </Label>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isLoggingIn}
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing In...
            </>
          ) : (
            <>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </>
          )}
        </Button>
      </motion.div>
      
      <motion.div 
        className="pt-2 text-center text-xs text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Test account: username: <span className="font-medium">buyer</span> / password: <span className="font-medium">password123</span><br/>
        Seller account: username: <span className="font-medium">seller</span> / password: <span className="font-medium">password123</span>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;
