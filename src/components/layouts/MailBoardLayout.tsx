import { useMemo } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { AppSidebar } from "../AppSidebar"
import { SidebarProvider } from "../ui/sidebar"
import { ComposeButton } from "../ComposeButton"
import useMediaQuery from "../../hooks/useMediaQuery"

export function MailBoardLayout() {
  const { pathname } = useLocation()
  const isMobile = useMediaQuery("(max-width: 768px)")

  const isComposePage = useMemo(() => pathname === "/mail/compose", [pathname])

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <Outlet />
        {isMobile && !isComposePage && <ComposeButton />}
      </main>
    </SidebarProvider>
  )
}
