import React from 'react'

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] text-white overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/img/Background.png"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
        <img
          src="/img/Purple-Overlay.png"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-lighten"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 md:bg-opacity-30" />
      </div>

     

      {/* Desktop Sui Logo */}
      <div className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:block">
        <img
          src="/img/Sui-Logo.png"
          alt="Sui Logo"
          className="w-[450px] h-[450px] xl:w-[490px] xl:h-[490px] drop-shadow-2xl opacity-50"
        />
      </div>

      {/* Tablet Sui Logo */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2 z-30 hidden md:block lg:hidden">
        <img
          src="/img/Sui-Logo.png"
          alt="Sui Logo"
          className="w-[200px] h-[200px] drop-shadow-xl opacity-40"
        />
      </div>

      <div className="relative z-20 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl">
            {/* Tags */}
            <div className="mb-6 space-y-2 sm:space-y-0 sm:space-x-3 sm:flex sm:items-center">
              <span className="inline-block bg-blue-500 px-3 py-1.5 mr-3   rounded-full text-xs sm:text-sm font-medium">
                <span className="inline-block bg-white text-blue-600  py-1.5 px-3 rounded-full text-xs sm:text-sm font-medium">
                  @SOSCSFutminna
                </span>
                &nbsp; Powered by Sui on Campus
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Empowering FUT <br />
              <span className="text-blue-400 drop-shadow-lg">
                Minna's Tech Leaders
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed mb-8">
              The official student club of the School of Computing, fostering
              innovation and collaboration.
              <span className="hidden sm:inline">
                {' '}
                Join us in building the future of technology at FUT Minna.
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 text-sm sm:text-base shadow-lg">
                Register for Hackfest 2025
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg transition-all duration-200 text-sm sm:text-base font-semibold shadow-lg hover:scale-105">
                Join Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sui Logo */}
      <div className="absolute bottom-6 right-4 z-30 md:hidden">
        <img
          src="/img/Sui-Logo.png"
          alt="Sui Logo"
          className="w-12 h-12 drop-shadow-lg opacity-50"
        />
      </div>
    </div>
  )
}

export default Hero
