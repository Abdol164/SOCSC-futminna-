import { useMemo } from "react"
import { useFetchInboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

export default function InboxPage() {
  const { data: inbox, isFetching, isError } = useFetchInboxQuery()

  const emails: IEmail[] = useMemo(() => {
    return inbox?.data || []
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
