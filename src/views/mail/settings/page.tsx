import { useMemo, useState } from "react"
import { IoWalletOutline } from "react-icons/io5"
import { IoPersonOutline } from "react-icons/io5"
import { IoSettingsOutline } from "react-icons/io5"
import { IoNotificationsOutline } from "react-icons/io5"
import type { SettingsTab, SettingsViewType } from "./types"
import { SetTabButton } from "./components/set-tab-button"
import { NotificationsView } from "./views/Notifications"
import { AccountView } from "./views/Account"
import { PreferencesView } from "./views/preferences"
import { SubnameView } from "./views/Subname"

const tabs: SettingsTab[] = [
  { label: "Subname", view: "subname", icon: <IoWalletOutline /> },
  {
    label: "Notifications",
    view: "notifications",
    icon: <IoNotificationsOutline />,
  },
  { label: "Account", view: "account", icon: <IoPersonOutline /> },
  { label: "Preferences", view: "preferences", icon: <IoSettingsOutline /> },
]

export default function SettingsPage() {
  const [activeView, setActiveView] = useState<SettingsViewType>("subname")

  const views: Record<SettingsViewType, React.ReactNode> = useMemo(() => {
    return {
      subname: <SubnameView />,
      notifications: <NotificationsView />,
      account: <AccountView />,
      preferences: <PreferencesView />,
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-sm border-r">
        <div className="px-6 py-5 font-bold text-xl text-blue-600">
          Settings
        </div>
        <ul className="space-y-1 px-2">
          {tabs.map(({ label, icon, view }) => (
            <SetTabButton
              key={label}
              label={label}
              icon={icon}
              view={view}
              onClick={() => setActiveView(view)}
            />
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-inner">
        {views[activeView]}
      </main>
    </div>
  )
}
