import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from '@/components/ui/table';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Plus, PencilIcon, Trash2 } from 'lucide-react';

// Format price from cents to dollars
const formatPrice = (cents) => {
  return `$${(cents / 100).toFixed(2)}`;
};

// Component for adding or editing a product
const ProductFormDialog = ({ product, isEdit, onSubmit, open, onOpenChange }) => {
  const initialData = product || {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: 0,
    imageUrl: ''
  };

  const [formData, setFormData] = useState(initialData);
  const categories = ['Groceries', 'Restaurants', 'Fashion', 'Books', 'Beverages', 'Gifts'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({ ...prev, category: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert price from dollars to cents and ensure it's a number
    const priceInCents = Math.round(parseFloat(formData.price) * 100);
    // Convert stock to a number
    const stockNum = parseInt(formData.stock, 10);
    
    onSubmit({
      ...formData,
      price: priceInCents,
      stock: stockNum
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {isEdit 
              ? 'Update your product details below.' 
              : 'Fill out the form below to add a new product to your inventory.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Category</Label>
              <Select
                value={formData.category}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0.01"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">Stock</Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">Image URL</Label>
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="col-span-3"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="col-span-3"
                rows={3}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isEdit ? 'Update Product' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const InventoryManager = () => {
  const { toast } = useToast();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  
  // Fetch products for this seller
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products'],
    queryFn: async () => {
      const res = await fetch('/api/products', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    },
  });
  
  // Add product mutation
  const addProductMutation = useMutation({
    mutationFn: async (newProduct) => {
      const res = await apiRequest('POST', '/api/products', newProduct);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsAddDialogOpen(false);
      toast({
        title: 'Product Added',
        description: 'Your product has been added successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to add product',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  
  // Update product mutation
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct) => {
      const res = await apiRequest('PUT', `/api/products/${updatedProduct.id}`, updatedProduct);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      setIsEditDialogOpen(false);
      setSelectedProduct(null);
      toast({
        title: 'Product Updated',
        description: 'Your product has been updated successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to update product',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  
  // Delete product mutation
  const deleteProductMutation = useMutation({
    mutationFn: async (productId) => {
      await apiRequest('DELETE', `/api/products/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/products'] });
      toast({
        title: 'Product Deleted',
        description: 'Your product has been deleted successfully',
      });
    },
    onError: (error) => {
      toast({
        title: 'Failed to delete product',
        description: error.message,
        variant: 'destructive',
      });
    }
  });
  
  const handleAddProduct = (productData) => {
    addProductMutation.mutate(productData);
  };
  
  const handleUpdateProduct = (productData) => {
    updateProductMutation.mutate({
      ...productData,
      id: selectedProduct.id
    });
  };
  
  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProductMutation.mutate(productId);
    }
  };
  
  const handleEditClick = (product) => {
    // Convert cents to dollars for the form
    setSelectedProduct({
      ...product,
      price: (product.price / 100).toFixed(2)
    });
    setIsEditDialogOpen(true);
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Inventory Management</CardTitle>
            <CardDescription>Manage your product inventory</CardDescription>
          </div>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {products && products.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatPrice(product.price)}</TableCell>
                  <TableCell>
                    <span className={product.stock < 10 ? 'text-red-500' : ''}>
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditClick(product)}
                      >
                        <PencilIcon size={16} />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              You haven't added any products yet
            </p>
            <Button 
              onClick={() => setIsAddDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              Add Your First Product
            </Button>
          </div>
        )}
      </CardContent>
      
      {/* Add Product Dialog */}
      <ProductFormDialog
        isEdit={false}
        onSubmit={handleAddProduct}
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
      />
      
      {/* Edit Product Dialog */}
      {selectedProduct && (
        <ProductFormDialog
          product={selectedProduct}
          isEdit={true}
          onSubmit={handleUpdateProduct}
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
        />
      )}
    </Card>
  );
};

export default InventoryManager;
