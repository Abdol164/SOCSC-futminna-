import SubscriptionPlans from "./components/Prices"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { PageLayout } from "@/components/layouts/PageLayout"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"

export default function SubscriptionPage() {
  const isFetching = false;
  const isError = false;
  const isDesktop = useMediaQuery("(min-width: 1024px)")



  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Subscriptions"} />
      <MailBoardPageLayout>
        <div className={`flex flex-col h-screen pt-${isDesktop ? 16 : 5}`}>
          <div className="w-full h-full overflow-y-auto border-r border-gray-200">
            <SubscriptionPlans />
          </div>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
