import type { FC } from 'react'
import {
  FaLinkedin,
  FaEnvelope,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa'

const leaders = [
  {
    name: 'Zid',
    team: 'Team Alpha',
    desc: 'Join us to turn ideas into reality!',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Kadi',
    team: 'Team Beta',
    desc: 'Let’s build the future together!',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Mr Jones',
    team: 'Team Gamma',
    desc: 'Empowering students for success.',
    image: 'https://i.pravatar.cc/150?img=3',
  },
  {
    name: 'Ohaii',
    team: 'Team Delta',
    desc: 'Innovate, collaborate, achieve.',
    image: 'https://i.pravatar.cc/150?img=4',
  },
  {
    name: 'Blockchainbard',
    team: 'Team Blockchain',
    desc: 'Decentralizing the future.',
    image: 'https://i.pravatar.cc/150?img=5',
  },
  {
    name: 'Zid',
    team: 'Team Alpha',
    desc: 'Join us to turn ideas into reality!',
    image: 'https://i.pravatar.cc/150?img=1',
  },
  {
    name: 'Kadi',
    team: 'Team Beta',
    desc: 'Let’s build the future together!',
    image: 'https://i.pravatar.cc/150?img=2',
  },
  {
    name: 'Mr Jones',
    team: 'Team Gamma',
    desc: 'Empowering students for success.',
    image: 'https://i.pravatar.cc/150?img=3',
  },
]

const LeadershipGrid: FC = () => {
  return (
    <>
      <section className="bg-[#f2f6ff] py-16 px-6 min-h-screen flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-1">
          Leadership Grid
        </h2>
        <p className="text-gray-500 mb-12">Meet the Team Leads</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <img
                src={leader.image}
                alt={leader.name}
                className="w-20 h-20 rounded-full mb-4 object-cover"
              />
              <h3 className="font-semibold text-gray-800">{leader.name}</h3>
              <p className="text-sm text-indigo-600 font-medium">
                {leader.team}
              </p>
              <p className="text-sm text-gray-500 mt-2">{leader.desc}</p>
              <div className="flex gap-4 mt-4 text-gray-400 text-lg">
                <FaLinkedin className="hover:text-indigo-600 cursor-pointer" />
                <FaEnvelope className="hover:text-indigo-600 cursor-pointer" />
                <FaGithub className="hover:text-black cursor-pointer" />
                <FaTwitter className="hover:text-sky-500 cursor-pointer" />
                <FaFacebook className="hover:text-blue-600 cursor-pointer" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-50 py-10 px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          <div className="flex-1 order-2 md:order-1 flex flex-col items-start mb-6 md:mb-0">
            <h2 className="text-xl font-bold mb-4 font-sans">
              Why Be Part of SOCSC?
            </h2>
            <p className="text-sm mb-6 max-w-xl font-sans">
              Powerful, self-driven products and growth mindset to help you
              connect, engage, and reach more users. Trusted by over 4,000
              students.
            </p>
            <ul className="space-y-4 text-sm font-sans">
              {[
                'Network with peers and industry experts',
                'Gain hands-on project experience',
                'Access exclusive industry workshops',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-200 text-blue-600">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4 9-9"
                      />
                    </svg>
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <img
            src="/img/SOCSC.png"
            alt="Join us"
            className="md:w-1/2 w-full rounded mb-6 md:mb-0 md:ml-8 order-1 md:order-2"
          />
        </div>
      </section>
    </>
  )
}

export default LeadershipGrid
