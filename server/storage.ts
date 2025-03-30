import { db } from "./db"
import { 
  users, type User, type InsertUser,
  products, type Product, type InsertProduct,
  shops, type Shop, type InsertShop,
  wishlist, type Wishlist, type InsertWishlist,
  offers, type Offer, type InsertOffer,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// Fix type issues with session store
declare module 'express-session' {
  interface SessionStore {
    all?: any;
    clear?: any;
    length?: any;
    touch?: any;
  }
}

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product operations
  getProducts(category?: string): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductsBySellerId(sellerId: number): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;

  // Shop operations
  getShops(category?: string): Promise<Shop[]>;
  getShopById(id: number): Promise<Shop | undefined>;
  getShopsByOwnerId(ownerId: number): Promise<Shop[]>;
  createShop(shop: InsertShop): Promise<Shop>;
  updateShop(id: number, shop: Partial<InsertShop>): Promise<Shop | undefined>;

  // Wishlist operations
  getWishlistByUserId(userId: number): Promise<(Wishlist & { product: Product })[]>;
  addToWishlist(wishlistItem: InsertWishlist): Promise<Wishlist>;
  removeFromWishlist(id: number): Promise<boolean>;

  // Offer operations
  getOffers(): Promise<Offer[]>;
  getOffersByShopId(shopId: number): Promise<Offer[]>;
  createOffer(offer: InsertOffer): Promise<Offer>;

  // Order operations
  getOrdersByUserId(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder, items: InsertOrderItem[]): Promise<Order>;
  getOrderById(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined>;

  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private products: Map<number, Product>;
  private shops: Map<number, Shop>;
  private wishlists: Map<number, Wishlist>;
  private offers: Map<number, Offer>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  
  sessionStore: session.SessionStore;
  private userIdCounter: number;
  private productIdCounter: number;
  private shopIdCounter: number;
  private wishlistIdCounter: number;
  private offerIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.shops = new Map();
    this.wishlists = new Map();
    this.offers = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
    this.userIdCounter = 1;
    this.productIdCounter = 1;
    this.shopIdCounter = 1;
    this.wishlistIdCounter = 1;
    this.offerIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = { 
      ...insertUser, 
      id, 
      createdAt: now, 
      isSeller: insertUser.isSeller ?? false  // Ensure isSeller is always boolean
    };
    this.users.set(id, user);
    return user;
  }
  
  // Product methods
  async getProducts(category?: string): Promise<Product[]> {
    let products = Array.from(this.products.values());
    if (category) {
      products = products.filter(product => product.category === category);
    }
    return products;
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductsBySellerId(sellerId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.sellerId === sellerId
    );
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const now = new Date();
    const product: Product = { 
        ...insertProduct, 
        id, 
        createdAt: now, 
        imageUrl: insertProduct.imageUrl ?? null,  // Ensure imageUrl is always defined
        stock: insertProduct.stock ?? 0  // Ensure stock is always defined
    };
    this.products.set(id, product);
    return product;
}


  async updateProduct(id: number, updates: Partial<InsertProduct>): Promise<Product | undefined> {
    const product = this.products.get(id);
    if (!product) return undefined;

    const updatedProduct = { ...product, ...updates };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }

  // Shop methods
  async getShops(category?: string): Promise<Shop[]> {
    let shops = Array.from(this.shops.values());
    if (category) {
      shops = shops.filter(shop => shop.category === category);
    }
    return shops;
  }

  async getShopById(id: number): Promise<Shop | undefined> {
    return this.shops.get(id);
  }

  async getShopsByOwnerId(ownerId: number): Promise<Shop[]> {
    return Array.from(this.shops.values()).filter(
      (shop) => shop.ownerId === ownerId
    );
  }

  async createShop(insertShop: InsertShop): Promise<Shop> {
    const id = this.shopIdCounter++;
    const now = new Date();
    const shop: Shop = { ...insertShop, id, createdAt: now ,
      imageUrl: insertShop.imageUrl ?? null,
      lat: insertShop.lat ?? null,
      lng: insertShop.lng ?? null,
      isOpen: insertShop.isOpen ?? null,  // Ensure isOpen is always defined
        rating: insertShop.rating ?? null,  // Ensure rating is always defined
        distance: insertShop.distance ?? null, 

    };
    this.shops.set(id, shop);
    return shop;
  }

  async updateShop(id: number, updates: Partial<InsertShop>): Promise<Shop | undefined> {
    const shop = this.shops.get(id);
    if (!shop) return undefined;

    const updatedShop = { ...shop, ...updates };
    this.shops.set(id, updatedShop);
    return updatedShop;
  }

  // Wishlist methods
  async getWishlistByUserId(userId: number): Promise<(Wishlist & { product: Product })[]> {
    const wishlistItems = Array.from(this.wishlists.values()).filter(
      (item) => item.userId === userId
    );

    return wishlistItems.map(item => {
      const product = this.products.get(item.productId);
      if (!product) {
        throw new Error(`Product not found for wishlist item: ${item.id}`);
      }
      return { ...item, product };
    });
  }

  async addToWishlist(insertWishlistItem: InsertWishlist): Promise<Wishlist> {
    const id = this.wishlistIdCounter++;
    const now = new Date();
    const wishlistItem: Wishlist = { ...insertWishlistItem, id, createdAt: now };
    this.wishlists.set(id, wishlistItem);
    return wishlistItem;
  }

  async removeFromWishlist(id: number): Promise<boolean> {
    return this.wishlists.delete(id);
  }

  // Offer methods
  async getOffers(): Promise<Offer[]> {
    return Array.from(this.offers.values());
  }

  async getOffersByShopId(shopId: number): Promise<Offer[]> {
    return Array.from(this.offers.values()).filter(
      (offer) => offer.shopId === shopId
    );
  }

  async createOffer(insertOffer: InsertOffer): Promise<Offer> {
    const id = this.offerIdCounter++;
    const now = new Date();
    const offer: Offer = { ...insertOffer, id, createdAt: now };
    this.offers.set(id, offer);
    return offer;
  }

  // Order methods
  async getOrdersByUserId(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async createOrder(insertOrder: InsertOrder, items: InsertOrderItem[]): Promise<Order> {
    const id = this.orderIdCounter++;
    const now = new Date();
    
    const order: Order = { 
        ...insertOrder, 
        id, 
        createdAt: now, 
        status: insertOrder.status ?? "pending" // Default status to "pending" if undefined
    };

    this.orders.set(id, order);

    // Create order items
    for (const item of items) {
      const itemId = this.orderItemIdCounter++;
      const orderItem: OrderItem = { ...item, id: itemId, orderId: id, createdAt: now };
      this.orderItems.set(itemId, orderItem);
    }

    return order;
}

  async getOrderById(id: number): Promise<(Order & { items: (OrderItem & { product: Product })[] }) | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    const items = Array.from(this.orderItems.values())
      .filter(item => item.orderId === id)
      .map(item => {
        const product = this.products.get(item.productId);
        if (!product) {
          throw new Error(`Product not found for order item: ${item.id}`);
        }
        return { ...item, product };
      });

    return { ...order, items };
  }

}

export const storage = new MemStorage();
