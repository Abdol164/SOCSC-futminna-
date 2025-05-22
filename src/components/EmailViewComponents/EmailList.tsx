import type { IEmail } from "@/types/generic"
import { EmailTab } from "./EmailTab"
import { Button } from "../ui/button"
import { RefreshCw } from "lucide-react"

interface EmailListProps {
  emails: IEmail[]
  refetch?: () => void
}

export function EmailList({ emails, refetch }: EmailListProps) {
  const hasEmails = emails.length > 0

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white shadow-sm">
      {hasEmails && (
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          {refetch && (
            <Button variant="ghost" size="icon" onClick={refetch}>
              <RefreshCw className="w-4 h-4" />
            </Button>
          )}

          <span className="text-sm text-gray-500">
            {emails.length} {emails.length === 1 ? "email" : "emails"}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1">
        {hasEmails ? (
          emails.map((email) => <EmailTab key={email.id} email={email} />)
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-gray-500">No emails found</p>
          </div>
        )}
      </div>
    </div>
  )
}
