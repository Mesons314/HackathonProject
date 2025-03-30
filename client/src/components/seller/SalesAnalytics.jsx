import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent
} from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const salesData = [
  { month: 'Jan', revenue: 4000, orders: 24 },
  { month: 'Feb', revenue: 3000, orders: 18 },
  { month: 'Mar', revenue: 5000, orders: 29 },
  { month: 'Apr', revenue: 8000, orders: 42 },
  { month: 'May', revenue: 6000, orders: 36 },
  { month: 'Jun', revenue: 7000, orders: 40 },
  { month: 'Jul', revenue: 9000, orders: 48 },
];

const productCategoryData = [
  { name: 'Groceries', value: 35 },
  { name: 'Beverages', value: 25 },
  { name: 'Gifts', value: 15 },
  { name: 'Fashion', value: 15 },
  { name: 'Books', value: 10 },
];

const COLORS = ['#4F46E5', '#EC4899', '#F59E0B', '#10B981', '#6366F1'];

const customerData = [
  { month: 'Jan', new: 12, returning: 8 },
  { month: 'Feb', new: 10, returning: 10 },
  { month: 'Mar', new: 14, returning: 15 },
  { month: 'Apr', new: 20, returning: 22 },
  { month: 'May', new: 15, returning: 21 },
  { month: 'Jun', new: 18, returning: 22 },
  { month: 'Jul', new: 24, returning: 24 },
];

const SalesAnalytics = () => {
  const [timeframe, setTimeframe] = useState('monthly');
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Sales Analytics</h2>
        <div className="flex items-center gap-3">
          <Select
            value={timeframe}
            onValueChange={setTimeframe}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Report</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Revenue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,000</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                15.3%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">237</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                8.2%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$177.21</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 mr-1">
                  <path fillRule="evenodd" d="M12.577 4.878a.75.75 0 01.919-.53l4.78 1.281a.75.75 0 01.531.919l-1.281 4.78a.75.75 0 01-1.449-.387l.81-3.022a19.407 19.407 0 00-5.594 5.203.75.75 0 01-1.139.093L7 10.06l-4.72 4.72a.75.75 0 01-1.06-1.061l5.25-5.25a.75.75 0 011.06 0l3.074 3.073a20.923 20.923 0 015.545-4.931l-3.042-.815a.75.75 0 01-.53-.919z" clipRule="evenodd" />
                </svg>
                3.5%
              </span>
              <span className="ml-1">from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="revenue">
        <TabsList className="mb-6">
          <TabsTrigger value="revenue">Revenue & Orders</TabsTrigger>
          <TabsTrigger value="products">Product Categories</TabsTrigger>
          <TabsTrigger value="customers">Customer Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Revenue & Orders Overview</CardTitle>
              <CardDescription>
                Track your revenue and order trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" stroke="#4F46E5" />
                    <YAxis yAxisId="right" orientation="right" stroke="#EC4899" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      name="Revenue ($)"
                      stroke="#4F46E5"
                      activeDot={{ r: 8 }}
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="orders" 
                      name="Orders" 
                      stroke="#EC4899" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Product Category Breakdown</CardTitle>
              <CardDescription>
                Sales distribution across different product categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={productCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={150}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {productCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Acquisition</CardTitle>
              <CardDescription>
                New vs. returning customers over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={customerData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="new" name="New Customers" fill="#4F46E5" />
                    <Bar dataKey="returning" name="Returning Customers" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Recommendations</CardTitle>
          <CardDescription>
            Smart insights to help grow your business
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-100 dark:border-primary-900">
              <h3 className="text-lg font-medium text-primary-700 dark:text-primary-400 mb-2">
                Inventory Optimization
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your "Organic Wild Flower Honey" is selling fast. Consider increasing stock by 20% to meet demand.
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto text-primary-600 dark:text-primary-400">
                View Product Details
              </Button>
            </div>
            
            <div className="p-4 bg-secondary-50 dark:bg-secondary-900/20 rounded-lg border border-secondary-100 dark:border-secondary-900">
              <h3 className="text-lg font-medium text-secondary-700 dark:text-secondary-400 mb-2">
                Pricing Strategy
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Based on competitor analysis, your "Artisan Sourdough Bread" could be priced 10% higher without impacting sales.
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto text-secondary-600 dark:text-secondary-400">
                Adjust Pricing
              </Button>
            </div>
            
            <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-100 dark:border-amber-900">
              <h3 className="text-lg font-medium text-amber-700 dark:text-amber-400 mb-2">
                Marketing Opportunity
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                You've noticed an uptick in interest in your "Handmade Lavender Soap" products. Consider creating a special offer to capitalize on this trend.
              </p>
              <Button variant="link" className="p-0 mt-2 h-auto text-amber-600 dark:text-amber-400">
                Create Promotion
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesAnalytics;
