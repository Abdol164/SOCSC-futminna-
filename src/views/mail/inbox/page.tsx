import { useMemo } from "react"
import { EmailList } from "./components/EmailList"
import { useFetchInboxQuery } from "../../../hooks/mail"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { PageLayout } from "@/components/layouts/PageLayout"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"

export default function InboxPage() {
  const { data: inbox, isFetching, isError } = useFetchInboxQuery()
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  const emails = useMemo(() => {
    return inbox || []
  }, [inbox])

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Inbox"} />
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
