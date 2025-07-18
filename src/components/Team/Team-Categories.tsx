import {
  CodeBracketIcon,
  CpuChipIcon,
  ShieldCheckIcon,
  PhotoIcon,
  CalendarDaysIcon,
  MegaphoneIcon,
} from '@heroicons/react/24/solid'

const teams = [
  {
    category: 'Technical Teams',
    data: [
      {
        title: 'Web Development Team',
        description: 'Builds websites/apps for club and community projects.',
        skills: 'Sui Move, HTML/CSS, JavaScript, React, etc.',
        icon: <CodeBracketIcon className="w-6 h-6 text-blue-500" />,
      },
      {
        title: 'AI & Data Science Team',
        description: 'Works on ML models, data analysis, and AI projects.',
        skills: 'Python, TensorFlow, SQL.',
        icon: <CpuChipIcon className="w-6 h-6 text-blue-500" />,
      },
      {
        title: 'Cybersecurity Team',
        description:
          'Focuses on ethical hacking, CTF competitions, and security workshops.',
        icon: <ShieldCheckIcon className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
  {
    category: 'Non-Technical Teams',
    data: [
      {
        title: 'Design & Media Team',
        description: 'Handles graphics, UI/UX, and content creation.',
        icon: <PhotoIcon className="w-6 h-6 text-blue-500" />,
      },
      {
        title: 'Events & Logistics Team',
        description: 'Plans workshops, hackathons, and socials.',
        icon: <CalendarDaysIcon className="w-6 h-6 text-blue-500" />,
      },
      {
        title: 'Publicity & Outreach Team',
        description: 'Manages social media, partnerships, and sponsorships.',
        icon: <MegaphoneIcon className="w-6 h-6 text-blue-500" />,
      },
    ],
  },
]

export default function TeamCategories() {
  return (
    <section className="bg-[#F8FAFC] py-16 px-4 sm:px-8 lg:px-20 text-[#0F172A] bg-white">
      <h3 className="text-sm text-blue-500 font-medium mb-2">
        Team Categories
      </h3>

      {teams.map((group, index) => (
        <div key={index} className="mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            {group.category}
          </h2>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-6">
            {group.data.map((team, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 p-4 rounded-xl bg-white "
              >
                <div className="w-10 h-10  bg-blue-100 flex items-center justify-center">
                  {team.icon}
                </div>
                <h4 className="font-semibold text-[15px]">{team.title}</h4>
                <p className="text-[13px] text-gray-700">{team.description}</p>
                {team.skills && (
                  <p className="text-[12px] text-gray-500">
                    <span className="font-medium">Skills:</span> {team.skills}
                  </p>
                )}
                <a
                  href="#"
                  className="text-blue-500 text-sm flex items-center gap-1 mt-2 hover:underline"
                >
                  Projects <span>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
