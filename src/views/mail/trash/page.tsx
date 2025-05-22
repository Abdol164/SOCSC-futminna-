import { PageLayout } from "@/components/layouts/PageLayout"
import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { EmailList } from "@/components/EmailViewComponents/EmailList"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import type { IEmail } from "@/types/generic"

export default function TrashPage() {
  const emails: IEmail[] = []

  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => "Trash"} />
      <MailBoardPageLayout>
        <div className="pt-16">
          <EmailList emails={emails} />
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
