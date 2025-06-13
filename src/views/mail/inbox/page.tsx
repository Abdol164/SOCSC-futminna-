import { useMemo } from 'react'
import { useFetchInboxQuery } from '@/hooks/mail'
import { PageLayout } from '@/components/layouts/PageLayout'
import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { EmailList } from '@/components/EmailViewComponents/EmailList'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'

export default function InboxPage() {
  const { data: inbox, isFetching, isError, refetch } = useFetchInboxQuery()

  const mails = useMemo(() => {
    return inbox?.data || []
  }, [inbox])

  return (
    <PageLayout loading={isFetching} isError={isError}>
      <ExtendedToolbar getPageTitle={() => 'Inbox'} />
      <DefaultPagePadding>
        <MailBoardPageLayout>
          <EmailList refetch={refetch} mails={mails} />
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </PageLayout>
  )
}
