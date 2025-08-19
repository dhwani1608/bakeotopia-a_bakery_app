import React, { useState } from 'react';
import { Star, Send, ThumbsUp, MessageCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Feedback: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFeedbackForm(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = () => {
    if (!feedbackForm.name || !feedbackForm.rating || !feedbackForm.comment) {
      alert('Please fill in all required fields including your rating');
      return;
    }
    
    alert('Thank you for your feedback! Your review helps us improve our service.');
    setFeedbackForm({ name: '', email: '', rating: 0, comment: '' });
  };

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Absolutely amazing! The chocolate cake for my daughter\'s birthday was perfect. The attention to detail and the taste were beyond my expectations.',
      date: 'March 2025',
      product: 'Custom Birthday Cake'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'Best pastries in town! I\'ve been coming here for years and the quality never disappoints. The croissants are flaky and buttery perfection.',
      date: 'February 2025',
      product: 'French Pastries'
    },
    {
      name: 'Emily Rodriguez',
      rating: 5,
      comment: 'The staff is incredibly friendly and helpful. They accommodated my gluten-free needs perfectly, and the cake was delicious!',
      date: 'February 2025',
      product: 'Gluten-Free Cake'
    },
    {
      name: 'David Thompson',
      rating: 4,
      comment: 'Great variety of healthy options. The oat muffins are my go-to breakfast. Delivery is always on time and the packaging keeps everything fresh.',
      date: 'January 2025',
      product: 'Healthy Muffins'
    },
    {
      name: 'Lisa Wong',
      rating: 5,
      comment: 'Exceptional service for our wedding cake! Maria worked with us to create exactly what we envisioned. Our guests couldn\'t stop raving about it.',
      date: 'January 2025',
      product: 'Wedding Cake'
    }
  ];

  const stats = [
    { value: '4.9', label: 'Average Rating', icon: Star },
    { value: '2,500+', label: 'Happy Customers', icon: ThumbsUp },
    { value: '98%', label: 'Positive Reviews', icon: MessageCircle },
    { value: '15+', label: 'Awards Won', icon: Award }
  ];

  const renderStars = (rating: number, interactive = false, size = 'w-6 h-6') => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} cursor-pointer transition-colors ${
              star <= (interactive ? (hoveredRating || feedbackForm.rating) : rating)
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
            onClick={interactive ? () => handleRatingClick(star) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(star) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <main className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="section-title fade-in-up">Customer Feedback</h1>
        <p className="text-xl text-bakery-blue-muted max-w-2xl mx-auto fade-in-up delay-200">
          Your opinion matters to us! Share your experience and help us continue to deliver 
          the highest quality baked goods and service.
        </p>
      </section>

      {/* Stats Section */}
      <section className="bg-bakery-purple py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className={`text-center fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold font-poppins text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-white/80 text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback Form */}
      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-bakery-cream rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold font-poppins text-bakery-purple mb-4">
                Share Your Experience
              </h2>
              <p className="text-bakery-blue-muted">
                We'd love to hear about your experience with Bakeotopia. Your feedback helps us improve!
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-bakery-purple mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    name="name"
                    value={feedbackForm.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    className="bg-white border-bakery-blue-light focus:border-bakery-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bakery-purple mb-2">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={feedbackForm.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="bg-white border-bakery-blue-light focus:border-bakery-purple"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-bakery-purple mb-4">
                  Rating *
                </label>
                <div className="flex items-center space-x-4">
                  {renderStars(feedbackForm.rating, true, 'w-8 h-8')}
                  <span className="text-bakery-blue-muted">
                    {feedbackForm.rating ? `${feedbackForm.rating} out of 5 stars` : 'Click to rate'}
                  </span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-bakery-purple mb-2">
                  Your Review *
                </label>
                <Textarea
                  name="comment"
                  value={feedbackForm.comment}
                  onChange={handleInputChange}
                  placeholder="Tell us about your experience... What did you order? How was the service? What did you love most?"
                  rows={6}
                  className="bg-white border-bakery-blue-light focus:border-bakery-purple"
                />
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 button-bounce"
              >
                <Send className="w-5 h-5 mr-2" />
                Submit Feedback
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="bg-bakery-vanilla py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="text-lg text-bakery-blue-muted max-w-2xl mx-auto">
              Read what our valued customers have to say about their Bakeotopia experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className={`bg-white rounded-3xl p-8 hover-lift fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="flex items-center justify-between mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-bakery-blue-muted">{testimonial.date}</span>
                </div>
                
                <p className="text-bakery-blue-muted leading-relaxed mb-6 italic">
                  "{testimonial.comment}"
                </p>
                
                <div className="border-t border-bakery-blue-light/30 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-bakery-purple">{testimonial.name}</h4>
                      <p className="text-sm text-bakery-blue-muted">{testimonial.product}</p>
                    </div>
                    <div className="w-12 h-12 bg-bakery-purple-light/20 rounded-full flex items-center justify-center">
                      <span className="text-bakery-purple font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4">
        <div className="bg-bakery-rose rounded-3xl p-8 md:p-16 text-center">
          <MessageCircle className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold font-poppins text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Follow us on social media for the latest updates, behind-the-scenes content, 
            and special offers. Share your Bakeotopia moments with #BakeotopiaSweets
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary"
              className="bg-white text-bakery-purple hover:bg-bakery-cream font-semibold"
            >
              Follow on Instagram
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-bakery-purple font-semibold"
            >
              Like on Facebook
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Feedback;