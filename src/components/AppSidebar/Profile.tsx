import { Link } from "react-router-dom"

interface ProfileProps {
  avatar: string
  name: string
  email: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}

export function Profile({ avatar, name, email, onClick }: ProfileProps) {
  return (
    <Link
      to="/profile"
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
    >
      <div className="relative">
        <img
          src={avatar}
          alt={name}
          className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
        />
        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800">{name}</p>
        <p className="text-xs text-gray-500 truncate">{email}</p>
      </div>
    </Link>
  )
}
