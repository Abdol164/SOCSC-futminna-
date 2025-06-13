import { useMemo } from 'react'
import type { IEmail } from '@/types/generic'
import { PageLayout } from '@/components/layouts/PageLayout'
import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { EmailList } from '@/components/EmailViewComponents/EmailList'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'

export default function TrashPage() {
  const mails: IEmail[] = useMemo(() => [], [])

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => 'Trash'} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList mails={mails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
