import { useMemo } from 'react'
import { useFetchOutboxQuery } from '@/hooks/mail'
import { PageLayout } from '@/components/layouts/PageLayout'
import { ExtendedToolbar } from '@/components/ExtendedToolbar'
import { EmailList } from '@/components/EmailViewComponents/EmailList'
import { MailBoardPageLayout } from '@/components/layouts/MailBoardPageLayout'
import { DefaultPagePadding } from '@/components/layouts/DefaultPagePadding'

export default function SentPage() {
  const { data: outbox, isFetching, isError, refetch } = useFetchOutboxQuery()

  const mails = useMemo(() => {
    return outbox?.data || []
  }, [outbox])

  return (
    <PageLayout loading={isFetching} isError={isError} retry={refetch}>
      <ExtendedToolbar getPageTitle={() => 'Sent'} />
      <DefaultPagePadding>
        <MailBoardPageLayout>
          <EmailList refetch={refetch} mails={mails} />
        </MailBoardPageLayout>
      </DefaultPagePadding>
    </PageLayout>
  )
}
