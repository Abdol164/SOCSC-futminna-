import { Book, Shield, Wallet, Mail } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface Section {
  id: string
  title: string
  icon: LucideIcon
}

interface HelpSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const sections: Section[] = [
  { id: 'overview', title: 'What is Suimail?', icon: Book },
  { id: 'wallet', title: 'Wallet Integration', icon: Wallet },
  { id: 'security', title: 'Security & Privacy', icon: Shield },
  { id: 'messaging', title: 'Email Features', icon: Mail },
]

export function HelpSidebar({
  activeSection,
  onSectionChange,
}: HelpSidebarProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 sticky top-[80px]">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Help Topics</h3>
      <nav className="space-y-2">
        {sections.map(section => {
          const Icon = section.icon
          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-500'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.title}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
