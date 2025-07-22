
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
          src="/img/About-1.png"
          alt="Group"
          className="w-full h-32 md:h-40 lg:h-48 rounded-lg shadow-lg object-cover object-center"
        />
      </div>
      </section>


      {/* Who We Are */}
      <section className="py-10 px-6 md:px-16 bg-white">
        <h2 className="text-xl font-bold mb-4">Who We Are</h2>
        <p className="mb-6">
          Brief history (e.g., “Founded in [Year], SOCSC is the official student
          club of the School of Computing, FUT Minna...”).
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

    
      <section className="py-10 px-6 md:px-16">
        <h3 className="text-md uppercase text-gray-400 font-semibold mb-2">
          Our Team
        </h3>
        <h2 className="text-xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {Array(8)
            .fill(0)
            .map((_, idx) => (
              <div key={idx}>
                <img
                  src="/img/Avatar.png"
                  alt="Team Member"
                  className="w-20 h-20 mx-auto rounded-full"
                />
                <h4 className="mt-2 font-semibold">Olivia Rhye</h4>
                <p className="text-sm text-gray-500">Frontend Dev</p>
                {/* Social Icons */}
                <div className="flex justify-center gap-3 mt-2">
                  <a
                    href="#"
                    aria-label="X"
                    className="text-gray-900 hover:text-black"
                  >
                    {/* X (Twitter) Icon */}
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.53 3H21l-7.19 7.53L22 21h-6.5l-5.13-6.19L3.5 21H0l7.81-8.18L2 3h6.5l4.63 5.59L17.53 3zm-2.13 16h2.18l-6.29-7.59-1.6 1.68L15.4 19zM4.29 5l5.88 7.09L6.6 19h-2.2l6.29-7.59L4.29 5z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="LinkedIn"
                    className="text-blue-700 hover:text-blue-900"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.88v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="GitHub"
                    className="text-gray-700 hover:text-black"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.325-.592 1.325-1.326V1.326C24 .592 23.405 0 22.675 0" />
                    </svg>
                  </a>
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
