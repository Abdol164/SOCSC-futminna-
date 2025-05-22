import { useMemo } from "react"
import type { IEmail } from "@/types/generic"
import { useFetchOutboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

export default function SentPage() {
  const { data: outbox, isFetching, isError, refetch } = useFetchOutboxQuery()

  const emails: IEmail[] = useMemo(() => {
    return outbox?.data || []
  }, [outbox])

  return (
    <PageLayout loading={isFetching} isError={isError} retry={refetch}>
      <ExtendedToolbar getPageTitle={() => "Sent"} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList refetch={refetch} emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
