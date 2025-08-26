import React from "react";

const Hero = () => {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white overflow-hidden">
      {/* Background and Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/Background.png"
          alt="Hero background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchpriority="high"
          width={1920}
          height={1080}
          decoding="async"
          style={{ backgroundColor: "#e0e7ef" }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <img
          src="/img/Purple-Overlay.png"
          alt="Overlay"
          className="absolute inset-0 w-full h-full object-cover z-10 pointer-events-none mix-blend-lighten"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Sui Logo (responsive) */}
      <div className="absolute z-30 flex items-center justify-center w-full h-full pointer-events-none">
        <img
          src="/img/Sui-Logo.png"
          alt="Sui Logo"
          className="opacity-40 drop-shadow-2xl
            hidden md:block
            md:w-[200px] md:h-[200px]
            lg:w-[450px] lg:h-[450px]
            xl:w-[490px] xl:h-[490px]
            absolute right-4 md:right-8 top-1/2 -translate-y-1/2"
        />
        <img
          src="/img/Sui-Logo.png"
          alt="Sui Logo"
          className="opacity-50 drop-shadow-lg w-12 h-12 md:hidden absolute bottom-6 right-4"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-4xl">
            {/* Tag */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center bg-white text-blue-600 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow">
                @SOSCSFutminna
              </span>
              <span className="inline-flex items-center bg-blue-500 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow">
                Powered by Sui on Campus
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6">
              Empowering FUT <br />
              <span className="text-blue-400 drop-shadow-lg">
                Minna&apos;s Tech Leaders
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-gray-100 max-w-2xl leading-relaxed mb-8">
              The official student club of the School of Computing, fostering
              innovation and collaboration.
              <span className="hidden sm:inline">
                {" "}
                Join us in building the future of technology at FUT Minna.
              </span>
            </p>

            {/* Actions */}
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
    </section>
  );
};

export default Hero;

