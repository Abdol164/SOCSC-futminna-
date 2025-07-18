import React from 'react'

const stats = [
  { number: '500+', label: 'Active Members' },
  { number: '12', label: 'Specialized Teams' },
  { number: '50+', label: 'Projects Completed' },
  { number: '100+', label: 'Events Hosted' },
]

const Stats = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((stat, idx) => (
          <div key={idx}>
            <h3 className="text-3xl font-bold text-blue-600">{stat.number}</h3>
            <p className="text-gray-700">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats
