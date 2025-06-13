import { Wallet, Send, User, Lock, ArrowRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface QuickAction {
  title: string
  description: string
  icon: LucideIcon
}

const quickActions: QuickAction[] = [
  {
    title: 'Connect Wallet',
    description: 'Link your Sui wallet to start using Suimail',
    icon: Wallet,
  },
  {
    title: 'Send First Email',
    description: 'Learn how to compose and send secure messages',
    icon: Send,
  },
  {
    title: 'Manage Contacts',
    description: 'Add and organize your Suimail contacts',
    icon: User,
  },
  {
    title: 'Security Settings',
    description: 'Configure privacy and security options',
    icon: Lock,
  },
]

export function QuickStartSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-6 mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Start</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quickActions.map((action, index) => {
          const Icon = action.icon
          return (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 rounded-lg border border-blue-100 hover:border-blue-300 hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <div className="bg-blue-100 p-2 rounded-lg group-hover:bg-blue-200 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{action.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {action.description}
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
            </div>
          )
        })}
      </div>
    </div>
  )
}
