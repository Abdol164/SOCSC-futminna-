import { createBrowserRouter, Navigate } from "react-router-dom"
import SentPage from "./views/mail/sent/page"
import LandingPage from "./views/landing/page"
import InboxPage from "./views/mail/inbox/page"
import EmailView from "./views/mail/[id]"
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
        path: "/",
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
            path: "mail/inbox/:id",
            element: <EmailView />,
          },
          {
            path: "/mail/sent",
            element: <SentPage />,
          },
          {
            path: "/mail/draft",
            element: <p>Draft</p>,
          },
          {
            path: "/mail/spam",
            element: <p>Spam</p>,
          },
          {
            path: "/mail/archive",
            element: <p>Archive</p>,
          },
          {
            path: "/mail/trash",
            element: <p>Trash</p>,
          },
          {
            path: "/mail/compose",
            element: <ComposePage />,
          },
          {
            path: "/account/payment",
            element: <p>Payment</p>,
          },
          {
            path: "/account/subscription",
            element: <p>Subscription</p>,
          },
          {
            path: "/help",
            element: <p>Help</p>,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/profile",
            element: <p>Profile</p>,
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
