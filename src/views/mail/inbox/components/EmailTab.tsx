import { Link } from "react-router-dom"
import { Calendar, Star, StarOff } from "lucide-react"

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
          !email.isRead && "bg-gray-50",
        )}
      >
        {/* Left section - Avatar and star */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <img src="/images/avatar.png" alt="" className="h-9 w-9 rounded-full object-cover" />
            {!email.isRead && <span className="absolute right-0 top-0 h-2.5 w-2.5 rounded-full bg-blue-500" />}
          </div>
          <button className="hidden text-gray-400 hover:text-blue-500 sm:block">
            {email.isStarred ? (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ) : (
              <StarOff className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Middle section - Content */}
        <div className="flex flex-1 flex-col gap-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2">
            <p className={cn("truncate text-sm text-gray-600", !email.isRead && "font-medium text-gray-900")}>
              {email.from}
            </p>
            <div className="flex items-center gap-2">
              {email.labels && email.labels.length > 0 && (
                <div className="hidden md:flex md:gap-1">
                  {email.labels.map((label) => (
                    <Badge key={label} variant="outline" className="text-xs font-normal">
                      {label}
                    </Badge>
                  ))}
                </div>
              )}
              <time className="flex items-center whitespace-nowrap text-xs text-gray-400" dateTime={email.date}>
                <Calendar className="mr-1 h-3 w-3" />
                {new Date(email.date).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            </div>
          </div>
          <h3 className={cn("line-clamp-1 text-sm text-gray-600", !email.isRead && "font-medium text-gray-900")}>
            {email.subject}
          </h3>
          <p className="line-clamp-1 text-xs text-gray-500">{email.preview || email.body?.substring(0, 120)}</p>
        </div>

        {/* Mobile star button */}
        <button className="absolute right-4 top-4 text-gray-400 hover:text-blue-500 sm:hidden">
          {email.isStarred ? (
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ) : (
            <StarOff className="h-4 w-4" />
          )}
        </button>
      </div>
    </Link>
  )
}
