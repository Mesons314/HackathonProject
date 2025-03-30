import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/hooks/use-auth";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";
import { ShopProvider } from "@/context/ShopContext";
import { ProtectedRoute } from "@/lib/protected-route";
import { queryClient } from "./lib/queryClient";

// Pages
import HomePage from "@/pages/HomePage";
import AuthPage from "@/pages/AuthPage";
import ShopDetailPage from "@/pages/ShopDetailPage";
import SellerDashboardPage from "@/pages/SellerDashboardPage";
import ProductSearchPage from "@/pages/ProductSearchPage";
import WishlistPage from "@/pages/WishlistPage";
import CartPage from "@/pages/CartPage";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/shops/:id" component={ShopDetailPage} />
      <Route path="/explore" component={ProductSearchPage} />
      <Route path="/categories/:category?" component={ProductSearchPage} />
      <ProtectedRoute path="/wishlist" component={WishlistPage} />
      <ProtectedRoute path="/cart" component={CartPage} />
      <ProtectedRoute 
        path="/seller/dashboard" 
        component={SellerDashboardPage} 
        roles={['seller']} 
      />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <CartProvider>
            <ShopProvider>
              <Router />
              <Toaster />
            </ShopProvider>
          </CartProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
