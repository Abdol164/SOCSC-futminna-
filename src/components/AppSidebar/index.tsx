import { Link, useLocation, useNavigate } from "react-router-dom"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar"
import {
  Archive,
  CreditCard,
  FileEdit,
  HelpCircle,
  Inbox,
  Plus,
  Repeat,
  SendHorizonal,
  Settings,
  ShieldAlert,
  Trash2,
} from "lucide-react"
import { Profile } from "./Profile"

import useMediaQuery from "@/hooks/useMediaQuery"

interface SidebarItem {
  title: string
  url: string
  icon: React.ReactNode
}

const MailNavigationItems: SidebarItem[] = [
  {
    title: "Inbox",
    url: "/mail",
    icon: <Inbox />,
  },
  {
    title: "Sent",
    url: "/mail/sent",
    icon: <SendHorizonal />,
  },
  {
    title: "Draft",
    url: "/mail/draft",
    icon: <FileEdit />,
  },
  {
    title: "Spam",
    url: "/mail/spam",
    icon: <ShieldAlert />,
  },
  {
    title: "Archive",
    url: "/mail/archive",
    icon: <Archive />,
  },
  {
    title: "Trash",
    url: "/mail/trash",
    icon: <Trash2 />,
  },
]

const AccountNavigationItems: SidebarItem[] = [
  {
    title: "Payment",
    url: "/account/payment",
    icon: <CreditCard />,
  },
  {
    title: "Subscription",
    url: "/account/Subscription",
    icon: <Repeat />,
  },
]

const HelpNavigationItems: SidebarItem[] = [
  {
    title: "Help",
    url: "/help",
    icon: <HelpCircle />,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: <Settings />,
  },
]

export function AppSidebar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { isMobile, setOpenMobile, openMobile } = useSidebar()
  const isSmallScreen = useMediaQuery("(max-width: 768px)")

  const handleGoTo = (e: React.MouseEvent<HTMLAnchorElement>, url: string) => {
    e.preventDefault()
    if (isMobile && openMobile) {
      setOpenMobile(false)
    }
    navigate(url)
  }

  const handleComposeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/mail/compose");
  }

  return (
    <>
      <Sidebar>
        <SidebarHeader className="py-5 flex flex-col items-center">
          <img
            src="/images/suimail-logo.png"
            alt="SUIMAIL"
            className="w-[150px] h-auto"
          />

          {!isSmallScreen && (
            <div className="mt-2 px-4 w-full">
              <Button
                asChild
                className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full gap-2"
                onClick={handleComposeClick}
              >
                <Link to="">
                  <Plus className="size-4" />
                  <span>Compose</span>
                </Link>
              </Button>
            </div>
          )}
        </SidebarHeader>

        <SidebarSeparator />

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Mail</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {MailNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      asChild
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                      )}
                    >
                      <Link
                        to={item.url}
                        onClick={(e) => handleGoTo(e, item.url)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarSeparator />
          <SidebarGroup>
            <SidebarGroupLabel>Account</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {AccountNavigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={pathname === item.url}
                      asChild
                      className={cn(
                        "flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                      )}
                    >
                      <Link
                        to={item.url}
                        onClick={(e) => handleGoTo(e, item.url)}
                      >
                        {item.icon}
                        {item.title}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <SidebarMenu>
            {HelpNavigationItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={pathname === item.url}
                  asChild
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-700"
                  )}
                >
                  <Link to={item.url} onClick={(e) => handleGoTo(e, item.url)}>
                    {item.icon}
                    {item.title}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>

          <SidebarSeparator />

          <div className="mt-2">
            <Profile
              avatar="/images/avatar.png"
              name="Lacasa"
              email="lacasadapapel@suimail"
              onClick={(e) => handleGoTo(e, "/profile")}
            />
          </div>
        </SidebarFooter>
      </Sidebar>

    
    </>
  )
}
