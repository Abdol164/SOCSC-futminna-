import type { SettingsViewType } from "../types"

interface SetTabButtonProps {
  label: string
  icon: React.ReactNode
  view: SettingsViewType
  onClick: () => void
}

export function SetTabButton({
  label,
  icon,
  view,
  onClick,
}: SetTabButtonProps) {
  return (
    <button
      key={label}
      onClick={onClick}
      className={`flex items-center px-5 py-3 cursor-pointer rounded-lg transition ${
        view === view
          ? "bg-blue-100 text-blue-700 font-semibold"
          : "hover:bg-gray-100 text-gray-700"
      }`}
    >
      <span className="mr-3 text-lg">{icon}</span>
      {label}
    </button>
  )
}
