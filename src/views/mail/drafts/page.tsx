import { PageLayout } from "@/components/layouts/PageLayout"
import type { IEmail } from "@/types/generic"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"

export default function DraftsPage() {
  const emails: IEmail[] = []

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => "Drafts"} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
