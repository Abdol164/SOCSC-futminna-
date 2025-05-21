import { useNavigate } from "react-router-dom"
import { Plus } from "lucide-react"

export function ComposeButton() {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate("/mail/compose")}
      className="fixed bottom-6 right-6 flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-700 hover:shadow-xl md:bottom-8 md:right-8 md:px-6 md:py-3 md:text-base"
    >
      <Plus className="h-4 w-4" />
      <span>Compose</span>
    </button>
  )
}
