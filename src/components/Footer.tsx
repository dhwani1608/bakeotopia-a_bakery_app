import React, { useState } from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface FooterProps {
  onPageChange: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onPageChange }) => {

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
    { id: 'feedback', label: 'Feedback' },
  ];

  const socialLinks = [
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/share/1CNjtc2Mes/' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/bakeotopia_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==' },
  ];

  return (
    <footer className="bg-bakery-peach text-bakery-blue-muted">
      <div className="container mx-auto px-4 py-4 sm:py-8">
        {/* Mobile: Horizontal Layout */}
        <div className="block sm:hidden">
          <div className="flex flex-col space-y-3">
            {/* Brand and Social */}
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold font-poppins text-bakery-purple">
                BakeOTopia
              </div>
              <div className="flex space-x-2">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-7 h-7 bg-bakery-blue-light/50 rounded-full flex items-center justify-center hover:bg-bakery-purple-light hover:text-white transition-all duration-300"
                    aria-label={social.label}
                  >
                    <social.icon className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact and Links Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <Phone className="w-3 h-3 text-bakery-purple" />
                  <p className="text-xs">+91 9714705616</p>
                </div>
                <div className="flex items-start space-x-2">
                  <MapPin className="w-3 h-3 text-bakery-purple flex-shrink-0 mt-0.5" />
                  <p className="text-xs">Gandhinagar, 382007</p>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {quickLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => onPageChange(link.id)}
                      className="text-xs hover:text-bakery-purple transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-2 border-t border-bakery-blue-light/30 text-center">
              <p className="text-xs">© 2025 BakeOTopia. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Desktop: Original Grid Layout */}
        <div className="hidden sm:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Brand Section */}
            <div className="space-y-3 lg:space-y-4">
              <div className="text-xl lg:text-2xl font-bold font-poppins text-bakery-purple">
                BakeOTopia
              </div>
              <p className="text-sm leading-relaxed">
                Home of quality baking. We create delicious, fresh-baked goods with love and the finest ingredients.
              </p>
              <div className="flex space-x-2 lg:space-x-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="w-8 h-8 lg:w-10 lg:h-10 bg-bakery-blue-light/50 rounded-full flex items-center justify-center hover:bg-bakery-purple-light hover:text-white transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4 lg:w-5 lg:h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-base lg:text-lg font-semibold font-poppins text-bakery-purple">
                Quick Links
              </h3>
              <ul className="space-y-1 lg:space-y-2">
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
            <div className="space-y-3 lg:space-y-4">
              <h3 className="text-base lg:text-lg font-semibold font-poppins text-bakery-purple">
                Contact Info
              </h3>
              <div className="space-y-2 lg:space-y-3">
                <div className="flex items-start space-x-2 lg:space-x-3">
                  <MapPin className="w-4 h-4 lg:w-5 lg:h-5 text-bakery-purple flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">102 Tulsi</p>
                    <p className="text-sm">Raysan, Gandhinagar, 382007</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-bakery-purple flex-shrink-0" />
                  <p className="text-sm">+91 9714705616</p>
                </div>
                <a
                  href="https://maps.app.goo.gl/ZewwEeihMHkZsWzCA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-bakery-purple hover:text-bakery-purple-light underline"
                >
                  View on Map →
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-base lg:text-lg font-semibold font-poppins text-bakery-purple mb-2">Delivery Areas</h4>
              <p className="text-sm">We deliver within 15 miles of our bakery. In Gandhinagar and Ahmedabad only</p>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="mt-8 lg:mt-12 pt-6 lg:pt-8 border-t border-bakery-blue-light/30 text-center">
            <div className="grid grid-cols-1 gap-4 lg:gap-6 text-center">
              <div>
                <h4 className="text-sm lg:text-base font-semibold text-bakery-purple mb-2">Special Orders</h4>
                <p className="text-sm">Custom cakes and bulk orders welcome! Please call us 48 hours in advance.</p>
              </div>  
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-6 lg:mt-8 pt-6 lg:pt-8 border-t border-bakery-blue-light/30 text-center">
            <p className="text-sm">
              © 2025 BakeOTopia. All rights reserved. Made with ❤️ and lots of flour.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;