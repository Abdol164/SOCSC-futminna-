import { createBrowserRouter, Navigate } from "react-router-dom"
import SentPage from "./views/mail/sent/page"
import LandingPage from "./views/landing/page"
import InboxPage from "./views/mail/inbox/page"
import ComposePage from "./views/mail/compose/page"
import SettingsPage from "./views/mail/settings/page"
import { DashboardLayout } from "./components/layouts/DashboardLayout"
import { MailBoardLayout } from "./components/layouts/MailBoardLayout"

const routes = createBrowserRouter([
  {
    index: true,
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/mail",
        element: <MailBoardLayout />,
        children: [
          {
            path: "/mail",
            element: <InboxPage />,
          },
          {
            path: "/mail/inbox",
            element: <InboxPage />,
          },
          {
            path: "/mail/sent",
            element: <SentPage />,
          },
          {
            path: "/mail/compose",
            element: <ComposePage />,
          },
          {
            path: "/mail/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

export default routes
