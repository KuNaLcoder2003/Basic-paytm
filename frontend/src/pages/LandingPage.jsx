import React from 'react';
import { CreditCard, Send, Shield, Smartphone, Clock, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation */}
      <nav className="w-full flex items-center justify-between p-6">
        <div className="flex items-center">
          <CreditCard className="h-8 w-8 text-purple-600" />
          <span className="ml-2 text-xl font-bold text-gray-800">PaySwift</span>
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="text-gray-600 hover:text-purple-600">Features</a>
          <a href="#pricing" className="text-gray-600 hover:text-purple-600">Pricing</a>
          <a href="#contact" className="text-gray-600 hover:text-purple-600">Contact</a>
        </div>
        <div className="flex space-x-4">
          <button onClick={()=>navigate('/signin')} className="px-4 py-2 text-purple-600 hover:text-purple-700">Login</button>
          <button onClick={()=>navigate('/signup')} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col justify-center items-center px-6">
        <div className="max-w-6xl w-full mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
            Send Money Instantly
            <span className="text-purple-600"> Anywhere</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Transfer money globally with zero fees. Fast, secure, and convenient payments
            at your fingertips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center justify-center">
              Get Started <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="px-8 py-4 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full bg-white py-24" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose PaySwift?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <FeatureCard 
              icon={<Send className="h-12 w-12 text-purple-600" />}
              title="Instant Transfers"
              description="Send money instantly to anyone, anywhere in the world with just a few taps."
            />
            <FeatureCard 
              icon={<Shield className="h-12 w-12 text-purple-600" />}
              title="Secure Payments"
              description="Bank-level encryption and fraud protection to keep your money safe."
            />
            <FeatureCard 
              icon={<Smartphone className="h-12 w-12 text-purple-600" />}
              title="Mobile First"
              description="Manage your money on the go with our user-friendly mobile app."
            />
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="w-full bg-purple-50 py-24" id="pricing">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Simple, Transparent Pricing
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard 
              title="Basic"
              price="Free"
              features={[
                "Up to $1,000 monthly transfer",
                "Basic support",
                "Mobile app access"
              ]}
            />
            <PricingCard 
              title="Pro"
              price="$9.99"
              features={[
                "Up to $10,000 monthly transfer",
                "Priority support",
                "Advanced analytics"
              ]}
              highlighted={true}
            />
            <PricingCard 
              title="Business"
              price="$29.99"
              features={[
                "Unlimited transfers",
                "24/7 support",
                "Custom solutions"
              ]}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <CreditCard className="h-8 w-8 text-purple-400" />
                <span className="ml-2 text-xl font-bold">PaySwift</span>
              </div>
              <p className="text-gray-400">
                Making global payments simple and secure for everyone.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400">Careers</a></li>
                <li><a href="#" className="hover:text-purple-400">Press</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400">Blog</a></li>
                <li><a href="#" className="hover:text-purple-400">Help Center</a></li>
                <li><a href="#" className="hover:text-purple-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400">Privacy</a></li>
                <li><a href="#" className="hover:text-purple-400">Terms</a></li>
                <li><a href="#" className="hover:text-purple-400">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 PaySwift. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

// Pricing Card Component
const PricingCard = ({ title, price, features, highlighted = false }) => {
  return (
    <div className={`rounded-lg p-8 ${
      highlighted 
        ? 'bg-purple-600 text-white transform scale-105' 
        : 'bg-white text-gray-900'
    }`}>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-sm">/month</span>}
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg ${
        highlighted
          ? 'bg-white text-purple-600 hover:bg-gray-100'
          : 'bg-purple-600 text-white hover:bg-purple-700'
      }`}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;