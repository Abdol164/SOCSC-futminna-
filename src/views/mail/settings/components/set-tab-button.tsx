import { cn } from '@/lib/utils'

interface SetTabButtonProps {
  label: string
  onClick: () => void
  isActive: boolean
}

export function SetTabButton({
  label,

  onClick,
  isActive,
}: SetTabButtonProps) {
  return (
    <button
      key={label}
      onClick={onClick}
      className={cn(
        'flex items-center px-5 py-3 cursor-pointer transition text-sm',
        [
          isActive
            ? 'bg-zinc-100 font-medium'
            : 'hover:bg-zinc-100 hover:text-zinc-500',
        ]
      )}
    >
      {label}
    </button>
  )
}
