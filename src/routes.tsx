import type { RouteObject } from 'react-router-dom'
import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const HeroSection = lazy(() => import('./components/page'))
const About = lazy(() => import('./components/About/page'))
const TeamPage = lazy(() => import('./components/Team/page'))
const Projects = lazy(() => import('./components/Projects/page'))
const Events = lazy(() => import('./components/Events/page'))
const ContactPage = lazy(() => import('./components/Contacts/Contact'))

export const routesConfig: RouteObject[] = [
  {
    path: '/',
    element: <HeroSection />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '/teams',
    element: <TeamPage />,
  },
  {
    path: '/projects',
    element: <Projects />,
  },
  {
    path: '/events',
    element: <Events />, // Fix path to lowercase and with leading slash
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
]

const AppRoutes = () => {
  return useRoutes(routesConfig)
}

export default AppRoutes
