import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import InventoryManager from './InventoryManager';
import SalesAnalytics from './SalesAnalytics';

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Example data - in a real app this would come from the API
  const salesData = [
    { name: 'Jan', sales: 4000 },
    { name: 'Feb', sales: 3000 },
    { name: 'Mar', sales: 5000 },
    { name: 'Apr', sales: 8000 },
    { name: 'May', sales: 6000 },
    { name: 'Jun', sales: 7000 },
  ];
  
  // Fetch analytics data
  const { data: analytics, isLoading } = useQuery({
    queryKey: ['/api/seller/analytics'],
    queryFn: async () => {
      const res = await fetch('/api/seller/analytics', {
        credentials: 'include'
      });
      if (!res.ok) throw new Error('Failed to fetch analytics');
      return res.json();
    },
  });
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Seller Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Total Sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(analytics?.totalSales / 100).toFixed(2)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+12.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics?.orderCount}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Avg. Order Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${analytics?.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">+2.3% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* Sales Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Over Time</CardTitle>
              <CardDescription>
                Your sales performance over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={salesData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#4F46E5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
              <CardDescription>Your best-selling products</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics?.topProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {product.sales} units sold
                      </p>
                    </div>
                    <div className="w-24 h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-600"
                        style={{ width: `${(product.sales / analytics.topProducts[0].sales) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <InventoryManager />
        </TabsContent>
        
        <TabsContent value="analytics">
          <SalesAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerDashboard;
