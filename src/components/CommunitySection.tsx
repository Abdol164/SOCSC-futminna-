'use client'

import React from 'react'
import { Link } from 'react-router-dom'

const cards = [
  {
    title: 'Teams',
    desc: 'Link to sub-teams like Web Dev, AI, etc.',
    img: '/img/Teams.png',
    btn: 'Explore Teams',
    to: '/teams',
  },
  {
    title: 'Projects',
    desc: 'Showcase student work',
    img: '/img/Projects.png',
    btn: 'View Projects',
    to: '/projects',
  },
  {
    title: 'Events',
    desc: 'See Highlight of the next workshop/hackathon',
    img: '/img/Events.png',
    btn: 'Upcoming Events',
    to: '/events',
  },
  {
    title: 'About Us',
    desc: 'Learn about our club mission/leadership.',
    img: '/img/About.png',
    btn: 'Our Story',
    to: '/about',
  },
]

interface CommunitySectionProps {
  title?: string
  subtitle?: string
  className?: string
}

const CommunitySection: React.FC<CommunitySectionProps> = ({
  title = 'Explore Our Community',
  subtitle = 'Discover the different ways to get involved and grow with us',
  className = '',
}) => {
  return (
    <section
      className={`py-16 px-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map(card => (
            <div
              key={card.title}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full"
            >
              {/* Image as Background with Content Overlay */}
              <div
                className="h-64 w-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${card.img})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
              </div>

              {/* Content Container */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>

                <Link
                  to={card.to}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group/link"
                >
                  {card.btn}
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">
                    →
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
