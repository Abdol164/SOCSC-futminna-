import { cn } from "@/lib/utils"
import SubscriptionPlans from "./components/Prices"
import useMediaQuery from "../../../hooks/useMediaQuery"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"

export default function SubscriptionPage() {
  const isFetching = false
  const isError = false
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => "Subscriptions"} />

      <div
        className={cn("flex flex-col h-screen", isDesktop ? "pt-0" : "pt-5")}
      >
        <div className="w-full h-full">
          <SubscriptionPlans />
        </div>
      </div>
    </PageLayout>
  )
}
