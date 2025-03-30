import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertShopSchema, insertOfferSchema } from "@shared/schema";
import { setupAuth } from "./auth";

// Define custom request type to avoid TypeScript errors with req.user
declare namespace Express {
  interface User {
    id: number;
    username: string;
    isSeller: boolean;
    [key: string]: any;
  }
}

// Custom middleware to check if user is authenticated
const isAuthenticated = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
};

// Check if user is a seller
const isSeller = (req: Request, res: Response, next: any) => {
  if (req.isAuthenticated() && req.user?.isSeller) {
    return next();
  }
  res.status(403).json({ message: "Forbidden - Seller access required" });
};

// Middleware to check user's role
const hasRole = (role: string) => {
  return (req: Request, res: Response, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    switch(role) {
      case 'seller':
        if (req.user?.isSeller) {
          return next();
        }
        break;
      case 'buyer':
        // For now, any authenticated user can access buyer features
        return next();
      default:
        // For any other role, just check if user is authenticated
        return next();
    }
    
    res.status(403).json({ message: `Forbidden - ${role} access required` });
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Products routes
  app.get("/api/products", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const products = await storage.getProducts(category);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.post("/api/products", isSeller, async (req, res) => {
    try {
      if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
      }
  
      const validatedData = insertProductSchema.parse({
        ...req.body,
        sellerId: req.user.id,
      });
  
      const product = await storage.createProduct(validatedData);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: "Invalid product data" });
    }
  });

  app.put("/api/products/:id", isSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      if (!req.user) { // Explicitly check req.user to satisfy TypeScript
        return res.status(401).json({ message: "Unauthorized" });
      }
  
      if (product.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to update this product" });
      }
  
      const validatedData = insertProductSchema.partial().parse(req.body);
      const updatedProduct = await storage.updateProduct(id, validatedData);
      res.json(updatedProduct);
    } catch (error) {
      res.status(400).json({ message: "Failed to update product" });
    }
  });
  

  app.delete("/api/products/:id", isSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      if (!req.user) { // Explicitly check req.user to satisfy TypeScript
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (product.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to delete this product" });
      }
      
      await storage.deleteProduct(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  // Shops routes
  app.get("/api/shops", async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const shops = await storage.getShops(category);
      res.json(shops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shops" });
    }
  });

  app.get("/api/shops/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const shop = await storage.getShopById(id);
      
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      
      res.json(shop);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch shop" });
    }
  });

  app.post("/api/shops", isSeller, async (req, res) => {
   
    try {
      if (!req.user) { // Explicitly check req.user to satisfy TypeScript
        return res.status(401).json({ message: "Unauthorized" });
      }
      const validatedData = insertShopSchema.parse({
        ...req.body,
        ownerId: req.user.id
      });
      
      const shop = await storage.createShop(validatedData);
      res.status(201).json(shop);
    } catch (error) {
      res.status(400).json({ message: "Invalid shop data" });
    }
  });

  app.put("/api/shops/:id", isSeller, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const shop = await storage.getShopById(id);
      
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      if (!req.user) { // Explicitly check req.user to satisfy TypeScript
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (shop.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to update this shop" });
      }
      
      const validatedData = insertShopSchema.partial().parse(req.body);
      const updatedShop = await storage.updateShop(id, validatedData);
      res.json(updatedShop);
    } catch (error) {
      res.status(400).json({ message: "Failed to update shop" });
    }
  });

  // Wishlist routes
  app.get("/api/wishlist", isAuthenticated, async (req, res) => {
    if (!req.user) { // Explicitly check req.user to satisfy TypeScript
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const userId = req.user.id;
      const wishlistItems = await storage.getWishlistByUserId(userId);
      res.json(wishlistItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch wishlist" });
    }
  });

  app.post("/api/wishlist", isAuthenticated, async (req, res) => {
    if (!req.user) { // Explicitly check req.user to satisfy TypeScript
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { productId } = req.body;
      const userId = req.user.id;
      
      // Check if product exists
      const product = await storage.getProductById(parseInt(productId));
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      
      const wishlistItem = await storage.addToWishlist({
        userId,
        productId: parseInt(productId)
      });
      
      res.status(201).json(wishlistItem);
    } catch (error) {
      res.status(400).json({ message: "Failed to add to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", isAuthenticated, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      // TODO: Add check to ensure user owns this wishlist item
      
      await storage.removeFromWishlist(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to remove from wishlist" });
    }
  });

  // Offers routes
  app.get("/api/offers", async (req, res) => {
    try {
      const offers = await storage.getOffers();
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  app.get("/api/shops/:shopId/offers", async (req, res) => {
    try {
      const shopId = parseInt(req.params.shopId);
      const offers = await storage.getOffersByShopId(shopId);
      res.json(offers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch offers" });
    }
  });

  app.post("/api/offers", isSeller, async (req, res) => {
    try {
      // Verify the shop belongs to this seller
      const shopId = parseInt(req.body.shopId);
      const shop = await storage.getShopById(shopId);
      
      if (!shop) {
        return res.status(404).json({ message: "Shop not found" });
      }
      if (!req.user) { // Explicitly check req.user to satisfy TypeScript
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (shop.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized to create offers for this shop" });
      }
      
      const validatedData = insertOfferSchema.parse(req.body);
      const offer = await storage.createOffer(validatedData);
      res.status(201).json(offer);
    } catch (error) {
      res.status(400).json({ message: "Invalid offer data" });
    }
  });

  // Orders routes (simplified for demo)
  app.get("/api/orders", isAuthenticated, async (req, res) => {
    if (!req.user) { // Explicitly check req.user to satisfy TypeScript
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const userId = req.user.id;
      const orders = await storage.getOrdersByUserId(userId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/orders/:id", isAuthenticated, async (req, res) => {
    if (!req.user) { // Explicitly check req.user to satisfy TypeScript
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrderById(id);
      
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      if (order.userId !== req.user.id && !req.user.isSeller) {
        return res.status(403).json({ message: "Unauthorized to view this order" });
      }
      
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  app.post("/api/orders", isAuthenticated, async (req, res) => {
    if (!req.user) { // Explicitly check req.user to satisfy TypeScript
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const { items, total } = req.body;
      const userId = req.user.id;
      
      if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: "Order must contain at least one item" });
      }
      
      // Create the order with items
      const order = await storage.createOrder(
        { userId, total, status: "pending" },
        items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          orderId: 0 // This will be set within createOrder
        }))
      );
      
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ message: "Failed to create order" });
    }
  });

  // Seller analytics (simplified for demo)
  app.get("/api/seller/analytics", isSeller, async (req, res) => {
    try {
      // In a real app, we would query for actual analytics data
      // For demo, return some dummy analytics
      res.json({
        totalSales: 12500,
        orderCount: 47,
        averageOrderValue: 265.95,
        topProducts: [
          { id: 1, name: "Artisan Sourdough Bread", sales: 23 },
          { id: 2, name: "Organic Wild Flower Honey", sales: 18 },
          { id: 3, name: "Handmade Lavender Soap", sales: 15 }
        ]
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
