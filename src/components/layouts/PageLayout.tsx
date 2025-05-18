import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading"
import { Button } from "../ui/button"

interface PageLayoutProps {
  loading?: boolean
  isError?: boolean
  retry?: () => void
  children: React.ReactNode
}

export function PageLayout({
  loading = false,
  isError = false,
  retry = () => {},
  children,
}: PageLayoutProps) {
  const navigate = useNavigate()

  if (loading) {
    return <Loading />
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1>Error</h1>
        <Button onClick={retry}>Retry</Button>
        <Button onClick={() => navigate("/")}>Go to home</Button>
      </div>
    )
  }
  return <>{children}</>
}
