import type { IEmail } from "@/types/generic"
import { EmailTab } from "./EmailTab"

interface EmailListProps {
  emails: IEmail[]
  title?: string
}

export function EmailList({ emails, title }: EmailListProps) {
  return (
    <div className="flex flex-col rounded-lg border bg-card shadow-sm">
      {title && (
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-lg font-medium">{title}</h2>
          <span className="text-sm text-muted-foreground">{emails.length} emails</span>
        </div>
      )}
      <div className="divide-y">
        {emails.length > 0 ? (
          emails.map((email) => <EmailTab key={email.id} email={email} />)
        ) : (
          <div className="flex h-32 items-center justify-center">
            <p className="text-sm text-muted-foreground">No emails found</p>
          </div>
        )}
      </div>
    </div>
  )
}
