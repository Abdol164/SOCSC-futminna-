import { useEffect, useState } from "react"
import type { IEmail } from "@/types/generic"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { emailService } from "@/lib/services/emailService"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

export default function InboxPage() {
  const [emails, setEmails] = useState<IEmail[]>([])
  const [isFetching, setIsFetching] = useState(true)
  const [isError, setIsError] = useState(false)

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
