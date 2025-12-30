"use client";

import React, { useState } from "react";
import {
  Check,
  Star,
  Zap,
  Shield,
  Headphones,
  Server,
  Globe,
  Clock,
} from "lucide-react";

// نوع الـ color classes
type ColorClasses = {
  bg: string;
  text: string;
  border: string;
  button: string;
  gradient: string;
};

// نوع الـ Plan
type Plan = {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  price: {
    monthly: number;
    yearly: number;
  };
  popular: boolean;
  features: string[];
  color: string; 
};

// نوع الـ Feature
type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export default function WebHostingPlan() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState<string>("pro");

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter",
      description: "Perfect for personal websites and blogs",
      icon: <Globe className="w-6 h-6" />,
      price: {
        monthly: 4.99,
        yearly: 3.99,
      },
      popular: false,
      features: [
        "1 Website",
        "10 GB SSD Storage",
        "100 GB Bandwidth",
        "Free SSL Certificate",
        "Email Accounts (5)",
        "24/7 Support",
        "One-Click WordPress Install",
        "Free Domain for 1st Year",
      ],
      color: "blue",
    },
    {
      id: "pro",
      name: "Professional",
      description: "Best for growing businesses and portfolios",
      icon: <Zap className="w-6 h-6" />,
      price: {
        monthly: 9.99,
        yearly: 7.99,
      },
      popular: true,
      features: [
        "Unlimited Websites",
        "50 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Unlimited Email Accounts",
        "Priority 24/7 Support",
        "Free Website Builder",
        "Free Domain for 1st Year",
        "Daily Backups",
        "CDN Integration",
        "Advanced Security",
      ],
      color: "purple",
    },
    {
      id: "enterprise",
      name: "Enterprise",
      description: "For high-traffic websites and enterprises",
      icon: <Server className="w-6 h-6" />,
      price: {
        monthly: 19.99,
        yearly: 15.99,
      },
      popular: false,
      features: [
        "Unlimited Websites",
        "200 GB SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "Unlimited Email Accounts",
        "Dedicated 24/7 Support",
        "Free Website Builder",
        "Free Domain for 1st Year",
        "Daily Backups",
        "Premium CDN",
        "Advanced Security Suite",
        "Staging Environment",
        "Priority Server Resources",
      ],
      color: "green",
    },
  ];

  const features: Feature[] = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "99.9% Uptime Guarantee",
      description:
        "We ensure your website stays online with our reliable infrastructure",
    },
    {
      icon: <Zap className="w-8 h-8 text-purple-600" />,
      title: "Lightning Fast Speed",
      description: "SSD storage and optimized servers for maximum performance",
    },
    {
      icon: <Headphones className="w-8 h-8 text-green-600" />,
      title: "24/7 Expert Support",
      description:
        "Get help anytime from our knowledgeable support team",
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-600" />,
      title: "30-Day Money Back",
      description: "Not satisfied? Get your money back within 30 days",
    },
  ];

  const getColorClasses = (
    color: string,
    isSelected: boolean = false
  ): ColorClasses => {
    const colors: Record<"blue" | "purple" | "green", ColorClasses> = {
      blue: {
        bg: isSelected ? "bg-blue-600" : "bg-blue-50",
        text: isSelected ? "text-white" : "text-blue-600",
        border: "border-blue-200",
        button: "bg-blue-600 hover:bg-blue-700",
        gradient: "from-blue-500 to-blue-600",
      },
      purple: {
        bg: isSelected ? "bg-purple-600" : "bg-purple-50",
        text: isSelected ? "text-white" : "text-purple-600",
        border: "border-purple-200",
        button: "bg-purple-600 hover:bg-purple-700",
        gradient: "from-purple-500 to-purple-600",
      },
      green: {
        bg: isSelected ? "bg-green-600" : "bg-green-50",
        text: isSelected ? "text-white" : "text-green-600",
        border: "border-green-200",
        button: "bg-green-600 hover:bg-green-700",
        gradient: "from-green-500 to-green-600",
      },
    };

    return colors[color as "blue" | "purple" | "green"];
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
           <h2 className='text-center my-5 text-3xl font-bold'> Choose Your Web Hosting Plan</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Choose Your Perfect 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Hosting Plan</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Reliable, fast, and secure web hosting solutions for websites of all sizes. 
            Start your online journey with confidence.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`font-medium ${billingCycle === 'monthly' ? 'text-blue-600' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className="relative inline-flex h-8 w-14 items-center rounded-full bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`font-medium ${billingCycle === 'yearly' ? 'text-blue-600' : 'text-gray-500'}`}>
              Yearly
            </span>
            {billingCycle === 'yearly' && (
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                Save 20%
              </span>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const colorClasses = getColorClasses(plan.color, selectedPlan === plan.id);
            const isSelected = selectedPlan === plan.id;
            
            return (
              <div
                key={plan.id}
                className={`relative bg-white rounded-2xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer ${
                  plan.popular ? 'border-purple-300 ring-4 ring-purple-100' : 'border-gray-200'
                } ${isSelected ? 'ring-4 ring-blue-100' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center space-x-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Plan Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colorClasses.bg} mb-4`}>
                      <div className={colorClasses.text}>
                        {plan.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-4xl font-bold text-gray-900">
                          ${plan.price[billingCycle]}
                        </span>
                        <span className="text-gray-600 ml-2">/month</span>
                      </div>
                      {billingCycle === 'yearly' && (
                        <p className="text-sm text-green-600 mt-2">
                          Save ${((plan.price.monthly - plan.price.yearly) * 12).toFixed(2)} per year
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <button className={`w-full text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl ${colorClasses.button}`}>
                      {isSelected ? 'Selected Plan' : 'Choose This Plan'}
                    </button>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-gray-900 mb-4">Everything included:</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Hosting?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ or Additional Info */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-blue-100 mb-6">
            Our hosting experts are here to help you find the perfect plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200">
              Chat with Expert
            </button>
            <button className="border-2 border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
              Compare All Plans
            </button>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-8">Trusted by over 50,000+ websites worldwide</p>
          <div className="flex justify-center items-center space-x-8 opacity-60">
            <div className="text-2xl font-bold text-gray-400">React</div>
            <div className="text-2xl font-bold text-gray-400">Next</div>
            <div className="text-2xl font-bold text-gray-400">JavaScript</div>
            <div className="text-2xl font-bold text-gray-400">Css</div>
          </div>
        </div>
      </div>
    </div>
  );
}