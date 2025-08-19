import React from 'react';
import { Plus, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  bestseller?: boolean;
  discount?: number;
}

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
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.bestseller && (
            <span className="bg-bakery-purple text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              Bestseller
            </span>
          )}
          {product.discount && (
            <span className="bg-bakery-pink text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Heart icon */}
        <button className="absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300">
          <Heart className="w-4 h-4 text-bakery-purple" />
        </button>

        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Button
            onClick={() => onAddToCart(product)}
            className="bg-white text-bakery-purple hover:bg-bakery-purple hover:text-white transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 font-semibold"
          >
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-lg text-bakery-purple font-poppins mb-2 group-hover:text-bakery-purple-light transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-bakery-blue-muted leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-bakery-purple font-poppins">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-lg text-bakery-blue-muted line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <Button
            onClick={() => onAddToCart(product)}
            size="sm"
            className="bg-bakery-purple hover:bg-bakery-purple-light text-white button-bounce"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        {/* Category tag */}
        <div className="pt-2 border-t border-bakery-blue-light/30">
          <span className="inline-block px-3 py-1 bg-bakery-blue-light/50 text-bakery-blue-muted text-xs rounded-full font-medium">
            {product.category}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;