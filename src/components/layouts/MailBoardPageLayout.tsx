import { EmailListProvider } from '../EmailViewComponents/EmailListContext'

interface MailBoardPageLayoutProps {
  children: React.ReactNode
}

export function MailBoardPageLayout({ children }: MailBoardPageLayoutProps) {
  return (
    <EmailListProvider>
      <div className="w-full p-4">{children}</div>
    </EmailListProvider>
  )
}
