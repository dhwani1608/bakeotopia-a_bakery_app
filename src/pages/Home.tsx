import React from 'react';
import { ArrowRight, Star, Gift, Award, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/hooks/useProducts';
import heroImage from '@/assets/bakery-hero.jpg';
import chocolateCake from '@/assets/chocolate-cake.jpg';
import cupcakes from '@/assets/cupcakes.jpg';
import muffins from '@/assets/muffins.jpg';
import brownies from '@/assets/brownies.jpg';
import pastries from '@/assets/pastries.jpg';
import healthyTreats from '@/assets/healthy-treats.jpg';

interface HomeProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
}

const Home: React.FC<HomeProps> = ({ 
  products, 
  onAddToCart, 
  selectedCategory, 
  onCategoryChange,
  searchQuery 
}) => {
  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const bestsellers = products.filter(product => product.bestseller);
  
  const categories = [
    { name: 'Pastry', image: pastries, description: 'Delicate French pastries and croissants' },
    { name: 'Cake', image: chocolateCake, description: 'Rich, layered cakes for every occasion' },
    { name: 'Brownie', image: brownies, description: 'Fudgy chocolate brownies with premium cocoa' },
    { name: 'Muffin', image: muffins, description: 'Fresh-baked muffins with seasonal fruits' },
    { name: 'Cupcakes', image: cupcakes, description: 'Artisanal cupcakes with creative toppings' },
    { name: 'Healthy', image: healthyTreats, description: 'Wholesome treats with natural ingredients' },
  ];

  const festivalOffers = [
    {
      title: "Valentine's Special",
      description: "Heart-shaped cakes and romantic treats",
      discount: "25% OFF",
      color: "from-bakery-rose to-bakery-pink"
    },
    {
      title: "Spring Collection",
      description: "Fresh seasonal flavors and colors",
      discount: "20% OFF",
      color: "from-bakery-cream to-bakery-vanilla"
    }
  ];

  return (
    <main className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden rounded-3xl mx-4 md:mx-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4 sm:px-6">
          <div className="floating-animation">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold font-poppins mb-4 sm:mb-6 leading-tight">
              Welcome to <span className="text-gradient">Bakeotopia</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 font-medium">
              Home of Quality Baking
            </p>
            <p className="text-base sm:text-lg mb-6 sm:mb-8 opacity-90 max-w-2xl mx-auto px-2">
              Discover our artisanal collection of cakes, pastries, and treats crafted with love, 
              premium ingredients, and generations of baking expertise.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
            <Button 
              size="lg"
              className="bg-bakery-purple hover:bg-bakery-purple-light text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold button-bounce w-full sm:w-auto min-h-[48px]"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Explore Our Menu
              <ArrowRight className="ml-2 w-4 sm:w-5 h-4 sm:h-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-bakery-purple px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto min-h-[48px]"
            >
              <Gift className="mr-2 w-4 sm:w-5 h-4 sm:h-5" />
              Special Offers
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Delicious Categories</h2>
          <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
            From classic pastries to innovative healthy treats, explore our diverse range of freshly baked goods
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <div 
              key={category.name}
              className={`product-card cursor-pointer fade-in-up delay-${(index + 1) * 100} active:scale-95 transition-transform`}
              onClick={() => onCategoryChange(category.name)}
            >
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                  <h3 className="text-xl sm:text-2xl font-bold font-poppins">{category.name}</h3>
                </div>
              </div>
              <p className="text-bakery-blue-muted text-center text-sm sm:text-base px-2">{category.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="bg-bakery-vanilla py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Star className="w-6 h-6 text-bakery-purple fill-current" />
              <h2 className="section-title mb-0">Bestsellers</h2>
              <Star className="w-6 h-6 text-bakery-purple fill-current" />
            </div>
            <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
              Customer favorites that keep everyone coming back for more
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {bestsellers.slice(0, 4).map((product, index) => (
              <div key={product.id} className={`fade-in-up delay-${(index + 1) * 100}`}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Festival Offers Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gift className="w-6 h-6 text-bakery-purple" />
            <h2 className="section-title mb-0">Festival Offers</h2>
            <Gift className="w-6 h-6 text-bakery-purple" />
          </div>
          <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
            Special seasonal treats and limited-time offers you won't want to miss
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {festivalOffers.map((offer, index) => (
            <div 
              key={offer.title}
              className={`bg-gradient-to-br ${offer.color} rounded-3xl p-6 sm:p-8 text-center hover-lift fade-in-up delay-${(index + 1) * 200}`}
            >
              <div className="bg-white/20 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-poppins text-white mb-2">{offer.title}</h3>
              <p className="text-white/90 mb-4 text-sm sm:text-base">{offer.description}</p>
              <div className="text-2xl sm:text-3xl font-bold text-white mb-4">{offer.discount}</div>
              <Button 
                variant="secondary"
                className="bg-white text-bakery-purple hover:bg-white/90 font-semibold button-bounce min-h-[44px] px-6"
                onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Complete Menu</h2>
          <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
            {searchQuery ? `Search results for "${searchQuery}"` : 
             selectedCategory === 'All' ? 'Browse our full collection of artisanal baked goods' :
             `Discover our delicious ${selectedCategory.toLowerCase()} collection`}
          </p>
        </div>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-bakery-purple mb-2">No products found</h3>
            <p className="text-bakery-blue-muted">Try adjusting your search or browse different categories</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className={`fade-in-up delay-${(index % 4 + 1) * 100}`}>
                <ProductCard product={product} onAddToCart={onAddToCart} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-bakery-purple text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-bakery-cream" />
          <h2 className="text-4xl font-bold font-poppins mb-4">Experience the Difference</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who trust Bakeotopia for life's sweetest moments
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              variant="secondary"
              className="bg-white text-bakery-purple hover:bg-bakery-cream px-8 py-4 text-lg font-semibold"
            >
              Call Us: +91 9714705616
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;