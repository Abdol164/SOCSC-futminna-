import { Check } from "lucide-react"
import { ArrowRight } from "lucide-react"
import type { BillingCycle } from "./SubscriptionHeader"
import type { IPlan } from "@/types/generic"

export function PricingCard({
  plan,
  billingCycle,
}: {
  plan: IPlan
  billingCycle: BillingCycle
}) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:translate-y-[-4px] ${
        plan.highlighted
          ? "ring-2 ring-blue-500 shadow-lg shadow-blue-200 scale-105 md:scale-105 z-10"
          : "bg-white border border-blue-100 hover:border-blue-200 hover:shadow-md"
      }`}
    >
      <div className="h-full p-8 bg-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="text-gray-500 mt-1 text-sm">{plan.description}</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
            <plan.icon className={`h-6 w-6 text-blue-500`} />
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-gray-900">
              {billingCycle === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice}
            </span>
            <span className="ml-2 text-gray-500">
              /{billingCycle === "monthly" ? "month" : "year"}
            </span>
          </div>
          {billingCycle === "yearly" && (
            <p className="mt-1 text-sm text-blue-600 font-medium">
              {plan.yearlyDiscount}
            </p>
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
  )
}
