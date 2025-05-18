import type { IEmail } from "@/types/generic"
import { EmailTab } from "./EmailTab"

interface EmailListProps {
  emails: IEmail[]
}

export function EmailList({ emails }: EmailListProps) {
  const hasEmails = emails.length > 0

  return (
    <div>
      {hasEmails ? (
        emails.map((email) => <EmailTab key={email.id} email={email} />)
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500">No emails found</p>
        </div>
      )}
    </div>
  )
}
