interface MailBoardPageLayoutProps {
  children: React.ReactNode
}

export function MailBoardPageLayout({ children }: MailBoardPageLayoutProps) {
  return <div className="w-full p-4">{children}</div>
}
