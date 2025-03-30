import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";

export function ProtectedRoute({
  path,
  component: Component,
  roles = []
}) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        </div>
      </Route>
    );
  }

  // If no user is authenticated, redirect to auth page
  if (!user) {
    return (
      <Route path={path}>
        <Redirect to="/auth" />
      </Route>
    );
  }

  // If roles are specified, check if the user has the required role
  if (roles.length > 0 && !roles.includes(user.isSeller ? 'seller' : 'buyer')) {
    return (
      <Route path={path}>
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-center mb-6">You don't have permission to access this page.</p>
          <a href="/" className="px-4 py-2 bg-primary-600 text-white rounded-lg">
            Return to Home
          </a>
        </div>
      </Route>
    );
  }

  // If user is authenticated and has the required role, render the component
  return <Route path={path} component={Component} />;
}
