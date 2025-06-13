import { PageLayout } from '@/components/layouts/PageLayout'
import type { IEmail } from '@/types/generic'
import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { EmailList } from '@/components/EmailViewComponents/EmailList'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'

export default function DraftsPage() {
  const mails: IEmail[] = []

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => 'Drafts'} />
      <DefaultPagePadding>
        <MailBoardPageLayout>
          <EmailList mails={mails} />
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </PageLayout>
  )
}
