import { ArrowRight } from "lucide-react"

export function FAQTeaser() {
  return (
    <div className="mt-16 text-center">
      <div className="inline-flex flex-col items-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Have questions?
        </h3>
        <p className="text-gray-600 mb-4">
          We're here to help you choose the right plan for your needs.
        </p>
        <a
          href="#faq"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
        >
          View FAQ
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
