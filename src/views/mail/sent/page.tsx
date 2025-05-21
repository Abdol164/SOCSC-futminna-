import { useMemo } from "react"
import { useFetchOutboxQuery } from "../../../hooks/mail"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { PageLayout } from "@/components/layouts/PageLayout"
import { EmailList } from "../inbox/components/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"

export default function SentPage() {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const { data: outbox, isFetching, isError } = useFetchOutboxQuery()

  const emails = useMemo(() => {
    return outbox || []
  }, [outbox])
  
  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Sent"} />
      <MailBoardPageLayout>
        <div className={`flex flex-col h-screen pt-${isDesktop ? 16 : 5}`}>
          <div className="w-full h-full overflow-y-auto border-r border-gray-200">
            <EmailList emails={emails} />
          </div>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
