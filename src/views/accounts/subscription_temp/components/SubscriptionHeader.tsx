export type BillingCycle = "monthly" | "yearly"

export function SubscriptionHeader({
  billingCycle,
  setBillingCycle,
}: {
  billingCycle: BillingCycle
  setBillingCycle: (cycle: BillingCycle) => void
}) {
  return (
    <div className="text-center mb-12">
      <div className="flex justify-center mb-4">
        <div className="bg-blue-100 rounded-full w-[190px] h-[65px] flex items-center justify-center">
          <img
            src="/images/suimail-logo.png"
            alt="SUIMAIL"
            className="w-[150px] h-auto"
          />
        </div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Secure Email for the{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
          Web3 Era
        </span>
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Suimail provides blockchain-powered email with end-to-end encryption,
        decentralized storage, and crypto-native features. Choose the plan that
        works for you.
      </p>

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
  )
}
