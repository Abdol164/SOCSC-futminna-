'use client'

import type React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

interface TeamSpotlightProps {
  title?: string
  subtitle?: string
  specializedTeamsCount?: number
  className?: string
}

// Team data
const teams = [
  {
    id: 1,
    name: 'Team Sushi',
    image: '/img/team-sushi.jpg',
    emoji: '🍣',
  },
  {
    id: 2,
    name: 'Team Alpha',
    image: '/img/Team-Alpha.png',
    emoji: '🚀',
  },
]

const TeamImageWithFallback: React.FC<{
  src: string
  alt: string
  teamName: string
  emoji: string
  className?: string
}> = ({ src, alt, teamName, emoji, className = '' }) => {
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
        className={`bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center justify-center ${className}`}
      >
        <div className="text-6xl mb-4">{emoji}</div>
        <div className="text-gray-600 font-medium text-lg">{teamName}</div>
        <div className="text-gray-400 text-sm mt-2">Team photo coming soon</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-4xl">{emoji}</div>
        </div>
      )}
      <img
        src={src || '/placeholder.svg'}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </div>
  )
}

const TeamSection: React.FC<TeamSpotlightProps> = ({
  title = 'Team Spotlight',
  subtitle = 'Meet the Builders in the community',
  specializedTeamsCount = 12,
  className = '',
}) => {
  return (
    <section className={`py-16 px-4 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Left Team Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4">
              <TeamImageWithFallback
                src="/img/Payfrica.png"
                alt={teams[0].name}
                teamName={teams[0].name}
                emoji={teams[0].emoji}
                className="w-full h-full"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
                {teams[0].name} {teams[0].emoji}
              </h3>
            </div>
          </div>

          {/* Center Stats */}
          <div className="text-center">
            <div className="text-6xl md:text-7xl lg:text-8xl font-bold text-blue-500 mb-4">
              {specializedTeamsCount}
            </div>
            <div className="text-gray-600 text-lg mb-8">Specialized Teams</div>
            <Link
              to="/teams"
              className="inline-block bg-gray-900 text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors duration-200"
            >
              Explore Teams
            </Link>
          </div>

          {/* Right Team Card */}
          <div className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl mb-4">
              <TeamImageWithFallback
                src={teams[1].image}
                alt={teams[1].name}
                teamName={teams[1].name}
                emoji={teams[1].emoji}
                className="w-full h-full"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center justify-center gap-2">
                {teams[1].name} {teams[1].emoji}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeamSection
