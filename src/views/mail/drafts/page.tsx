import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { PageLayout } from "@/components/layouts/PageLayout"

export default function DraftsPage() {
  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => "Drafts"} />

      <MailBoardPageLayout>
        <div className="pt-14 flex flex-col">
          <p>Drafts</p>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
