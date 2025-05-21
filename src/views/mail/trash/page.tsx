import { ExtendedToolbar } from "@/components/ExtendedToolbar"
import { MailBoardPageLayout } from "@/components/layouts/MailBoardPageLayout"
import { PageLayout } from "@/components/layouts/PageLayout"

export default function TrashPage() {
  return (
    <PageLayout>
      <ExtendedToolbar getPageTitle={() => "Trash"} />

      <MailBoardPageLayout>
        <div className="pt-14 flex flex-col">
          <p>Trash Page</p>
        </div>
      </MailBoardPageLayout>
    </PageLayout>
  )
}
