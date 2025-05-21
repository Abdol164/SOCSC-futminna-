"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { PageLayout } from "@/components/layouts/PageLayout"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { emailService } from "@/views/mail/Services/emailService"
import { EmailList } from "@/views/mail/inbox/components/EmailList"
import type { IEmail } from "@/types/generic"

export default function InboxPage() {
  const [emails, setEmails] = useState<IEmail[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmails = async () => {
      setIsFetching(true)
      const { data, isFetching, isError } = await emailService.getInboxEmails()
      setEmails(data)
      setIsFetching(isFetching)
      setIsError(isError)
    }

    fetchEmails()
  }, [])

  const handleSelectEmail = (email: IEmail) => {
    // Mark as read when selected
    emailService.markAsRead(email.id)

    // Update the email in the list to show as read
    setEmails(emails.map((e) => (e.id === email.id ? { ...e, isRead: true } : e)))

    // Navigate to the email view
    navigate(`/mail/${email.id}`)
  }

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Inbox"} />
      <MailBoardPageLayout>
        <div className="h-full w-full">
          <EmailList emails={emails} title="Inbox" onSelectEmail={handleSelectEmail} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
