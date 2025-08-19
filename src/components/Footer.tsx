import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = () => {
    if (email) {
      alert('Thank you for subscribing to our newsletter!');
      setEmail('');
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: '#' },
    { icon: Instagram, label: 'Instagram', url: '#' },
    { icon: Twitter, label: 'Twitter', url: '#' },
    { icon: Youtube, label: 'YouTube', url: '#' },
  ];

  return (
    <footer className="bg-bakery-peach text-bakery-blue-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold font-poppins text-bakery-purple">
              Bakeotopia
            </div>
            <p className="text-sm leading-relaxed">
              Home of quality baking. We create delicious, fresh-baked goods with love and the finest ingredients. Every bite tells a story of passion and craftsmanship.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  className="w-10 h-10 bg-bakery-blue-light/50 rounded-full flex items-center justify-center hover:bg-bakery-purple-light hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-poppins text-bakery-purple">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onPageChange(link.id)}
                    className="text-sm hover:text-bakery-purple transition-colors duration-300 hover:underline"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-poppins text-bakery-purple">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-bakery-purple flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium">123 Baker Street</p>
                  <p className="text-sm">Sweet Valley, SV 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-bakery-purple flex-shrink-0" />
                <p className="text-sm">(555) 123-CAKE</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-bakery-purple flex-shrink-0" />
                <p className="text-sm">hello@bakeotopia.com</p>
              </div>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-bakery-purple hover:text-bakery-purple-light underline"
              >
                View on Map →
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold font-poppins text-bakery-purple">
              Sweet Updates
            </h3>
            <p className="text-sm">
              Subscribe to our newsletter for the latest treats, offers, and baking tips!
            </p>
            <div className="space-y-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/80 border-bakery-blue-light focus:border-bakery-purple focus:ring-bakery-purple/20"
              />
              <Button
                onClick={handleNewsletterSubmit}
                className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-medium button-bounce"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="mt-12 pt-8 border-t border-bakery-blue-light/30">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h4 className="font-semibold text-bakery-purple mb-2">Delivery Areas</h4>
              <p className="text-sm">We deliver within 15 miles of our bakery. Same-day delivery available for orders placed before 2 PM.</p>
            </div>
            <div>
              <h4 className="font-semibold text-bakery-purple mb-2">Store Hours</h4>
              <p className="text-sm">Monday - Saturday: 7:00 AM - 8:00 PM<br />Sunday: 8:00 AM - 6:00 PM</p>
            </div>
            <div>
              <h4 className="font-semibold text-bakery-purple mb-2">Special Orders</h4>
              <p className="text-sm">Custom cakes and bulk orders welcome! Please call us 48 hours in advance.</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-bakery-blue-light/30 text-center">
          <p className="text-sm">
            © 2025 Bakeotopia. All rights reserved. Made with ❤️ and lots of flour.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;