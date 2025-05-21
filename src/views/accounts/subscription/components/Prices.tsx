import { useState } from "react"
import { Mail, Zap, Crown } from "lucide-react"
import { Benefits } from "./Benefits"
import { PricingCard } from "./PricingCard"
import type { IPlan } from "@/types/generic"
import { SubscriptionHeader, type BillingCycle } from "./SubscriptionHeader"

export default function SubscriptionPlans() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")

  const plans: IPlan[] = [
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
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"
            fill="#3B82F6"
          />
        </svg>
      </div>
      <div className="absolute bottom-20 right-10 opacity-20 hidden lg:block">
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM9.71 19.667C8.72341 17.5743 8.15187 15.3102 8.027 13H4.062C4.25659 14.5389 4.89392 15.9882 5.89657 17.1717C6.89922 18.3553 8.22401 19.2229 9.71 19.667ZM10.03 13C10.181 15.439 10.878 17.73 12 19.752C13.1523 17.6757 13.8254 15.3637 13.97 13H10.03ZM19.938 13H15.973C15.8481 15.3102 15.2766 17.5743 14.29 19.667C15.776 19.2229 17.1008 18.3553 18.1034 17.1717C19.1061 15.9882 19.7434 14.5389 19.938 13ZM4.062 11H8.027C8.15187 8.68979 8.72341 6.42569 9.71 4.333C8.22401 4.77706 6.89922 5.64468 5.89657 6.82825C4.89392 8.01183 4.25659 9.4611 4.062 11ZM10.031 11H13.969C13.8248 8.6366 13.1517 6.32454 12 4.248C10.8477 6.32426 10.1746 8.63632 10.03 11H10.031ZM14.29 4.333C15.2766 6.42569 15.8481 8.68979 15.973 11H19.938C19.7434 9.4611 19.1061 8.01183 18.1034 6.82825C17.1008 5.64468 15.776 4.77706 14.29 4.333Z"
            fill="#3B82F6"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SubscriptionHeader
          billingCycle={billingCycle}
          setBillingCycle={setBillingCycle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 px-10 lg:px-0">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>

        <Benefits />
        {/* <FAQTeaser /> */}
      </div>
    </div>
  )
}
