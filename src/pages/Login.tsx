import React, { useState } from 'react';
import { User, Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = () => {
    if (!loginForm.email || !loginForm.password) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!loginForm.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    alert('Welcome back! You have been successfully logged in.');
    setLoginForm({ email: '', password: '' });
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!signupForm.email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }
    
    if (signupForm.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    alert('Account created successfully! Welcome to Bakeotopia!');
    setSignupForm({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const benefits = [
    {
      icon: '🎂',
      title: 'Exclusive Offers',
      description: 'Get special discounts and early access to new products'
    },
    {
      icon: '📅',
      title: 'Easy Ordering',
      description: 'Save your favorite items and reorder with one click'
    },
    {
      icon: '🚚',
      title: 'Order Tracking',
      description: 'Track your orders from bakery to your doorstep'
    },
    {
      icon: '⭐',
      title: 'Loyalty Rewards',
      description: 'Earn points with every purchase and redeem for treats'
    }
  ];

  return (
    <main className="min-h-screen bg-bakery-green-light py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 fade-in-up">
            <h1 className="text-4xl font-bold font-poppins text-bakery-purple mb-4">
              {isLogin ? 'Welcome Back!' : 'Join Bakeotopia'}
            </h1>
            <p className="text-xl text-bakery-blue-muted">
              {isLogin 
                ? 'Sign in to your account to access exclusive offers and track your orders'
                : 'Create your account and become part of our sweet community'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Benefits Section */}
            <div className="space-y-8 fade-in-up delay-200">
              <div>
                <h2 className="text-3xl font-bold font-poppins text-bakery-purple mb-6">
                  Why Join Bakeotopia?
                </h2>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div 
                      key={benefit.title}
                      className={`flex items-start space-x-4 fade-in-up delay-${300 + (index * 100)}`}
                    >
                      <div className="text-3xl">{benefit.icon}</div>
                      <div>
                        <h3 className="text-xl font-semibold text-bakery-purple mb-2">
                          {benefit.title}
                        </h3>
                        <p className="text-bakery-blue-muted">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-bakery-cream rounded-2xl p-8">
                <h3 className="text-2xl font-bold font-poppins text-bakery-purple mb-4">
                  🎉 New Member Bonus
                </h3>
                <p className="text-bakery-blue-muted mb-4">
                  Sign up today and get 20% off your first order plus free delivery!
                </p>
                <div className="text-sm text-bakery-purple font-medium">
                  Use code: WELCOME20
                </div>
              </div>
            </div>

            {/* Forms Section */}
            <div className="bg-white rounded-3xl shadow-card overflow-hidden fade-in-up delay-400">
              {/* Tab Headers */}
              <div className="flex bg-bakery-green-soft">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                    isLogin 
                      ? 'bg-white text-bakery-purple border-b-2 border-bakery-purple' 
                      : 'text-bakery-blue-muted hover:text-bakery-purple'
                  }`}
                >
                  <LogIn className="w-5 h-5 inline mr-2" />
                  Sign In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-4 px-6 font-semibold transition-colors ${
                    !isLogin 
                      ? 'bg-white text-bakery-purple border-b-2 border-bakery-purple' 
                      : 'text-bakery-blue-muted hover:text-bakery-purple'
                  }`}
                >
                  <UserPlus className="w-5 h-5 inline mr-2" />
                  Sign Up
                </button>
              </div>

              {/* Form Content */}
              <div className="p-8">
                {isLogin ? (
                  /* Login Form */
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          placeholder="your.email@example.com"
                          className="pl-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          placeholder="Enter your password"
                          className="pl-12 pr-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted hover:text-bakery-purple"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="remember"
                          className="w-4 h-4 text-bakery-purple bg-bakery-green-soft border-bakery-blue-light rounded focus:ring-bakery-purple"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-bakery-blue-muted">
                          Remember me
                        </label>
                      </div>
                      <button className="text-sm text-bakery-purple hover:text-bakery-purple-light underline">
                        Forgot Password?
                      </button>
                    </div>

                    <Button 
                      onClick={handleLogin}
                      className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 button-bounce"
                    >
                      <LogIn className="w-5 h-5 mr-2" />
                      Sign In
                    </Button>
                  </div>
                ) : (
                  /* Signup Form */
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type="text"
                          name="name"
                          value={signupForm.name}
                          onChange={handleSignupChange}
                          placeholder="Enter your full name"
                          className="pl-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type="email"
                          name="email"
                          value={signupForm.email}
                          onChange={handleSignupChange}
                          placeholder="your.email@example.com"
                          className="pl-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          name="password"
                          value={signupForm.password}
                          onChange={handleSignupChange}
                          placeholder="Create a password (min. 6 characters)"
                          className="pl-12 pr-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted hover:text-bakery-purple"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-bakery-purple mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted w-5 h-5" />
                        <Input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={signupForm.confirmPassword}
                          onChange={handleSignupChange}
                          placeholder="Confirm your password"
                          className="pl-12 pr-12 bg-bakery-green-soft border-bakery-blue-light focus:border-bakery-purple"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-bakery-blue-muted hover:text-bakery-purple"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <input
                        type="checkbox"
                        id="terms"
                        className="w-4 h-4 text-bakery-purple bg-bakery-green-soft border-bakery-blue-light rounded focus:ring-bakery-purple mt-1"
                        required
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-bakery-blue-muted">
                        I agree to the{' '}
                        <button className="text-bakery-purple hover:text-bakery-purple-light underline">
                          Terms of Service
                        </button>{' '}
                        and{' '}
                        <button className="text-bakery-purple hover:text-bakery-purple-light underline">
                          Privacy Policy
                        </button>
                      </label>
                    </div>

                    <Button 
                      onClick={handleSignup}
                      className="w-full bg-bakery-purple hover:bg-bakery-purple-light text-white font-semibold py-4 button-bounce"
                    >
                      <UserPlus className="w-5 h-5 mr-2" />
                      Create Account
                    </Button>
                  </div>
                )}

                {/* Social Login */}
                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-bakery-blue-light/30"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-bakery-blue-muted">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-bakery-blue-light text-bakery-blue-muted hover:bg-bakery-blue-light hover:text-bakery-purple"
                    >
                      <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border-bakery-blue-light text-bakery-blue-muted hover:bg-bakery-blue-light hover:text-bakery-purple"
                    >
                      <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="container mx-auto px-4 mt-16">
        <div className="bg-white rounded-2xl p-8 text-center fade-in-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl mb-2">🔒</div>
              <h3 className="font-semibold text-bakery-purple mb-2">Secure & Private</h3>
              <p className="text-bakery-blue-muted text-sm">Your data is protected with industry-standard encryption</p>
            </div>
            <div>
              <div className="text-3xl mb-2">🍰</div>
              <h3 className="font-semibold text-bakery-purple mb-2">Member Benefits</h3>
              <p className="text-bakery-blue-muted text-sm">Exclusive discounts and early access to new products</p>
            </div>
            <div>
              <div className="text-3xl mb-2">💬</div>
              <h3 className="font-semibold text-bakery-purple mb-2">24/7 Support</h3>
              <p className="text-bakery-blue-muted text-sm">Our friendly team is here to help whenever you need us</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;