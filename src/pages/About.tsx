import React from 'react';
import { Heart, Award, Users, Leaf, Clock, ShieldCheck } from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Heart,
      title: 'Quality Ingredients',
      description: 'We use only the finest, locally-sourced ingredients and premium imported items to ensure every bite is exceptional.'
    },
    {
      icon: Award,
      title: 'Artisan Craftsmanship',
      description: 'Our skilled bakers bring decades of experience and passion to create beautiful, delicious treats with attention to every detail.'
    },
    {
      icon: Users,
      title: 'Customer Satisfaction',
      description: 'Your happiness is our priority. We go above and beyond to make every experience at Bakeotopia memorable and delightful.'
    },
    {
      icon: Leaf,
      title: 'Sustainable Practices',
      description: 'We care about our planet. From eco-friendly packaging to supporting local farmers, sustainability guides our decisions.'
    }
  ];

  const ingredients = [
    {
      name: 'Organic Flour',
      description: 'Stone-ground from locally grown wheat, ensuring optimal texture and flavor in every baked good.',
      image: '🌾'
    },
    {
      name: 'Farm-Fresh Dairy',
      description: 'Sourced from family farms within 50 miles, our dairy products are rich, creamy, and hormone-free.',
      image: '🥛'
    },
    {
      name: 'Premium Chocolate',
      description: 'Single-origin Belgian and Swiss chocolates that deliver unparalleled depth and richness.',
      image: '🍫'
    },
    {
      name: 'Seasonal Fruits',
      description: 'Hand-picked at peak ripeness from local orchards and farms for maximum freshness and flavor.',
      image: '🍓'
    }
  ];

  const timeline = [
    { year: '1985', event: 'Founded by Maria and Giuseppe Bakerton with a small neighborhood bakery' },
    { year: '1992', event: 'Expanded to include custom wedding cakes and special occasion treats' },
    { year: '2001', event: 'Introduced our famous chocolate collection and won regional baking awards' },
    { year: '2015', event: 'Launched healthy and organic product lines to meet changing customer needs' },
    { year: '2020', event: 'Added online ordering and delivery during the pandemic, reaching more families' },
    { year: '2025', event: 'Celebrating 40 years of bringing sweetness to our community' }
  ];

  return (
    <main className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="section-title fade-in-up">About Bakeotopia</h1>
          <p className="text-xl text-bakery-blue-muted leading-relaxed fade-in-up delay-200">
            For over four decades, Bakeotopia has been more than just a bakery—we're a cornerstone of our community, 
            crafting memories one delicious creation at a time. Our story is baked into every layer, kneaded into every loaf, 
            and sprinkled with the love of three generations.
          </p>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-bakery-vanilla py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Values</h2>
            <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
              These core principles guide everything we do, from selecting ingredients to serving our customers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`bg-white rounded-3xl p-8 text-center hover-lift fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-16 h-16 bg-bakery-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-bakery-purple" />
                </div>
                <h3 className="text-xl font-semibold font-poppins text-bakery-purple mb-4">
                  {value.title}
                </h3>
                <p className="text-bakery-blue-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredient Story Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Ingredient Story</h2>
          <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
            Every ingredient tells a story of quality, sustainability, and the relationships we've built with local suppliers
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ingredients.map((ingredient, index) => (
            <div 
              key={ingredient.name}
              className={`bg-bakery-rose/30 rounded-3xl p-8 hover-lift fade-in-up delay-${(index + 1) * 200}`}
            >
              <div className="flex items-start space-x-6">
                <div className="text-4xl">{ingredient.image}</div>
                <div>
                  <h3 className="text-2xl font-semibold font-poppins text-bakery-purple mb-3">
                    {ingredient.name}
                  </h3>
                  <p className="text-bakery-blue-muted leading-relaxed">
                    {ingredient.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-bakery-apricot py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Journey</h2>
            <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
              Four decades of growth, innovation, and community connection
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-bakery-purple-light"></div>
              
              {timeline.map((item, index) => (
                <div 
                  key={item.year}
                  className={`relative flex items-center mb-12 fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 order-2'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-card">
                      <div className="text-2xl font-bold font-poppins text-bakery-purple mb-2">
                        {item.year}
                      </div>
                      <p className="text-bakery-blue-muted leading-relaxed">
                        {item.event}
                      </p>
                    </div>
                  </div>
                  
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-bakery-purple rounded-full border-4 border-white shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Quality Matters Section */}
      <section className="container mx-auto px-4">
        <div className="bg-bakery-cream rounded-3xl p-8 md:p-16 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex justify-center space-x-4 mb-8">
              <Clock className="w-12 h-12 text-bakery-purple" />
              <ShieldCheck className="w-12 h-12 text-bakery-purple" />
              <Award className="w-12 h-12 text-bakery-purple" />
            </div>
            
            <h2 className="text-4xl font-bold font-poppins text-bakery-purple mb-6">
              Quality Matters, Always
            </h2>
            
            <p className="text-xl text-bakery-blue-muted leading-relaxed mb-8">
              Our commitment to quality isn't just about ingredients—it's about the entire experience. 
              From the moment you step into our bakery to the last crumb of your favorite treat, 
              we ensure every detail meets our exacting standards.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-bakery-purple mb-2">24/7</div>
                <p className="text-bakery-blue-muted">Fresh baking around the clock</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-bakery-purple mb-2">100%</div>
                <p className="text-bakery-blue-muted">Satisfaction guarantee</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-bakery-purple mb-2">40+</div>
                <p className="text-bakery-blue-muted">Years of baking excellence</p>
              </div>
            </div>
            
            <div className="pt-8">
              <button className="bg-bakery-purple text-white px-8 py-4 rounded-full font-semibold hover:bg-bakery-purple-light transition-colors button-bounce">
                Learn About Our Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-bakery-rose py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="section-title text-white mb-8">Meet Our Master Bakers</h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12">
            Our talented team brings together decades of experience, creativity, and passion for the art of baking
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { name: 'Maria Bakerton', role: 'Founder & Head Baker', experience: '40 years' },
              { name: 'Giuseppe Bakerton', role: 'Co-Founder & Pastry Chef', experience: '40 years' },
              { name: 'Sofia Chen', role: 'Lead Decorator', experience: '15 years' }
            ].map((member, index) => (
              <div 
                key={member.name}
                className={`bg-white/10 backdrop-blur-md rounded-2xl p-8 hover-lift fade-in-up delay-${(index + 1) * 200}`}
              >
                <div className="w-20 h-20 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold font-poppins text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-white/80 mb-2">{member.role}</p>
                <p className="text-white/60 text-sm">{member.experience} experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;