'use client'

import type React from 'react'

interface TeamsHeroProps {
  title?: string
  subtitle?: string
  description?: string
  className?: string
  backgroundImageUrl?: string
}

const TeamsHero: React.FC<TeamsHeroProps> = ({
  title = 'Meet the teams behind SOCSC Futminna',
  subtitle = 'Our Teams & Developers',
  description = 'Collaborate with a vast ecosystem of builders. Each team is on a big mission. Learn more about our teams and their specialization of our builders.',
}) => {
  return (
    <section className="relative min-h-[250px] md:min-h-[350px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 h-full">
        <img
          src="/img/Meet.png"
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

      {/* Content */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block text-white/80 text-sm font-semibold uppercase tracking-wider">
              {subtitle}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            {title}
          </h1>

          <div className="max-w-4xl mx-auto">
            <p className="text-white/80 text-lg sm:text-xl lg:text-2xl leading-relaxed font-light">
              {description}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            fillOpacity="1"
          />
        </svg>
      </div>
    </section>
  )
}

export default TeamsHero
