import SubscriptionPlans from './components/Prices'
import { PageLayout } from '@/components/layouts/PageLayout'
import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { Benefits } from './components/Benefits'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import {
  SubscriptionHeader,
  type BillingCycle,
} from './components/SubscriptionHeader'
import { useState } from 'react'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly')

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => 'Subscriptions'} />

      <DefaultPagePadding>
        <div className="absolute inset-0 bg-gradient-to-br from-white via-blue-50 to-white" />
        <MailBoardPageLayout>
          <div className="relative z-30 w-full h-full">
            <div className="relative max-w-7xl mx-auto px-10 lg:px-8">
              <SubscriptionHeader
                billingCycle={billingCycle}
                setBillingCycle={setBillingCycle}
              />
              <SubscriptionPlans billingCycle={billingCycle} />
              <Benefits />
            </div>
          </div>
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </PageLayout>
  )
}
