import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, Store } from 'lucide-react';
import { motion } from 'framer-motion';
import { Textarea } from '@/components/ui/textarea';

const RegisterForm = ({ isSeller = false }) => {
  const { register, isRegistering } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    email: '',
    isSeller: isSeller,
    // Optional seller fields
    businessName: '',
    businessDescription: '',
    businessAddress: '',
    phoneNumber: ''
  });
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showSellerFields, setShowSellerFields] = useState(isSeller);

  useEffect(() => {
    // Update isSeller when the prop changes
    setFormData(prev => ({ ...prev, isSeller }));
    setShowSellerFields(isSeller);
  }, [isSeller]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Calculate password strength for visual feedback
    if (name === 'password') {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
    }
  };

  const calculatePasswordStrength = (password) => {
    if (!password) return 0;
    
    let score = 0;
    // Length check
    if (password.length > 6) score += 1;
    if (password.length > 10) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(score, 4);
  };

  const getPasswordStrengthText = () => {
    switch (passwordStrength) {
      case 0: return "Very weak";
      case 1: return "Weak";
      case 2: return "Fair";
      case 3: return "Good";
      case 4: return "Strong";
      default: return "";
    }
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 0: return "bg-red-500";
      case 1: return "bg-red-400";
      case 2: return "bg-yellow-400";
      case 3: return "bg-green-400";
      case 4: return "bg-green-500";
      default: return "bg-gray-200";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Only include seller fields if registering as a seller
    const submissionData = { ...formData };
    if (!submissionData.isSeller) {
      delete submissionData.businessName;
      delete submissionData.businessDescription;
      delete submissionData.businessAddress;
      delete submissionData.phoneNumber;
    }
    
    register(submissionData);
  };

  const toggleSellerField = (checked) => {
    setFormData(prev => ({ ...prev, isSeller: !!checked }));
    setShowSellerFields(!!checked);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="register-fullName">Full Name</Label>
        <Input
          id="register-fullName"
          name="fullName"
          type="text"
          placeholder="Enter your full name"
          value={formData.fullName}
          onChange={handleChange}
          required
          autoComplete="name"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input
          id="register-email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          required
          autoComplete="email"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-username">Username</Label>
        <Input
          id="register-username"
          name="username"
          type="text"
          placeholder="Choose a username"
          value={formData.username}
          onChange={handleChange}
          required
          autoComplete="username"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="register-password">Password</Label>
        <Input
          id="register-password"
          name="password"
          type="password"
          placeholder="Create a password"
          value={formData.password}
          onChange={handleChange}
          required
          autoComplete="new-password"
        />
        
        {formData.password && (
          <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">Password strength:</span>
              <span className={`text-xs font-medium ${
                passwordStrength >= 3 ? 'text-green-600' : 
                passwordStrength >= 2 ? 'text-yellow-600' : 'text-red-600'
              }`}>{getPasswordStrengthText()}</span>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`} 
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              For a strong password, use at least 8 characters, uppercase, lowercase, numbers and special characters.
            </p>
          </div>
        )}
      </div>
      
      {/* Seller field checkbox - only show if not pre-selected as seller */}
      {!isSeller && (
        <div className="flex items-center space-x-2">
          <Checkbox 
            id="is-seller" 
            name="isSeller"
            checked={formData.isSeller} 
            onCheckedChange={toggleSellerField}
          />
          <Label 
            htmlFor="is-seller" 
            className="text-sm font-normal cursor-pointer"
          >
            Register as a seller
          </Label>
        </div>
      )}
      
      {/* Seller-specific fields */}
      {showSellerFields && (
        <motion.div 
          className="space-y-4 p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-800"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 text-primary-600 mb-2">
            <Store className="h-5 w-5" />
            <h3 className="font-medium">Seller Information</h3>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              name="businessName"
              type="text"
              placeholder="Your business name"
              value={formData.businessName}
              onChange={handleChange}
              required={formData.isSeller}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-description">Business Description</Label>
            <Textarea
              id="business-description"
              name="businessDescription"
              placeholder="Describe your business"
              value={formData.businessDescription}
              onChange={handleChange}
              rows={3}
              required={formData.isSeller}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="business-address">Business Address</Label>
            <Input
              id="business-address"
              name="businessAddress"
              type="text"
              placeholder="Your business address"
              value={formData.businessAddress}
              onChange={handleChange}
              required={formData.isSeller}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone-number">Phone Number</Label>
            <Input
              id="phone-number"
              name="phoneNumber"
              type="tel"
              placeholder="Your phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required={formData.isSeller}
            />
          </div>
        </motion.div>
      )}
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          checked={termsAccepted} 
          onCheckedChange={setTermsAccepted} 
          required
        />
        <Label 
          htmlFor="terms" 
          className="text-sm font-normal cursor-pointer"
        >
          I agree to the <a href="#" className="text-primary-600 dark:text-primary-500 hover:underline">Terms of Service</a> and <a href="#" className="text-primary-600 dark:text-primary-500 hover:underline">Privacy Policy</a>
        </Label>
      </div>
      
      <Button 
        type="submit" 
        className="w-full" 
        disabled={isRegistering || !termsAccepted}
      >
        {isRegistering ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : 'Create Account'}
      </Button>
    </form>
  );
};

export default RegisterForm;
