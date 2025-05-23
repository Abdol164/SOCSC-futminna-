export function ContactSupport() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mt-8 text-white">
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-y-5">
        <div>
          <h3 className="text-xl font-semibold mb-1">Still need help?</h3>
          <p className="text-blue-100">
            Our support team is here to assist you with any questions.
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors whitespace-nowrap">
            Contact Support
          </button>
          {/* <button className="border border-blue-400 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors flex items-center space-x-2">
            <ExternalLink className="w-4 h-4" />
            <span>Documentation</span>
          </button> */}
        </div>
      </div>
    </div>
  )
}
