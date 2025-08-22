import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import React, { useState } from 'react';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import CategoryPage from "./pages/CategoryPage";
import { useProducts } from "./hooks/useProducts";
import { useCart } from "./hooks/useCart";
import { useAuth } from "./hooks/useAuth";

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { user, loading, signOut } = useAuth();
  const { data: products = [] } = useProducts();
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart(user?.id || '');

  const handleAddToCart = (product: any) => {
    addToCart({ productId: product.id });
  };

  const handleUpdateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(cartItemId);
      return;
    }
    updateQuantity({ cartItemId, quantity });
  };

  const handleRemoveFromCart = (cartItemId: string) => {
    removeFromCart(cartItemId);
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Redirect to login if not authenticated (except for public pages)
  const publicPages = ['home', 'about', 'contact', 'login', 'all', 'pastry', 'cake', 'brownie', 'muffin', 'cupcakes', 'healthy'];
  if (!loading && !user && !publicPages.includes(currentPage)) {
    setCurrentPage('login');
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            products={products}
            onAddToCart={handleAddToCart}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
          />
        );
      case 'all':
        return (
          <CategoryPage
            category="All"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'pastry':
        return (
          <CategoryPage
            category="Pastry"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cake':
        return (
          <CategoryPage
            category="Cake"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'brownie':
        return (
          <CategoryPage
            category="Brownie"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'muffin':
        return (
          <CategoryPage
            category="Muffin"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cupcakes':
        return (
          <CategoryPage
            category="Cupcakes"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'healthy':
        return (
          <CategoryPage
            category="Healthy"
            products={products}
            onAddToCart={handleAddToCart}
          />
        );
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      case 'feedback':
        return <Feedback />;
      case 'cart':
        return (
          <Cart
            cartItems={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onPageChange={setCurrentPage}
          />
        );
      case 'login':
        return <Login onPageChange={setCurrentPage} />;
      default:
        return <NotFound />;
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen flex flex-col">
        <Header
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          cartItemCount={cartItemCount}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <div className="flex-grow">
          {renderPage()}
        </div>
        <Footer onPageChange={setCurrentPage} />
      </div>
    </TooltipProvider>
  );
};

export default App;
