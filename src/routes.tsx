import { createBrowserRouter, Navigate } from "react-router-dom"
import SentPage from "./views/mail/sent/page"
import LandingPage from "./views/landing/page"
import InboxPage from "./views/mail/inbox/page"
import EmailView from "./views/mail/[id]"
import DraftsPage from "./views/mail/drafts/page"
import ComposePage from "./views/mail/compose/page"
import SettingsPage from "./views/mail/settings/page"
import SubscriptionPage from "./views/accounts/subscription/page"
import HelpPage from "./views/accounts/help/page"
import { DashboardLayout } from "./components/layouts/DashboardLayout"
import { MailBoardLayout } from "./components/layouts/MailBoardLayout"
import TrashPage from "./views/mail/trash/page"
import OnboardingPage from "./views/onboarding/page"

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
        path: "/onboarding",
        element: <OnboardingPage />,
      },
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
            path: "/mail/sent/:id",
            element: <EmailView />,
          },
          {
            path: "/mail/draft",
            element: <DraftsPage />,
          },
          {
            path: "/mail/draft/:id",
            element: <EmailView />,
          },
          {
            path: "/mail/trash",
            element: <TrashPage />,
          },
          {
            path: "/mail/compose",
            element: <ComposePage />,
          },
          {
            path: "/account/subscription",
            element: <SubscriptionPage />,
          },
          {
            path: "/account/help",
            element: <HelpPage />,
          },
          {
            path: "/settings",
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
