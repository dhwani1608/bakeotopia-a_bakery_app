import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  cartItemCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = ['All', 'Pastry', 'Cake', 'Brownie', 'Muffin', 'Cupcakes', 'Healthy'];

const Header: React.FC<HeaderProps> = ({
  currentPage,
  onPageChange,
  cartItemCount,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact Us' },
    { id: 'feedback', label: 'Feedback' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-bakery-pink-light/95 backdrop-blur-md border-b border-bakery-blue-light/30">
      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold font-poppins text-gradient">
              Bakeotopia
            </div>
            <div className="hidden sm:block text-sm text-bakery-blue-muted font-medium">
              Home of quality baking
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                  currentPage === item.id 
                    ? 'text-bakery-purple font-semibold' 
                    : 'text-bakery-blue-text hover:text-bakery-pink'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 w-64 bg-bakery-blue-light/50 border-bakery-blue-light focus:border-bakery-purple-light focus:ring-bakery-purple-light/20"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange('cart')}
              className="relative hover:bg-bakery-purple-light/20"
            >
              <ShoppingCart className="w-5 h-5 text-bakery-blue-text" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-bakery-purple text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cartItemCount}
                </span>
              )}
            </Button>

            {/* Login */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onPageChange('login')}
              className="hidden sm:flex hover:bg-bakery-purple-light/20"
            >
              <User className="w-5 h-5 text-bakery-blue-text" />
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 w-full bg-bakery-blue-light/50 border-bakery-blue-light focus:border-bakery-purple-light focus:ring-bakery-purple-light/20"
            />
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-bakery-blue-light/30 pt-4">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left px-3 py-2 rounded-lg transition-colors ${
                    currentPage === item.id 
                      ? 'bg-bakery-purple-light/20 text-bakery-purple font-semibold' 
                      : 'text-bakery-blue-text hover:bg-bakery-blue-light/30'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => {
                  onPageChange('login');
                  setIsMobileMenuOpen(false);
                }}
                className="sm:hidden text-left px-3 py-2 rounded-lg text-bakery-blue-text hover:bg-bakery-blue-light/30"
              >
                Login / Signup
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Category Bar */}
      <div className="bg-bakery-blue-light/30 border-t border-bakery-blue-light/30">
        <div className="container mx-auto px-4">
          {/* Desktop Category Bar */}
          <div className="hidden md:flex items-center justify-center space-x-2 py-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  onPageChange('home');
                }}
                className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="md:hidden py-3">
            <Button
              variant="ghost"
              onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              className="w-full justify-between bg-bakery-blue-light text-bakery-blue-muted hover:bg-bakery-purple-light hover:text-white"
            >
              <span>Category: {selectedCategory}</span>
              <Menu className="w-4 h-4" />
            </Button>
            
            {isCategoryMenuOpen && (
              <div className="mt-2 space-y-1">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      onCategoryChange(category);
                      onPageChange('home');
                      setIsCategoryMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-bakery-purple-light text-white font-semibold'
                        : 'bg-bakery-blue-light text-bakery-blue-text hover:bg-bakery-purple-light/20 hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;