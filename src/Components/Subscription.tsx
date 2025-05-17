const Subscription = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-[#333333] text-center mb-8">
        Choose Your Plan
      </h1>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {/* Basic Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-[#0F3460] text-center">
            Basic Plan
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            1GB storage, limited features.
          </p>
          <p className="text-xl font-bold text-center mt-4">$5/month</p>
          <p className="text-sm text-gray-500 text-center">
            $50/year (Save 17%)
          </p>
          <ul className="mt-4 space-y-2">
            <li>✔ 1GB Storage</li>
            <li>✔ Basic Email Features</li>
            <li>✔ Community Support</li>
          </ul>
          <button
            style={{
              background: "linear-gradient(to bottom, #006bf9, #00c1fa)",
            }}
            className="mt-6 w-full bg-[#0F3460] text-white py-2 rounded-lg font-semibold hover:bg-[#16213E] transition duration-300"
          >
            Start Free Trial
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-[#0F3460] text-center">
            Pro Plan
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            10GB storage, advanced features, priority support.
          </p>
          <p className="text-xl font-bold text-center mt-4">$15/month</p>
          <p className="text-sm text-gray-500 text-center">
            $150/year (Save 17%)
          </p>
          <ul className="mt-4 space-y-2">
            <li>✔ 10GB Storage</li>
            <li>✔ Advanced Email Features</li>
            <li>✔ Priority Support</li>
          </ul>
          <button
            style={{
              background: "linear-gradient(to bottom, #006bf9, #00c1fa)",
            }}
            className="mt-6 w-full bg-[#0F3460] text-white py-2 rounded-lg font-semibold hover:bg-[#16213E] transition duration-300"
          >
            Upgrade Now
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm">
          <h2 className="text-2xl font-semibold text-[#0F3460] text-center">
            Enterprise Plan
          </h2>
          <p className="text-gray-600 mt-4 text-center">
            Custom features and pricing for large organizations.
          </p>
          <p className="text-xl font-bold text-center mt-4">Contact Us</p>
          <ul className="mt-4 space-y-2">
            <li>✔ Unlimited Storage</li>
            <li>✔ Custom Features</li>
            <li>✔ Dedicated Support</li>
          </ul>
          <button
            style={{
              background: "linear-gradient(to bottom, #006bf9, #00c1fa)",
            }}
            className="mt-6 w-full text-white py-2 rounded-lg font-semibold hover:bg-[#16213E] transition duration-300"
          >
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}

export default Subscription
