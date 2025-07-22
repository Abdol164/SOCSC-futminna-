'use client'

import type React from 'react'
import { useState } from 'react'
import type { InnovationSectionProps } from '../../types/innovation'
import CountdownTimer from './Countdown'

// added fallback iages while image loaded
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
  eventDate = new Date(Date.now() + 13 * 24 * 60 * 60 * 1000), // 15 days from now
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
        {/*  Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
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
                <button
                  onClick={handleRegisterClick}
                  className="bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>🎯</span>
                  {registerText}
                </button>
                <button
                  onClick={handleViewPastClick}
                  className="bg-white bg-opacity-20 text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-30 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <span>📅</span>
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
    </section>
  )
}

export default InnovationSection
