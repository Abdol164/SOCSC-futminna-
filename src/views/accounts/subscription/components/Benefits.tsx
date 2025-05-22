import { Star } from "lucide-react"

import { Clock, Shield } from "lucide-react"

export function Benefits() {
  return (
    <div className="mt-20 grid grid-cols-1 xl:grid-cols-3 gap-8">
      <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
        <div className="bg-blue-50 p-3 rounded-full mb-4">
          <Shield className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Blockchain Security
        </h3>
        <p className="text-gray-600 text-sm">
          Your emails are secured by Sui blockchain technology, ensuring privacy
          and protection from censorship.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
        <div className="bg-blue-50 p-3 rounded-full mb-4">
          <Clock className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Always Available
        </h3>
        <p className="text-gray-600 text-sm">
          Decentralized infrastructure means your email is always accessible,
          with no single point of failure.
        </p>
      </div>

      <div className="bg-white p-6 rounded-xl border border-blue-100 flex flex-col items-center text-center">
        <div className="bg-blue-50 p-3 rounded-full mb-4">
          <Star className="h-6 w-6 text-blue-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Web3 Native
        </h3>
        <p className="text-gray-600 text-sm">
          Send crypto, NFTs, and smart contracts directly through email.
          Integrate with your favorite Web3 apps.
        </p>
      </div>
    </div>
  )
}
