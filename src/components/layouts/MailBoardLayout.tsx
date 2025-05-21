import { useMemo } from "react"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { AppSidebar } from "../AppSidebar"
import { SidebarProvider } from "../ui/sidebar"
import { ComposeButton } from "../ComposeButton"
import useMediaQuery from "../../hooks/useMediaQuery"
import { useGetAuthUserQuery } from "@/hooks/auth"
import { Loading } from "../Loading"

export function MailBoardLayout() {
  const { pathname } = useLocation()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { data: user, isFetching } = useGetAuthUserQuery()

  const isComposePage = useMemo(() => pathname === "/mail/compose", [pathname])

  if (isFetching) return <Loading />

  if (!user?.suimailNs) {
    return <Navigate to="/onboarding" />
  }

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
