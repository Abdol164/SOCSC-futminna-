import { Link } from "react-router-dom"
import type { IEmail } from "@/types/generic"
import { cn } from "@/lib/utils"

interface EmailTabProps {
  email: IEmail
}

export function EmailTab({ email }: EmailTabProps) {
  return (
    <Link to={`/mail/inbox/${email.id}`} className="block w-full">
      <div
        className={cn(
          "group relative flex flex-col gap-1 border-b p-4 transition-all hover:bg-gray-50 sm:flex-row sm:items-center sm:gap-4",
          !email.isRead && "bg-gray-50"
        )}
      >
        {/* Left section - Avatar and star */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img
              src="/png/profile.png"
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            {!email.isRead && (
              <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-blue-500" />
            )}
          </div>
        </div>

        {/* Middle section - Content */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                "truncate text-sm text-gray-600",
                !email.isRead && "font-medium text-gray-900"
              )}
            >
              {email.from}
            </p>
          </div>
          <h3
            className={cn(
              "line-clamp-1 text-sm text-gray-600",
              !email.isRead && "font-medium text-gray-900"
            )}
          >
            {email.subject}
          </h3>
          <p className="line-clamp-1 text-xs text-gray-500">
            {email.body?.substring(0, 120)}
          </p>
        </div>
      </div>
    </Link>
  )
}
