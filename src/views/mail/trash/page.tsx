"use client"

import { useState, useEffect, useMemo } from "react"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

// Mock data for trash emails
const mockTrashEmails: IEmail[] = [
  {
    id: "trash-1",
    subject: "Deleted Email 1",
    body: "This is the content of a deleted email",
    sender: { address: "sender1@example.com", name: "Sender 1" },
    recipients: [{ address: "user@example.com", name: "Current User" }],
    timestamp: new Date().toISOString(),
    read: true,
    trash: true,
  },
  {
    id: "trash-2",
    subject: "Old Newsletter - Deleted",
    body: "This week's newsletter with updates and announcements...",
    sender: { address: "newsletter@example.com", name: "Weekly Newsletter" },
    recipients: [{ address: "user@example.com", name: "Current User" }],
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: false,
    trash: true,
  },
  {
    id: "trash-3",
    subject: "Promotional Offer - Deleted",
    body: "Limited time offer on our premium services...",
    sender: { address: "promotions@example.com", name: "Promotions" },
    recipients: [{ address: "user@example.com", name: "Current User" }],
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: true,
    trash: true,
  },
  {
    id: "trash-4",
    subject: "Meeting Invitation - Canceled",
    body: "The meeting scheduled for tomorrow has been canceled...",
    sender: { address: "calendar@example.com", name: "Calendar Notifications" },
    recipients: [{ address: "user@example.com", name: "Current User" }],
    timestamp: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
    read: true,
    trash: true,
  },
]

export default function TrashPage() {
  const [trash, setTrash] = useState<{ data: IEmail[] }>({ data: [] })
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  // Simulate loading trash emails without API call
  const loadTrashEmails = () => {
    setIsFetching(true)
    setIsError(false)

    // Simulate network delay
    setTimeout(() => {
      try {
        // Set mock data
        setTrash({ data: mockTrashEmails })
        setIsFetching(false)
      } catch (error) {
        console.error("Error loading trash emails:", error)
        setIsError(true)
        setIsFetching(false)
      }
    }, 500) // Simulate a 500ms loading time
  }

  useEffect(() => {
    loadTrashEmails()
  }, [])

  const emails: IEmail[] = useMemo(() => {
    return trash?.data || []
  }, [trash])

  const refetch = () => {
    loadTrashEmails()
  }

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Trash"} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList refetch={refetch} emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
