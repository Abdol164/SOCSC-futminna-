import { Outlet } from "react-router-dom"
import { AppSidebar } from "../AppSidebar"
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar"

export function MailBoardLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <main>
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
