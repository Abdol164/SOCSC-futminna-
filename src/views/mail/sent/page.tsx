import { useMemo } from "react"
import type { IEmail } from "@/types/generic"
import { useFetchOutboxQuery } from "@/hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

export default function SentPage() {
  const { data: outbox, isFetching, isError } = useFetchOutboxQuery()

  const emails: IEmail[] = useMemo(() => {
    return outbox?.data || []
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
