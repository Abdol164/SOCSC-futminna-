// src/components/ProjectGrid.tsx
import React from 'react'

const projects = [
  {
    id: 1,
    title: 'Suimail',
    description:
      'A decentralized email platform for seamless and secure communication on the Sui blockchain.',
    team: 'Team Alpha',
    image: '/img/Suimail-project.jpg',
    author: {
      name: 'Team Alpha',
      avatar: '/img/Suimail-project.jpg',
    },
  },
  {
    id: 2,
    title: 'Payfrica',
    description:
      'A cross-border payment solution designed to simplify transactions across Africa.',
    team: 'Team Sushi',
    image: '/img/payfrica-project.jpg',
    author: {
      name: 'Team Sushi',
      avatar: '/img/Payfrica-Icon.png',
    },
  },
  {
    id: 3,
    title: 'Memepad',
    description:
      'A collaborative note-taking and knowledge-sharing platform for students and professionals.',
    team: 'Team Alpha',
    image: '/img/Meet.png',
    author: {
      name: 'Chinedu Okafor',
      avatar: '/img/Avatar.png',
    },
  },
  {
    id: 4,
    title: 'Eduxverse',
    description:
      'An immersive virtual learning environment connecting educators and learners globally.',
    team: 'Team Sushi',
    image: '/img/Projects.png',
    author: {
      name: 'Ochaii',
      avatar: '/img/Avatar.png',
    },
  },
]

const ProjectGrid: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
        {projects.map(project => (
          <div
            key={project.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <p className="text-sm text-indigo-600 font-semibold">
                {project.team}
              </p>
              <h3 className="text-lg font-bold mt-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {project.description}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <img
                  src={project.author.avatar}
                  alt={project.author.name}
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-sm font-medium">{project.author.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectGrid
