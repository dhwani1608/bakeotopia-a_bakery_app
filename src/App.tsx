import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { Product } from "./components/ProductCard";

// Import product images
import chocolateCake from "@/assets/chocolate-cake.jpg";
import cupcakes from "@/assets/cupcakes.jpg";
import muffins from "@/assets/muffins.jpg";
import brownies from "@/assets/brownies.jpg";
import pastries from "@/assets/pastries.jpg";
import healthyTreats from "@/assets/healthy-treats.jpg";

const queryClient = new QueryClient();

// Sample product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Chocolate Bliss Cake',
    description: 'Rich chocolate layers with premium ganache frosting and decorative chocolate curls. Perfect for celebrations.',
    price: 45.99,
    image: chocolateCake,
    category: 'Cake',
    bestseller: true
  },
  {
    id: '2',
    name: 'Vanilla Dream Cupcakes',
    description: 'Fluffy vanilla cupcakes topped with swirled buttercream frosting in pastel colors. Sold as a set of 6.',
    price: 24.99,
    image: cupcakes,
    category: 'Cupcakes',
    bestseller: true
  },
  {
    id: '3',
    name: 'Blueberry Morning Muffins',
    description: 'Fresh-baked muffins bursting with juicy blueberries and a golden brown top. Perfect for breakfast.',
    price: 18.99,
    image: muffins,
    category: 'Muffin',
    bestseller: true
  },
  {
    id: '4',
    name: 'Fudgy Chocolate Brownies',
    description: 'Decadent brownies with a fudgy texture, topped with chopped walnuts and a light dusting of powdered sugar.',
    price: 22.99,
    image: brownies,
    category: 'Brownie',
    bestseller: true,
    discount: 15
  },
  {
    id: '5',
    name: 'French Pastry Selection',
    description: 'Assorted French pastries including croissants, pain au chocolat, and éclairs. A taste of Paris in every bite.',
    price: 32.99,
    image: pastries,
    category: 'Pastry'
  },
  {
    id: '6',
    name: 'Healthy Oat Granola Bars',
    description: 'Wholesome granola bars made with organic oats, dried berries, and nuts. A guilt-free sweet treat.',
    price: 16.99,
    image: healthyTreats,
    category: 'Healthy'
  },
  {
    id: '7',
    name: 'Red Velvet Cupcakes',
    description: 'Classic red velvet cupcakes with cream cheese frosting and a hint of cocoa. Rich and indulgent.',
    price: 26.99,
    image: cupcakes,
    category: 'Cupcakes'
  },
  {
    id: '8',
    name: 'Lemon Poppy Seed Muffins',
    description: 'Bright and citrusy muffins with poppy seeds and a sweet lemon glaze. Light and refreshing.',
    price: 19.99,
    image: muffins,
    category: 'Muffin'
  },
  {
    id: '9',
    name: 'Triple Layer Carrot Cake',
    description: 'Moist carrot cake with cream cheese frosting, crushed walnuts, and a touch of cinnamon spice.',
    price: 42.99,
    image: chocolateCake,
    category: 'Cake',
    discount: 10
  },
  {
    id: '10',
    name: 'Almond Croissants',
    description: 'Buttery croissants filled with sweet almond paste and topped with sliced almonds and powdered sugar.',
    price: 28.99,
    image: pastries,
    category: 'Pastry'
  },
  {
    id: '11',
    name: 'Double Chocolate Brownies',
    description: 'Extra chocolatey brownies with chocolate chips baked right in. For the ultimate chocolate lover.',
    price: 24.99,
    image: brownies,
    category: 'Brownie'
  },
  {
    id: '12',
    name: 'Energy Protein Balls',
    description: 'No-bake protein balls made with dates, nuts, and dark chocolate. Perfect post-workout treat.',
    price: 14.99,
    image: healthyTreats,
    category: 'Healthy'
  }
];

interface CartItem extends Product {
  quantity: number;
}

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Home
            products={sampleProducts}
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
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'pastry':
        return (
          <CategoryPage
            category="Pastry"
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cake':
        return (
          <CategoryPage
            category="Cake"
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'brownie':
        return (
          <CategoryPage
            category="Brownie"
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'muffin':
        return (
          <CategoryPage
            category="Muffin"
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'cupcakes':
        return (
          <CategoryPage
            category="Cupcakes"
            products={sampleProducts}
            onAddToCart={handleAddToCart}
          />
        );
      case 'healthy':
        return (
          <CategoryPage
            category="Healthy"
            products={sampleProducts}
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
        return <Login />;
      default:
        return <NotFound />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default App;
