import { useMemo } from "react"
import { useFetchOutboxQuery } from "../../../hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { EmailList } from "../../../components/EmailViewComponents/EmailList"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

export default function SentPage() {
  const { data: outbox, isFetching, isError } = useFetchOutboxQuery()

  const emails = useMemo(() => {
    return outbox || []
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
