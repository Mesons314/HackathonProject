// Categories for the marketplace
export const CATEGORIES = [
  { name: "Groceries", icon: "bx-store" },
  { name: "Restaurants", icon: "bx-restaurant" },
  { name: "Fashion", icon: "bx-shopping-bag" },
  { name: "Books", icon: "bx-book" },
  { name: "Beverages", icon: "bx-drink" },
  { name: "Gifts", icon: "bx-gift" }
];

// Featured shop data for the homepage
export const FEATURED_SHOPS = [
  {
    id: 1,
    name: "Sarah's Bakery",
    category: "Bakery",
    rating: 4.8,
    distance: "1.2 mi",
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    description: "Fresh artisan bread, pastries and cakes baked daily with organic ingredients."
  },
  {
    id: 2,
    name: "Green Grocer",
    category: "Produce",
    rating: 4.6,
    distance: "0.8 mi",
    isOpen: true,
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187",
    description: "Local and organic produce from farms within 50 miles. Supporting local agriculture."
  },
  {
    id: 3,
    name: "Vintage Finds",
    category: "Antiques",
    rating: 4.7,
    distance: "2.4 mi",
    isOpen: false,
    imageUrl: "https://images.unsplash.com/photo-1524601500432-1e1a4c71d692",
    description: "Curated collection of vintage furniture, home goods, and unique collectibles."
  }
];

// Popular products for the homepage
export const POPULAR_PRODUCTS = [
  {
    id: 1,
    name: "Artisan Sourdough Bread",
    shop: "Sarah's Bakery",
    price: 699, // cents
    rating: 4.9,
    soldCount: 268,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff",
    isSale: false
  },
  {
    id: 2,
    name: "Organic Wild Flower Honey",
    shop: "Green Grocer",
    price: 849, // cents
    originalPrice: 1099, // cents
    rating: 4.7,
    soldCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150",
    isSale: true
  },
  {
    id: 3,
    name: "Handmade Lavender Soap",
    shop: "Craft & Co.",
    price: 599, // cents
    rating: 4.8,
    soldCount: 85,
    imageUrl: "https://images.unsplash.com/photo-1584727638096-042c45049ebe",
    isSale: false
  },
  {
    id: 4,
    name: "Vintage Desk Lamp (1960s)",
    shop: "Vintage Finds",
    price: 4500, // cents
    rating: 4.6,
    soldCount: 32,
    imageUrl: "https://images.unsplash.com/photo-1492778297155-7be4c83960c7",
    isSale: false
  },
  {
    id: 5,
    name: "Local Roast Coffee Beans",
    shop: "Brew House",
    price: 1299, // cents
    rating: 4.9,
    soldCount: 203,
    imageUrl: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1",
    isSale: false
  }
];

// Special offers for the homepage
export const SPECIAL_OFFERS = [
  {
    id: 1,
    title: "20% Off Fresh Produce",
    description: "Get 20% off all fresh fruits and vegetables at Green Grocer this weekend.",
    type: "Limited Time Offer",
    shopId: 2,
    color: "primary",
    icon: "bx-basket"
  },
  {
    id: 2,
    title: "Handcrafted Collection",
    description: "Check out the new handcrafted pottery collection at Clay Works Studio.",
    type: "New Arrival",
    shopId: 4,
    color: "secondary",
    icon: "bx-paint"
  },
  {
    id: 3,
    title: "Buy 2 Get 1 Free",
    description: "On all baked goods at Sarah's Bakery. Valid this Saturday and Sunday only.",
    type: "Weekend Special",
    shopId: 1,
    color: "amber",
    icon: "bx-cookie"
  }
];

// Nearby shops for the map section
export const NEARBY_SHOPS = [
  {
    id: 1,
    name: "Sarah's Bakery",
    category: "Bakery",
    distance: "0.8 mi",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8"
  },
  {
    id: 2,
    name: "Green Grocer",
    category: "Produce",
    distance: "1.2 mi",
    imageUrl: "https://images.unsplash.com/photo-1470337458703-46ad1756a187"
  },
  {
    id: 3,
    name: "Vintage Finds",
    category: "Antiques",
    distance: "2.4 mi",
    imageUrl: "https://images.unsplash.com/photo-1524601500432-1e1a4c71d692"
  }
];

// Testimonials for the homepage
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Emily Johnson",
    rating: 5,
    text: "I love shopping from local businesses through LocalMarket. The quality of products is amazing and it feels good to support the community.",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
  },
  {
    id: 2,
    name: "Michael Smith",
    rating: 4.5,
    text: "As a local artisan, the seller tools have made it so easy to reach customers in my area. The analytics help me understand what products sell best.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
  },
  {
    id: 3,
    name: "Sarah Parker",
    rating: 5,
    text: "The map feature is fantastic! I discovered so many great shops within walking distance that I never knew existed. Now I visit them regularly.",
    imageUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956"
  }
];

// Seller features for the homepage
export const SELLER_FEATURES = [
  {
    title: "Powerful Dashboard",
    description: "Manage inventory, track sales, and analyze customer behavior all in one place."
  },
  {
    title: "Smart Analytics",
    description: "AI-driven insights to help you optimize pricing and identify growth opportunities."
  },
  {
    title: "Local Marketing",
    description: "Connect with customers in your area through geo-targeted promotions."
  }
];
