import { useMemo } from "react"
import { useFetchInboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

const generateDummySender = (index: number) => {
  const senders = [
    "dean@suimail",
    "sarah@suimail",
    "alex@suimail",
    "taylor@suimail",
    "jordan@suimail",
    "morgan@suimail",
    "casey@suimail",
    "jamie@suimail",
    "riley@suimail",
    "quinn@suimail",
  ]

  return senders[index % senders.length]
}

export default function InboxPage() {
  const { data: inbox, isFetching, isError } = useFetchInboxQuery()

  const emails: IEmail[] = useMemo(() => {
    return (inbox?.data || []).map((email, index) => {
      // Generate a dummy sender if one doesn't exist
      const dummySender = generateDummySender(index)

      return {
        id: email.id || Math.floor(Math.random() * 10000).toString(),
        date: email.date || new Date().toISOString(),
        subject: email.subject || "No Subject",
        body: email.body || "No message content",
        sender: email.sender || dummySender,
        recipient: email.recipient || "me@suimail.com",
        isRead: email.isRead || false,
      }
    })
  }, [inbox])

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Inbox"} />
      <MailBoardPageLayout>
        <div className="pt-16 h-full w-full">
          <EmailList emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
