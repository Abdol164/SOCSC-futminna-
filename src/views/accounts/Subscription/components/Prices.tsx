"use client"

import { useState } from "react"
import { Check, Mail, Shield, Zap, Crown, ArrowRight, Clock, Star } from "lucide-react"

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")

  const plans = [
    {
      name: "Basic",
      description: "Perfect for personal use",
      monthlyPrice: "0.1 SUI",
      yearlyPrice: "0.5 SUI",
      yearlyDiscount: "Save 17%",
      features: [
        "5GB Encrypted Storage",
        "Send up to 100 emails/day",
        "Max attachment size: 10MB",
        "Basic spam protection",
        "Access to Suimail mobile app",
        "Community support",
      ],
      highlighted: false,
      ctaText: "Get Started",
      icon: Mail,
      color: "blue",
    },
    {
      name: "Pro",
      description: "For professionals and creators",
      monthlyPrice: "0.5 SUI",
      yearlyPrice: "5 SUI",
      yearlyDiscount: "Save 17%",
      features: [
        "25GB Encrypted Storage",
        "Unlimited emails/day",
        "Max attachment size: 50MB",
        "Advanced spam & phishing protection",
        "Custom @suimail.id domain",
        "Priority support",
        "End-to-end encryption",
        "Schedule emails",
      ],
      highlighted: true,
      ctaText: "Upgrade Now",
      icon: Zap,
      color: "blue",
    },
    {
      name: "Enterprise",
      description: "For teams and businesses",
      monthlyPrice: "5 SUI",
      yearlyPrice: "10 SUI",
      yearlyDiscount: "Save 17%",
      features: [
        "100GB Encrypted Storage",
        "Unlimited emails/day",
        "Max attachment size: 1GB",
        "Enterprise-grade security",
        "Custom domain support",
        "Dedicated account manager",
        "End-to-end encryption",
        "Advanced analytics",
        "Team collaboration tools",
        "API access",
      ],
      highlighted: false,
      ctaText: "Contact Sales",
      icon: Crown,
      color: "blue",
    },
  ]

  return (
    <div className="relative py-16 overflow-hidden bg-white">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white" />
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-blue-500 rounded-full filter blur-3xl" />
      </div>

      {/* Email illustrations */}
      <div className="absolute top-20 left-10 opacity-20 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
            fill="#3B82F6"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 hidden lg:block">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM9.71 19.667C8.72341 17.5743 8.15187 15.3102 8.027 13H4.062C4.25659 14.5389 4.89392 15.9882 5.89657 17.1717C6.89922 18.3553 8.22401 19.2229 9.71 19.667ZM10.03 13C10.181 15.439 10.878 17.73 12 19.752C13.1523 17.6757 13.8254 15.3637 13.97 13H10.03ZM19.938 13H15.973C15.8481 15.3102 15.2766 17.5743 14.29 19.667C15.776 19.2229 17.1008 18.3553 18.1034 17.1717C19.1061 15.9882 19.7434 14.5389 19.938 13ZM4.062 11H8.027C8.15187 8.68979 8.72341 6.42569 9.71 4.333C8.22401 4.77706 6.89922 5.64468 5.89657 6.82825C4.89392 8.01183 4.25659 9.4611 4.062 11ZM10.031 11H13.969C13.8248 8.6366 13.1517 6.32454 12 4.248C10.8477 6.32426 10.1746 8.63632 10.03 11H10.031ZM14.29 4.333C15.2766 6.42569 15.8481 8.68979 15.973 11H19.938C19.7434 9.4611 19.1061 8.01183 18.1034 6.82825C17.1008 5.64468 15.776 4.77706 14.29 4.333Z"
            fill="#3B82F6"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
            <img
            src="/images/suimail-logo.png"
            alt="SUIMAIL"
            className="w-[150px] h-auto"
          />
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Secure Email for the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">Web3 Era</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Suimail provides blockchain-powered email with end-to-end encryption, decentralized storage, and
            crypto-native features. Choose the plan that works for you.
          </p>

          {/* Billing toggle */}
          <div className="mt-8 inline-flex items-center p-1 bg-blue-50 rounded-lg border border-blue-100">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                  : "text-blue-600 hover:text-blue-700"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
                plan.highlighted
                  ? "ring-2 ring-blue-500 shadow-lg shadow-blue-200 scale-105 md:scale-105 z-10"
                  : "bg-white border border-blue-100 hover:border-blue-200 hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <>
                  <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600" />
                  <div className="absolute top-3 right-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Popular
                    </span>
                  </div>
                </>
              )}

              <div className={`p-8 ${plan.highlighted ? "bg-white" : ""}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-500 mt-1 text-sm">{plan.description}</p>
                  </div>
                  <div
                    className={`h-12 w-12 rounded-full ${
                      plan.highlighted ? "bg-blue-100" : "bg-blue-50"
                    } flex items-center justify-center`}
                  >
                    <plan.icon className={`h-6 w-6 ${plan.highlighted ? "text-blue-600" : "text-blue-500"}`} />
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold text-gray-900">
                      {billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice}
                    </span>
                    <span className="ml-2 text-gray-500">/{billingCycle === "monthly" ? "month" : "year"}</span>
                  </div>
                  {billingCycle === "yearly" && (
                    <p className="mt-1 text-sm text-blue-600 font-medium">{plan.yearlyDiscount}</p>
                  )}
                </div>

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div
                        className={`flex-shrink-0 h-5 w-5 rounded-full ${
                          plan.highlighted ? "bg-blue-500" : "bg-blue-400"
                        } flex items-center justify-center mt-0.5`}
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <span className="ml-3 text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <button
                    className={`w-full py-3 px-4 rounded-xl flex items-center justify-center font-medium transition-all ${
                      plan.highlighted
                        ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-200"
                        : "bg-blue-50 text-blue-600 hover:bg-blue-100"
                    }`}
                  >
                    {plan.ctaText}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Blockchain Security</h3>
            <p className="text-gray-600 text-sm">
              Your emails are secured by Sui blockchain technology, ensuring privacy and protection from censorship.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Always Available</h3>
            <p className="text-gray-600 text-sm">
              Decentralized infrastructure means your email is always accessible, with no single point of failure.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
            <div className="bg-blue-50 p-3 rounded-full mb-4">
              <Star className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Web3 Native</h3>
            <p className="text-gray-600 text-sm">
              Send crypto, NFTs, and smart contracts directly through email. Integrate with your favorite Web3 apps.
            </p>
          </div>
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Have questions?</h3>
            <p className="text-gray-600 mb-4">We're here to help you choose the right plan for your needs.</p>
            <a href="#faq" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
              View FAQ
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
