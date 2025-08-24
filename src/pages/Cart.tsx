import React, { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, CreditCard, MapPin, Phone, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/hooks/useCart';

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, quantity: number) => void;
  onRemoveFromCart: (cartItemId: string) => void;
  onPageChange: (page: string) => void;
}

const Cart: React.FC<CartProps> = ({ 
  cartItems, 
  onUpdateQuantity, 
  onRemoveFromCart,
  onPageChange 
}) => {
  const [showDeliveryInfo, setShowDeliveryInfo] = useState(false);
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.products.discount 
        ? item.products.price * (1 - item.products.discount / 100)
        : item.products.price;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = subtotal > 50 ? 0 : 3.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add some items before checkout.');
      return;
    }
    setShowDeliveryInfo(true);
  };

  if (cartItems.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="fade-in-up">
            <ShoppingBag className="w-24 h-24 text-bakery-blue-muted mx-auto mb-6" />
            <h1 className="text-4xl font-bold font-poppins text-bakery-purple mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-xl text-bakery-blue-muted mb-8">
              Looks like you haven't added any delicious treats to your cart yet. 
              Explore our menu and discover your new favorites!
            </p>
          </div>
          
          <div className="space-y-4 fade-in-up delay-200">
            <Button 
              onClick={() => onPageChange('home')}
              size="lg"
              className="bg-bakery-purple hover:bg-bakery-purple-light text-white px-8 py-4 text-lg font-semibold button-bounce"
            >
              Explore Our Menu
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <p className="text-sm text-bakery-blue-muted">
              Free delivery on orders over $50!
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8 fade-in-up">
        <h1 className="text-4xl font-bold font-poppins text-bakery-purple mb-2">
          Shopping Cart
        </h1>
        <p className="text-bakery-blue-muted">
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item, index) => {
            const itemPrice = item.products.discount 
              ? item.products.price * (1 - item.products.discount / 100)
              : item.products.price;
            
            return (
              <div 
                key={item.id}
                className={`bg-bakery-cream rounded-2xl p-6 hover-lift fade-in-up delay-${(index + 1) * 100}`}
              >
                <div className="flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.products.image || ''}
                      alt={item.products.name}
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-grow">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold font-poppins text-bakery-purple">
                        {item.products.name}
                      </h3>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="text-bakery-blue-muted hover:text-red-500 transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <p className="text-bakery-blue-muted text-sm mb-4 line-clamp-2">
                      {item.products.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                          className="w-8 h-8 bg-bakery-blue-light rounded-full flex items-center justify-center hover:bg-bakery-purple-light hover:text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-semibold text-bakery-purple">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-bakery-blue-light rounded-full flex items-center justify-center hover:bg-bakery-purple-light hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-bakery-purple font-poppins">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </div>
                        {item.products.discount && (
                          <div className="text-sm text-bakery-blue-muted line-through">
                            ${(item.products.price * item.quantity).toFixed(2)}
                          </div>
                        )}
                        <div className="text-sm text-bakery-blue-muted">
                          ${itemPrice.toFixed(2)} each
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-bakery-cream rounded-2xl p-8 sticky top-24 fade-in-up delay-300">
            <h2 className="text-2xl font-bold font-poppins text-bakery-purple mb-6">
              Order Summary
            </h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-bakery-blue-muted">Subtotal</span>
                <span className="font-semibold text-bakery-purple">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-bakery-blue-muted">Delivery Fee</span>
                <span className="font-semibold text-bakery-purple">
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-bakery-blue-muted">Tax</span>
                <span className="font-semibold text-bakery-purple">
                  ${tax.toFixed(2)}
                </span>
              </div>
              
              <div className="border-t border-bakery-blue-light/30 pt-4">
                <div className="flex justify-between">
                  <span className="text-xl font-bold text-bakery-purple">Total</span>
                  <span className="text-xl font-bold text-bakery-purple">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            
            {deliveryFee > 0 && (
              <div className="bg-bakery-rose/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-bakery-purple font-medium">
                  💡 Add ${(50 - subtotal).toFixed(2)} more for free delivery!
                </p>
              </div>
            )}
            
            <Button 
              onClick={handleCheckout}
              className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 mb-4 button-bounce"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              Proceed to Checkout
            </Button>
            
            <Button 
              onClick={() => onPageChange('home')}
              variant="outline"
              className="w-full border-bakery-purple text-bakery-purple hover:bg-bakery-purple hover:text-white"
            >
              Continue Shopping
            </Button>
            
            <div className="mt-6 space-y-3 text-sm text-bakery-blue-muted">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-4 h-4" />
                <span>Same-day delivery available</span>
              </div>
              <div className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span>Secure payment processing</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Information Modal/Section */}
      {showDeliveryInfo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            <div className="text-center mb-8">
              <div className="text-4xl mb-4">🚚</div>
              <h2 className="text-3xl font-bold font-poppins text-bakery-purple mb-4">
                Delivery Information
              </h2>
            </div>

            <div className="space-y-6">
              {/* Delivery Areas */}
              <div className="bg-bakery-cream rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6 text-bakery-purple" />
                  <h3 className="text-xl font-semibold text-bakery-purple">Delivery Areas</h3>
                </div>
                <p className="text-bakery-blue-muted mb-3">
                  We currently deliver to the following areas:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-bakery-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                    Gandhinagar
                  </span>
                  <span className="bg-bakery-purple text-white px-4 py-2 rounded-full text-sm font-medium">
                    Ahmedabad
                  </span>
                </div>
              </div>

              {/* Free Delivery Zone */}
              <div className="bg-bakery-rose/30 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Truck className="w-6 h-6 text-bakery-purple" />
                  <h3 className="text-xl font-semibold text-bakery-purple">Free Delivery Zone</h3>
                </div>
                <p className="text-bakery-blue-muted mb-3">
                  Enjoy FREE delivery in:
                </p>
                <div className="bg-green-100 border border-green-200 rounded-lg p-3">
                  <span className="text-green-700 font-semibold">📍 Raysan, Gandhinagar</span>
                </div>
              </div>

              {/* Order Confirmation */}
              <div className="bg-bakery-vanilla rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="w-6 h-6 text-bakery-purple" />
                  <h3 className="text-xl font-semibold text-bakery-purple">Order Confirmation</h3>
                </div>
                <p className="text-bakery-blue-muted mb-4">
                  To confirm your order and arrange delivery, please call us at:
                </p>
                <div className="bg-bakery-purple text-white rounded-lg p-4 text-center">
                  <a 
                    href="tel:+919714705616" 
                    className="text-2xl font-bold hover:underline"
                  >
                    +91 9714705616
                  </a>
                </div>
                <p className="text-sm text-bakery-blue-muted mt-3 text-center">
                  Our team will confirm your order details and delivery address
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button 
                onClick={() => setShowDeliveryInfo(false)}
                variant="outline"
                className="flex-1 border-bakery-purple text-bakery-purple hover:bg-bakery-purple hover:text-white"
              >
                Back to Cart
              </Button>
              <Button 
                onClick={() => window.open('tel:+919714705616')}
                className="flex-1 bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Information */}
      <div className="mt-16 bg-bakery-vanilla rounded-2xl p-8 fade-in-up">
        <h3 className="text-2xl font-bold font-poppins text-bakery-purple mb-6 text-center">
          Delivery Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">🚚</div>
            <h4 className="font-semibold text-bakery-purple mb-2">Fast Delivery</h4>
            <p className="text-bakery-blue-muted text-sm">
              Most orders delivered within 30-60 minutes
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">📦</div>
            <h4 className="font-semibold text-bakery-purple mb-2">Safe Packaging</h4>
            <p className="text-bakery-blue-muted text-sm">
              Temperature-controlled packaging keeps items fresh
            </p>
          </div>
          <div>
            <div className="text-3xl mb-2">💝</div>
            <h4 className="font-semibold text-bakery-purple mb-2">Gift Options</h4>
            <p className="text-bakery-blue-muted text-sm">
              Add gift wrapping and personalized messages
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cart;