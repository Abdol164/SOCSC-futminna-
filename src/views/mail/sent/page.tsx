"use client"

import { useMemo } from "react"
import { useFetchOutboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

// Function to generate dummy recipient emails
const generateDummyRecipient = (index: number) => {
  const recipients = [
    "john@suimail",
    "emma@suimail",
    "michael@suimail",
    "sophia@suimail",
    "william@suimail",
    "olivia@suimail",
    "james@suimail",
    "ava@suimail",
    "benjamin@suimail",
    "mia@suimail",
  ]

  return recipients[index % recipients.length]
}

export default function SentPage() {
  const { data: outbox, isFetching, isError } = useFetchOutboxQuery()

  const emails: IEmail[] = useMemo(() => {
    return (outbox?.data || []).map((email, index) => {
      return {
        id: email.id || Math.floor(Math.random() * 10000).toString(),
        date: email.date || new Date().toISOString(),
        subject: email.subject || "No Subject",
        body: email.body || email.message || "No message content",
        sender: "me@suimail.com", 
        recipient: email.recipient || email.to || generateDummyRecipient(index),
        isRead: true, 
      }
    })
  }, [outbox])

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Sent"} />
      <MailBoardPageLayout>
        <div className={"pt-16 flex flex-col h-screen"}>
          <div className="w-full h-full overflow-y-auto border-r border-gray-200">
            <EmailList emails={emails} />
          </div>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
