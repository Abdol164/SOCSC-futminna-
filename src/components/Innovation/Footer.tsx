'use client'

import type React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { InnovationSectionProps } from '../../types/innovation'
import CountdownTimer from './Countdown'
import { Camera, Image as ImageIcon } from 'lucide-react'

// Sui Logo SVG (inline)
const SuiLogo: React.FC<{ size?: number; className?: string }> = ({
  size = 20,
  className = '',
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    width={size}
    height={size}
    className={className}
    fill="currentColor"
  >
    <path d="M128 0C57.31 0 0 57.31 0 128s57.31 128 128 128 128-57.31 128-128S198.69 0 128 0zm0 230.4c-56.61 0-102.4-45.79-102.4-102.4S71.39 25.6 128 25.6 230.4 71.39 230.4 128 184.61 230.4 128 230.4z"/>
    <path d="M102.4 166.4c-2.26 0-4.53-.86-6.25-2.57-3.43-3.43-3.43-9.07 0-12.5l51.2-51.2c3.43-3.43 9.07-3.43 12.5 0 3.43 3.43 3.43 9.07 0 12.5l-51.2 51.2c-1.72 1.72-3.98 2.57-6.25 2.57z"/>
  </svg>
)

// Event image with fallback
const EventImageWithFallback: React.FC<{
  src: string
  alt: string
  className?: string
}> = ({ src, alt, className = '' }) => {
  const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  if (imageError) {
    return (
      <div
        className={`bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center ${className}`}
      >
        <div className="text-6xl mb-4">🚀</div>
        <div className="text-gray-600 font-medium text-lg text-center">
          Hackfest 2025
        </div>
        <div className="text-gray-500 text-sm mt-2 text-center">
          Innovation & Collaboration
        </div>
        <div className="text-gray-400 text-xs mt-3">
          Event photo coming soon
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center rounded-2xl">
          <div className="text-4xl">🚀</div>
        </div>
      )}
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={`w-full h-full object-cover rounded-2xl transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  )
}

const InnovationSection: React.FC<InnovationSectionProps> = ({
  title = 'Ready to Innovate with Us?',
  eventName = 'Hackfest 2025',
  eventDate = new Date(Date.now() + 13 * 24 * 60 * 60 * 1000),
  eventDetails = 'Date, Time & Venue: TBA',
  registerText = 'Register for Hackfest 2025',
  viewPastText = 'View Past Events',
  eventImage = '/img/hackfest-event.jpg',
  onRegisterClick,
  onViewPastClick,
  className = '',
}) => {
  const handleRegisterClick = (): void => {
    if (onRegisterClick) {
      onRegisterClick()
    } else {
      console.log('Register clicked')
    }
  }

  const handleViewPastClick = (): void => {
    if (onViewPastClick) {
      onViewPastClick()
    } else {
      console.log('View past events clicked')
    }
  }

  return (
    <section className={`py-16 px-4 bg-slate-900 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl p-8 md:p-12">
          {/* Animated background waves */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 animate-gradient-slow"></div>
            <div className="absolute inset-0 opacity-50 animate-wave-slow bg-[url('/img/wave.svg')] bg-cover"></div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
            <div className="space-y-6">
              <div>
                <div className="text-white text-lg mb-2">Next Event:</div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  {eventName}
                </h3>
                <p className="text-white opacity-90 text-sm">{eventDetails}</p>
              </div>

              <CountdownTimer targetDate={typeof eventDate === 'string' ? new Date(eventDate) : eventDate} />

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                     <Link to="/contact">
                <button
    
                  onClick={handleRegisterClick}
                  className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
             
                    <SuiLogo size={20} className="text-sky-400" />
                    {registerText}
                 
                </button>
                 </Link>
                <button
                  onClick={handleViewPastClick}
                  className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
                >
                  <Camera size={20} />
                  {viewPastText}
                </button>
              </div>
            </div>

            <div className="order-first lg:order-last">
              <EventImageWithFallback
                src={eventImage}
                alt={`${eventName} event`}
                className="w-full h-64 md:h-80 lg:h-72 xl:h-80"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Tailwind custom animations */}
      <style jsx>{`
        @keyframes gradient-slow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-slow {
          background-size: 400% 400%;
          animation: gradient-slow 12s ease infinite;
        }

        @keyframes wave-slow {
          0% { transform: translateX(0); }
          50% { transform: translateX(-25px); }
          100% { transform: translateX(0); }
        }
        .animate-wave-slow {
          animation: wave-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

export default InnovationSection
