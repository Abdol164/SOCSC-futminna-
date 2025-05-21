import { useMemo } from "react"
import type { IEmail } from "@/types/generic"
import { useFetchOutboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

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
        body: email.body || "No message content",
        sender: "me@suimail.com",
        recipient: email.recipient || generateDummyRecipient(index),
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
