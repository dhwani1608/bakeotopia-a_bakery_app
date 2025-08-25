import React from 'react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/hooks/useProducts';

interface CategoryPageProps {
  category: string;
  products: Product[];
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, products, onAddToCart, searchQuery }) => {
  const filteredProducts = products.filter(product => {
    const matchesCategory = category === 'All' || product.category === category;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryTitles: { [key: string]: string } = {
    'All': 'All Products',
    'Cake': 'Premium Cakes',
    'Cupcakes': 'Delicious Cupcakes',
    'Pastry': 'Fresh Pastries',
    'Brownie': 'Rich Brownies',
    'Muffin': 'Fresh Muffins',
    'Healthy': 'Healthy Options'
  };

  return (
    <main className="min-h-screen bg-bakery-pink-light/30">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-poppins text-gradient mb-4">
            {categoryTitles[category] || `${category} Collection`}
          </h1>
          <p className="text-lg text-bakery-blue-text max-w-2xl mx-auto">
            Discover our handcrafted {category.toLowerCase()} collection, made with premium ingredients and lots of love.
          </p>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl text-bakery-blue-muted mb-4">🧁</div>
            <h3 className="text-2xl font-semibold text-bakery-blue-text mb-2">
              No products found
            </h3>
            <p className="text-bakery-blue-muted">
              We're working on adding more {category.toLowerCase()} to our collection.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryPage;