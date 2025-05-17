import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../Sidebar"

export function MailBoardLayout() {
  const [isSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100">
      <div
        className={`bg-white w-64 shadow-md z-30 transform transition-transform duration-200 fixed md:static h-full top-0 left-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <div className="flex-1 overflow-y-auto px-3 py-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
