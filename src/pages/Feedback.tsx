import React, { useState } from 'react';
import { Star, Send, ThumbsUp, MessageCircle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useFeedback } from '@/hooks/useFeedback';
import { format } from 'date-fns';

const Feedback: React.FC = () => {
  const [feedbackForm, setFeedbackForm] = useState({
    name: '',
    email: '',
    rating: 0,
    comment: ''
  });

  const [hoveredRating, setHoveredRating] = useState(0);
  const { feedbacks, isLoading, isSubmitting, submitFeedback } = useFeedback();

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

  const handleSubmit = async () => {
    if (!feedbackForm.name || !feedbackForm.rating || !feedbackForm.comment) {
      return;
    }
    
    const success = await submitFeedback(feedbackForm);
    if (success) {
      setFeedbackForm({ name: '', email: '', rating: 0, comment: '' });
    }
  };

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
                disabled={isSubmitting}
                className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 button-bounce disabled:opacity-50"
              >
                <Send className="w-5 h-5 mr-2" />
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
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
            {isLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="bg-white rounded-3xl p-8 animate-pulse">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-6 h-6 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-20 h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="space-y-2 mb-6">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                      </div>
                      <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))
            ) : feedbacks.length > 0 ? (
              feedbacks.map((feedback, index) => (
                <div 
                  key={feedback.id}
                  className={`bg-white rounded-3xl p-8 hover-lift fade-in-up delay-${(index + 1) * 100}`}
                >
                  <div className="flex items-center justify-between mb-4">
                    {renderStars(feedback.rating)}
                    <span className="text-sm text-bakery-blue-muted">
                      {format(new Date(feedback.created_at), 'MMMM yyyy')}
                    </span>
                  </div>
                  
                  <p className="text-bakery-blue-muted leading-relaxed mb-6 italic">
                    "{feedback.comment}"
                  </p>
                  
                  <div className="border-t border-bakery-blue-light/30 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-bakery-purple">{feedback.name}</h4>
                        {feedback.product && (
                          <p className="text-sm text-bakery-blue-muted">{feedback.product}</p>
                        )}
                      </div>
                      <div className="w-12 h-12 bg-bakery-purple-light/20 rounded-full flex items-center justify-center">
                        <span className="text-bakery-purple font-bold text-lg">
                          {feedback.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <MessageCircle className="w-16 h-16 text-bakery-blue-muted mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-bakery-purple mb-2">No reviews yet</h3>
                <p className="text-bakery-blue-muted">Be the first to share your experience!</p>
              </div>
            )}
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