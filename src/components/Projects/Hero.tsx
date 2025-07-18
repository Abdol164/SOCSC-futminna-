import React from 'react'

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-4">
      {/* Content */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold md:text-5xl">
          Building Solutions That <span className="text-white">Matter</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl">
          Explore projects created by SOCSC members
        </p>

        {/* Search Input */}
        <div className="mt-8">
          <input
            type="text"
            placeholder="🔍 Search"
            className="w-full max-w-md px-4 py-3 rounded-md text-gray-900 focus:outline-none"
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg
          viewBox="0 0 500 150"
          preserveAspectRatio="none"
          className="w-full h-[50px]"
        >
          <path
            d="M0.00,49.98 C150.00,150.00 349.95,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
            className="fill-white"
          />
        </svg>
      </div>
    </section>
  )
}

export default HeroSection
