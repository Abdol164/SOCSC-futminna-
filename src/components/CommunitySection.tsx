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
      className={`py-16 px-4 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 ${className}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Local CSS for the shiny effect and animation */}
        <style>{`
          /* Shiny light element */
          .card-shiny {
            position: absolute;
            top: -8%;
            right: -6%;
            width: 140px;
            height: 140px;
            border-radius: 9999px;
            background: radial-gradient(circle at 30% 30%, rgba(99,102,241,0.30), rgba(139,92,246,0.22) 30%, rgba(99,102,241,0.08) 48%, transparent 60%);
            mix-blend-mode: screen;
            filter: blur(26px);
            transform: translate(25%, -25%);
            z-index: 10;
            pointer-events: none;
            animation: float 5s ease-in-out infinite, shimmer 3.6s ease-in-out infinite;
            transition: transform 300ms cubic-bezier(.2,.9,.2,1), opacity 300ms ease;
            opacity: 0.95;
          }

          /* Pause the float animation on hover and make the shine pop */
          .card:hover .card-shiny,
          .card:focus-within .card-shiny,
          .group:hover .card-shiny {
            animation-play-state: paused; /* give the hover transform control */
            transform: translate(0%, -40%) scale(1.25) rotate(-6deg);
            opacity: 1;
          }

          /* Subtle vertical/horizontal movement */
          @keyframes float {
            0% { transform: translate(25%, -25%) rotate(-10deg) scale(0.98); }
            50% { transform: translate(18%, -32%) rotate(-6deg) scale(1.05); }
            100% { transform: translate(25%, -25%) rotate(-10deg) scale(0.98); }
          }

          /* Opacity + blur shimmer */
          @keyframes shimmer {
            0% { opacity: 0.7; filter: blur(28px); }
            50% { opacity: 1; filter: blur(16px); }
            100% { opacity: 0.7; filter: blur(28px); }
          }

          /* Make sure card content sits above the shine when needed */
          .card .card-shiny { z-index: 10; }
          .card .card-image-overlay { z-index: 5; }

          /* Small media tweaks */
          @media (max-width: 640px) {
            .card-shiny { width: 92px; height: 92px; top: -12%; right: -10%; filter: blur(20px); }
          }
        `}</style>

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
              className="relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full card"
            >
              {/* Shiny glow element */}
              <div className="card-shiny" aria-hidden="true"></div>

              {/* Image as Background with Content Overlay */}
              <div
                className="h-64 w-full bg-cover bg-center bg-no-repeat relative"
                style={{ backgroundImage: `url(${card.img})` }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300 card-image-overlay"></div>
              </div>

              {/* Content Container */}
              <div className="p-6 relative z-20">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{card.desc}</p>

                <Link
                  to={card.to}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200 group/link"
                >
                  {card.btn}
                  <span className="group-hover/link:translate-x-1 transition-transform duration-200">→</span>
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
