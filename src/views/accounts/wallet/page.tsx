import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { PageLayout } from '../../../components/layouts/PageLayout'
import { HeroCard } from './components/HeroCard'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { AccountNotFoundCard } from './components/AccountNotFoundCard'
import { useMemo } from 'react'

export default function WalletPage() {
  const currentAccount = useCurrentAccount()

  const renderHeroCard = useMemo(() => {
    if (!currentAccount) {
      return <AccountNotFoundCard />
    }

    return <HeroCard accountAddress={currentAccount.address} />
  }, [currentAccount])

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => 'My Wallet'} />

      <DefaultPagePadding>
        <MailBoardPageLayout>
          <div className="flex flex-col gap-4 px-4">{renderHeroCard}</div>
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </PageLayout>
  )
}
