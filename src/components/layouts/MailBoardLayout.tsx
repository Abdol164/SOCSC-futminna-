import { Outlet } from "react-router-dom";
import { AppSidebar } from "../AppSidebar";
import { SidebarProvider } from "../ui/sidebar";
import { ComposeButton } from "./ComposeButton";
import  useMediaQuery  from "../../hooks/useMediaQuery";

export function MailBoardLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="flex-1">
        <Outlet />
        {isMobile && <ComposeButton />}
      </main>
    </SidebarProvider>
  );
}
