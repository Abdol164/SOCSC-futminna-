import React from "react"
import type { IEmail } from "../types/generic"

interface EmailListProps {
  email: IEmail
}

const EmailList: React.FC<EmailListProps> = ({ email }) => {
  return (
    <div
      className="w-full px-4 pt-0 pb-4 md:px-6 md:pt-4 md:pb-5 border-b border-gray-200 bg-white transition-all duration-200 cursor-pointer
                 hover:bg-gray-100 hover:shadow-sm hover:scale-[1.01] hover:z-10 rounded-md"
    >
      <div className="flex items-start gap-4">
        {/* Sender Avatar */}
        <div className="flex-shrink-0">
          <img
            src="/png/profile.png"
            alt="Sender"
            className="h-10 w-10 rounded-full object-cover"
          />
        </div>

        {/* Email Details */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center">
            {/* Sender */}
            <p
              className={`text-sm truncate ${
                email.isRead ? "text-gray-600" : "text-gray-900 font-semibold"
              }`}
            >
              {email.from}
            </p>

            {/* Date */}
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {new Date(email.date).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex justify-between items-center mt-0.5">
            {/* Subject */}
            <p
              className={`text-sm leading-snug truncate ${
                email.isRead ? "text-gray-500" : "text-gray-700 font-medium"
              }`}
            >
              {email.subject}
            </p>

            {/* Unread Dot */}
            {!email.isRead && (
              <span
                className="ml-2 h-2.5 w-2.5 bg-blue-500 rounded-full shrink-0"
                title="Unread"
              ></span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailList
