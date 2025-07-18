export default function TechnicalTeams() {
  return (
    <section className="bg-[#f3f7ff] px-6 py-12">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 items-start">
        {/* Left Text Block */}
        <div className="md:col-span-2 space-y-3">
          <p className="text-blue-600 text-sm font-semibold">Team Categories</p>
          <h2 className="text-2xl font-bold text-gray-900">Technical Teams</h2>
          <p className="text-gray-600 text-sm">
            We’re a cross-disciplinary team that loves to create great
            experiences for our customers.
          </p>
        </div>

        {/* Team Cards */}
        <div className="md:col-span-3 grid sm:grid-cols-2 gap-6">
          {[
            { team: 'Team Sushi🌸', image: '/img/Team-Sushi.png' },
            { team: 'Team Alpha🦅', image: '/img/Team-Alpha.png' },
            { team: 'Team Grid', image: '/img/Team-Grid.png' },
            { team: 'Team Swift', image: '/img/Team-Swift.png' },
          ].map(({ team, image }, idx) => (
            <div
              key={idx}
              className="relative h-72 w-full rounded-md overflow-hidden shadow-md"
            >
              <img
                src={image}
                alt={team}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Glass Overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 
                          backdrop-blur-md bg-white/10 border border-white/20 
                          text-white rounded-md"
              >
                <h3 className="font-semibold">{team}</h3>
                <p className="text-sm">Lead: Mary Jane</p>
                <p className="text-xs text-gray-100 mt-1">
                  Lorem ipsum dolor sit amet. Eos quasi autem quo nostrum
                  voluptatem ut quibusdam.
                </p>
                <div className="flex items-center gap-3 mt-3 text-white text-sm">
                  <i className="ri-close-line" />
                  <i className="ri-linkedin-box-line" />
                  <i className="ri-github-line" />
                  <i className="ri-global-line" />
                  <i className="ri-whatsapp-line" />
                  <i className="ri-external-link-line ml-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
