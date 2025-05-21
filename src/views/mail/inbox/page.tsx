import { useMemo } from "react"
import { cn } from "@/lib/utils"
import { EmailList } from "./components/EmailList"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { useFetchInboxQuery } from "../../../hooks/mail"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

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
        <div
          className={cn("flex flex-col h-screen", isDesktop ? "pt-16" : "pt-5")}
        >
          <div className="w-full h-full overflow-y-auto border-r border-gray-200">
            <EmailList emails={emails} />
          </div>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
