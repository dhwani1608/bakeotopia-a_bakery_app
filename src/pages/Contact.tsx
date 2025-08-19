import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Truck, Calendar, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }
    
    alert('Thank you for your message! We will get back to you within 24 hours.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Bakery',
      details: ['123 Baker Street', 'Sweet Valley, SV 12345'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['(555) 123-CAKE', 'Monday - Sunday: 7 AM - 8 PM'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@bakeotopia.com', 'orders@bakeotopia.com'],
      action: 'Send Email'
    }
  ];

  const deliveryAreas = [
    { area: 'Downtown District', time: '30-45 minutes', fee: 'Free' },
    { area: 'Suburban Areas', time: '45-60 minutes', fee: '$3.99' },
    { area: 'Extended Areas', time: '60-90 minutes', fee: '$5.99' }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 8:00 PM' },
    { day: 'Saturday', hours: '7:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 6:00 PM' }
  ];

  return (
    <main className="space-y-16 py-8">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center">
        <h1 className="section-title fade-in-up">Get in Touch</h1>
        <p className="text-xl text-bakery-blue-muted max-w-2xl mx-auto fade-in-up delay-200">
          We'd love to hear from you! Whether you have questions about our products, need a custom order, 
          or just want to say hello, we're here to help.
        </p>
      </section>

      {/* Contact Information Cards */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {contactInfo.map((info, index) => (
            <div 
              key={info.title}
              className={`bg-bakery-cream rounded-3xl p-8 text-center hover-lift fade-in-up delay-${(index + 1) * 100}`}
            >
              <div className="w-16 h-16 bg-bakery-purple-light/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <info.icon className="w-8 h-8 text-bakery-purple" />
              </div>
              <h3 className="text-xl font-semibold font-poppins text-bakery-purple mb-4">
                {info.title}
              </h3>
              <div className="space-y-2 mb-6">
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-bakery-blue-muted">
                    {detail}
                  </p>
                ))}
              </div>
              <Button 
                variant="outline"
                className="border-bakery-purple text-bakery-purple hover:bg-bakery-purple hover:text-white"
              >
                {info.action}
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-bakery-purple mb-4">
                Send Us a Message
              </h2>
              <p className="text-bakery-blue-muted">
                Fill out the form below and we'll get back to you as soon as possible.
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
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-bakery-purple mb-2">
                    Phone
                  </label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    className="bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-bakery-purple mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-bakery-purple mb-2">
                  Message *
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help you..."
                  rows={6}
                  className="bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                />
              </div>
              
              <Button 
                onClick={handleSubmit}
                className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 button-bounce"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Message
              </Button>
            </div>
          </div>

          {/* Map & Additional Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-poppins text-bakery-purple mb-4">
                Find Us
              </h2>
              <p className="text-bakery-blue-muted mb-6">
                Located in the heart of Sweet Valley, our bakery is easily accessible and offers ample parking.
              </p>
            </div>
            
            {/* Map Placeholder */}
            <div className="bg-bakery-blue-light rounded-2xl h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-bakery-purple mx-auto mb-4" />
                <p className="text-bakery-blue-muted">Interactive Map</p>
                <p className="text-sm text-bakery-blue-muted">123 Baker Street, Sweet Valley</p>
              </div>
            </div>
            
            {/* Business Hours */}
            <div className="bg-bakery-vanilla rounded-2xl p-6">
              <div className="flex items-center mb-4">
                <Clock className="w-6 h-6 text-bakery-purple mr-3" />
                <h3 className="text-xl font-semibold font-poppins text-bakery-purple">
                  Business Hours
                </h3>
              </div>
              <div className="space-y-2">
                {businessHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-bakery-blue-muted">{schedule.day}</span>
                    <span className="text-bakery-purple font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="bg-bakery-rose py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Truck className="w-8 h-8 text-white" />
              <h2 className="text-4xl font-bold font-poppins text-white">
                Delivery Service
              </h2>
            </div>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              We deliver fresh baked goods right to your door! Check out our delivery areas and times.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {deliveryAreas.map((area, index) => (
                <div 
                  key={area.area}
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover-lift fade-in-up delay-${(index + 1) * 200}`}
                >
                  <h3 className="text-xl font-semibold font-poppins text-white mb-3">
                    {area.area}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-white/80">
                      <strong>Delivery Time:</strong> {area.time}
                    </p>
                    <p className="text-white/80">
                      <strong>Delivery Fee:</strong> {area.fee}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center">
              <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-poppins text-white mb-4">
                Special Orders & Events
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Planning a special event? We offer custom cakes, bulk orders, and catering services. 
                Contact us at least 48 hours in advance for custom orders.
              </p>
              <Button 
                variant="secondary"
                className="bg-white text-bakery-purple hover:bg-bakery-cream font-semibold"
              >
                Request Custom Order
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Frequently Asked Questions</h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {[
            {
              question: 'Do you offer gluten-free options?',
              answer: 'Yes! We have a dedicated gluten-free section with cakes, cookies, and pastries made in a separate area to prevent cross-contamination.'
            },
            {
              question: 'How far in advance should I place a custom cake order?',
              answer: 'We recommend placing custom cake orders at least 48-72 hours in advance, especially for complex designs or during busy seasons.'
            },
            {
              question: 'Do you deliver on weekends?',
              answer: 'Yes, we offer delivery service 7 days a week during our business hours. Weekend delivery may have slightly longer wait times.'
            },
            {
              question: 'Can I modify or cancel my order?',
              answer: 'Orders can be modified or cancelled up to 24 hours before the scheduled pickup or delivery time. Please call us as soon as possible.'
            }
          ].map((faq, index) => (
            <div 
              key={index}
              className={`bg-bakery-cream rounded-2xl p-6 fade-in-up delay-${(index + 1) * 100}`}
            >
              <h3 className="text-lg font-semibold font-poppins text-bakery-purple mb-3">
                {faq.question}
              </h3>
              <p className="text-bakery-blue-muted leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Contact;