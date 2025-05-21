import { cn } from "@/lib/utils"
import SubscriptionPlans from "./components/Prices"
import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"

export default function SubscriptionPage() {
  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => "Subscriptions"} />

      <div className={cn("pt-4 flex flex-col h-screen")}>
        <div className="w-full h-full">
          <SubscriptionPlans />
        </div>
      </div>
    </PageLayout>
  )
}
