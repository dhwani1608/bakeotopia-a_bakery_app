import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

import { Product } from '@/hooks/useProducts';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const discountedPrice = product.discount 
    ? product.price * (1 - product.discount / 100) 
    : product.price;

  return (
    <div className="product-card group fade-in-up">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-2xl aspect-[4/3]">
        <img
          src={product.image.replace('/src/assets/', '/assets/')}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-1 sm:gap-2">
          {product.bestseller && (
            <span className="bg-bakery-purple text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-bakery-pink text-white px-2 sm:px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Heart icon - made larger for better touch target */}
        <button className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-8 sm:h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 active:scale-95">
          <Heart className="w-5 h-5 sm:w-4 sm:h-4 text-bakery-purple" />
        </button>

        {/* Quick add overlay - hidden on mobile, visible on hover for desktop */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center hidden sm:flex">
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-white text-bakery-purple hover:bg-bakery-purple hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-semibold min-h-[44px]"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div>
          <h3 className="font-semibold text-base sm:text-lg text-bakery-purple font-poppins mb-2 group-hover:text-bakery-purple-light transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-xs sm:text-sm text-bakery-blue-muted leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
            <span className="text-lg sm:text-2xl font-bold text-bakery-purple font-poppins">
              Rs.{discountedPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-sm sm:text-lg text-bakery-blue-muted line-through">
                Rs.{product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="bg-bakery-purple hover:bg-bakery-purple-light text-white button-bounce min-h-[44px] px-3 sm:px-4 text-sm active:scale-95"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Category tag */}
        <div className="pt-2 border-t border-bakery-blue-light/30">
          <span className="inline-block px-2 sm:px-3 py-1 bg-bakery-blue-light/50 text-bakery-blue-muted text-xs rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;