"use client"

import { useState, useEffect, useMemo } from "react"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

// Mock data for drafts
const mockDrafts: IEmail[] = [
  {
    id: "draft-1",
    subject: "Draft Email 1",
    body: "This is the content of draft email 1",
    sender: { address: "user@example.com", name: "Current User" },
    recipients: [{ address: "recipient1@example.com", name: "Recipient 1" }],
    timestamp: new Date().toISOString(),
    read: true,
    draft: true,
  },
  {
    id: "draft-2",
    subject: "Meeting Notes - Draft",
    body: "Here are the meeting notes from our discussion...",
    sender: { address: "user@example.com", name: "Current User" },
    recipients: [{ address: "team@example.com", name: "Team" }],
    timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    read: true,
    draft: true,
  },
  {
    id: "draft-3",
    subject: "Project Proposal - Draft",
    body: "I've been working on this project proposal...",
    sender: { address: "user@example.com", name: "Current User" },
    recipients: [{ address: "manager@example.com", name: "Manager" }],
    timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    read: true,
    draft: true,
  },
]

export default function DraftPage() {
  const [drafts, setDrafts] = useState<{ data: IEmail[] }>({ data: [] })
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

  // Simulate loading drafts without API call
  const loadDrafts = () => {
    setIsFetching(true)
    setIsError(false)

    // Simulate network delay
    setTimeout(() => {
      try {
        // Set mock data
        setDrafts({ data: mockDrafts })
        setIsFetching(false)
      } catch (error) {
        console.error("Error loading drafts:", error)
        setIsError(true)
        setIsFetching(false)
      }
    }, 500) // Simulate a 500ms loading time
  }

  useEffect(() => {
    loadDrafts()
  }, [])

  const emails: IEmail[] = useMemo(() => {
    return drafts?.data || []
  }, [drafts])

  const refetch = () => {
    loadDrafts()
  }

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Drafts"} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList refetch={refetch} emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
