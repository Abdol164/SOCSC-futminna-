import { Outlet } from "react-router-dom"
import { AppSidebar } from "../AppSidebar"
import { SidebarProvider } from "../ui/sidebar"

export function MailBoardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
