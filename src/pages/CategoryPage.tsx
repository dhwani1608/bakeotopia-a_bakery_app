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
    'Muffin & Cupcakes': 'Fresh Muffins & Delicious Cupcakes',
    'Pastry': 'Fresh Pastries',
    'Brownie': 'Rich Brownies',
    'Cookies': 'Mouth watering Cookies',
    'Cheescake': 'Rich & Exotic Cheesecakes',
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
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 w-max md:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-6 md:w-full">
              {filteredProducts.map((product) => (
                <div key={product.id} className="w-32 flex-shrink-0 md:w-auto md:flex-shrink">
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                </div>
              ))}
            </div>
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