import { ArrowLeft, Search, X } from "lucide-react"
import { Button } from "./ui/button"
import { SidebarTrigger } from "./ui/sidebar"
import { Input } from "./ui/input"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

interface ExtendedToolbarProps {
  canGoBack?: boolean
  getPageTitle?: () => string
  addCTA?: React.ReactNode
}

export function ExtendedToolbar({
  canGoBack = false,
  getPageTitle = () => "Inbox",
  addCTA,
}: ExtendedToolbarProps) {
  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className="w-full flex items-center h-14 px-4 border-b border-gray-200">
      <div className="flex items-center gap-2">
        <SidebarTrigger />

        {canGoBack && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="mr-1"
            aria-label="Go back"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}

        {!searchOpen && (
          <h1 className="text-lg font-medium ml-2">{getPageTitle()}</h1>
        )}
      </div>

      <div className="ml-auto flex items-center gap-2">
        {searchOpen ? (
          <div className="relative flex items-center">
            <Input
              type="search"
              placeholder="Search emails..."
              className="w-[300px] pr-8"
              autoFocus
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0"
              onClick={() => setSearchOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(true)}
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </Button>
        )}

        {addCTA && addCTA}
      </div>
    </div>
  )
}
