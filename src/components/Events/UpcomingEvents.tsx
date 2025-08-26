import EventCard from './EventCard'

const events = [
  
  {
    title: 'Developers Workshop',
    tags: ['Web3', 'Workshop', 'Sui'],
    image: '/img/Dev.jpg',
    desc: (
      <>
        Are you a Web2 developer trying to get into Web3 but feeling lost?
        <br /><br />
        Join us this weekend for a Developers Workshop where we’ll cover:
        <br />
        🔹 What is Sui?<br />
        🔹 How to build using Move?<br />
        🔹 Tools & opportunities for Web3 devs on Sui<br />
        <br />
        Register:{' '}
        <a
          href="https://lu.ma/p07tuzm6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline font-semibold"
        >
          https://lu.ma/p07tuzm6
        </a>
        <br />
        Limited slots — first come, first serve!
      </>
    ),
    status: 'coming',
  },
  {
    title: 'Hackfest',
    tags: ['Hackathon', 'Competition'],
    image: '/img/Event.png',
    desc: 'A high-energy hackathon for Sui builders. Compete, collaborate, and win prizes as you build the future of Web3.',
    status: 'coming',
  },
  {
    title: 'Dev < />ing on Sui',
    tags: ['Community Call', 'Sui', 'Move'],
    image: '/img/Deving.jpg',
    desc: 'Navigating the Sui Ecosystem as a Sui Move Developer. Join our community call to learn, share, and connect with other Sui devs. Date: 15th July 2025, Time: 8PM.',
    status: 'done',
  },
  {
    title: 'Sui DeFi',
    tags: ['DeFi', 'Sui'],
    image: '/img/Defii.jpg',
    desc: 'Explore the world of decentralized finance on Sui. Learn about protocols, opportunities, and how to get started building DeFi apps.',
    status: 'coming',
  },
    {
    title: 'Sui Developers Workshop',
    tags: ['DeFi', 'Sui'],
    image: '/img/Dev-workshop.jpg',
    desc: 'Explore the world of decentralized finance on Sui. Learn about protocols, opportunities, and how to get started building DeFi apps.',
    status: 'coming',
  },
  {
    title: 'One Year Anniversary',
    tags: ['DeFi', 'Sui'],
    image: '/img/one-year.jpg',
    desc: 'Journey So Far, How it all began...',
    status: 'coming',
  },
]

const UpcomingEvents = () => {
  return (
    <section className="bg-[#edf4ff] py-14 px-6">
      <h3 className="text-center text-2xl font-semibold mb-2">
        Upcoming Events
      </h3>
      <p className="text-center text-gray-600 mb-8">
        Join our community of builders, innovators, and creators through
        hands-on experiences.
      </p>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {events.map((event, idx) => (
          <EventCard key={idx} {...event} status={event.status as 'coming' | 'done'} />
        ))}
      </div>
    </section>
  )
}

export default UpcomingEvents
