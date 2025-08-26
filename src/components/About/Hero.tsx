import { FaLinkedin, FaGithub, FaTwitter, FaFacebook } from 'react-icons/fa'


interface Props {
  name: string;
  role: string; // changed from team
  desc: string;
  image: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
}

const teamMembers: Props[] = [

  {
    name: 'Salisu AbdulWahab',
    role: 'Team Lead',
    desc: 'Join us to turn ideas into reality!',
    image: '/img/Salisu AbdulWahab.jpg',
    socials: {},
  },
  {
    name: 'Alainengiya Goerge',
    role: 'Deverel of Suioncampus',
    desc: 'Decentralizing the future.',
    image: '/img/George.jpg',
    socials: {},
  },
  {
    name: 'Micheal Obe',
    role: 'Tech Lead',
    desc: 'Let’s build the future together!',
    image: '/img/micheal.jpg',
    socials: {},
  },

  {
    name: 'Ochaii ',
    role: 'Head of Media and Contents',
    desc: 'Innovate, collaborate, achieve.',
    image: '/img/Ochaii.jpg',
    socials: {},
  },

  {
    name: 'Ahmed Khadija',
    role: 'Program Manager',
    desc: 'Let’s build the future together!',
    image: '/img/Ahmed.jpg',
    socials: {},
  },
  {
    name: 'Mr Jones Emmanuel',
    role: 'Community Manager',
    desc: 'Empowering students for success.',
    image: '/img/Jones Emmanuel.jpg',
    socials: {},
  },
]

const AboutPage = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-10 text-center">
        <h3 className="text-sm uppercase tracking-wider">About Us</h3>
        <h1 className="text-3xl font-bold mt-2">About SOCSC FUT Minna</h1>
        <p className="mt-2 text-md">
          Empowering the next generation of tech innovators.
        </p>

        
      <div className="w-full my-8">
        <img
          src="/img/About-highlight.jpg"
          alt="Group"
          className="w-full h-45 md:h-40 lg:h-48 rounded-lg shadow-lg object-cover object-center"
        />
      </div>
      </section>


      {/* Who We Are */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h2 className="text-xl font-bold mb-4">Who We Are</h2>
        <p className="mb-6">
          Brief history (e.g., “Founded in 2024, SOCSC is the official student
          club of the School of Technology, FUT Minna...”).
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold">Mission Statement</h3>
            <p className="mt-2 text-sm">
              Empowering innovation, skill development, and real-world
              problem-solving via collaboration...
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Vision</h3>
            <p className="mt-2 text-sm">
              To see tech-building student communities thrive in Northern
              Nigeria...
            </p>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-slate-50 py-10 px-6 md:px-16">
        <div className="flex flex-col md:flex-row md:items-center md:gap-8">
          {/* List Section  */}
          <div className="flex-1 order-2 md:order-1 flex flex-col items-start mb-6 md:mb-0">
            <span className="mb-2">
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="8"
                  y="6"
                  width="20"
                  height="14"
                  rx="2"
                  fill="#38bdf8"
                />
                <rect
                  x="10"
                  y="8"
                  width="16"
                  height="10"
                  rx="1"
                  fill="#e0f2fe"
                />
                <circle cx="12" cy="28" r="3" fill="#38bdf8" />
                <rect
                  x="15"
                  y="25"
                  width="10"
                  height="2"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="25"
                  y="25"
                  width="2"
                  height="6"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="17"
                  y="27"
                  width="6"
                  height="2"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="13"
                  y="20"
                  width="2"
                  height="6"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="21"
                  y="20"
                  width="2"
                  height="6"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="16"
                  y="18"
                  width="4"
                  height="2"
                  rx="1"
                  fill="#38bdf8"
                />
                <rect
                  x="18"
                  y="16"
                  width="2"
                  height="2"
                  rx="1"
                  fill="#38bdf8"
                />
              </svg>
            </span>
            <h3 className="text-md uppercase text-sky-500 font-semibold mb-2 mt-0">
              What We Do
            </h3>
            <ul className="space-y-4 text-sm">
              {[
                'Organize workshops, hackathons, and tech talks',
                'Collaborate on projects with industry professionals',
                'Prepare members for careers in tech',
                'Promote open-source contributions',
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
            src="/img/Ochaii.png"
            alt="Activity"
            className="md:w-1/2 w-full rounded mb-6 md:mb-0 md:ml-8 order-1 md:order-2"
          />
        </div>
      </section>

    
      {/* Team Section */}
      <section className="py-14 px-4 md:px-16 bg-gradient-to-br from-slate-50 to-white">
        <h3 className="text-md uppercase text-gray-400 font-semibold mb-2 text-center tracking-wider">
          Our Team
        </h3>
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col items-center w-full max-w-xs"
            >
              <img
                src={member.image}
                alt={member.name}
                loading="lazy"
                width={120}
                height={120}
                className="w-28 h-28 rounded-full object-cover border-4 border-blue-100 shadow mb-4"
                decoding="async"
                style={{ backgroundColor: "#e0e7ef" }}
              />
              <h4 className="mt-1 font-semibold text-lg text-gray-800">{member.name}</h4>
              <p className="text-sm text-blue-600 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 mb-3">{member.desc}</p>
              {/* Social Icons */}
              <div className="flex justify-center gap-3 mt-auto">
                {member.socials.twitter && (
                  <a
                    href={member.socials.twitter}
                    aria-label="Twitter"
                    className="text-gray-500 hover:text-blue-400 transition"
                  >
                    <FaTwitter size={18} />
                  </a>
                )}
                {member.socials.linkedin && (
                  <a
                    href={member.socials.linkedin}
                    aria-label="LinkedIn"
                    className="text-gray-500 hover:text-blue-700 transition"
                  >
                    <FaLinkedin size={18} />
                  </a>
                )}
                {member.socials.github && (
                  <a
                    href={member.socials.github}
                    aria-label="GitHub"
                    className="text-gray-500 hover:text-black transition"
                  >
                    <FaGithub size={18} />
                  </a>
                )}
                {member.socials.facebook && (
                  <a
                    href={member.socials.facebook}
                    aria-label="Facebook"
                    className="text-gray-500 hover:text-blue-600 transition"
                  >
                    <FaFacebook size={18} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Join Section */}
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
    </div>
  )
}

export default AboutPage
