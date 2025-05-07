import React, { useContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Compose from "./Compose";
import Settings from "./Settings";
import Subscription from "./Subscription";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import { Pencil, X } from "lucide-react";

const Mail: React.FC = () => {
  const { activeNavItem, setActiveNavItem } = useContext(AppContext) as AppContextProps;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [showCompose, setShowCompose] = useState(false);
  // const [isDesktop, setIsDesktop] = useState(true);

  // useEffect(() => {
  //   const checkScreenSize = () => setIsDesktop(window.innerWidth >= 768);
  //   checkScreenSize();
  //   window.addEventListener("resize", checkScreenSize);
  //   return () => window.removeEventListener("resize", checkScreenSize);
  // }, []);

  // useEffect(() => {
  //   if (!activeNavItem) setActiveNavItem("Inbox");
  // }, [activeNavItem, setActiveNavItem]);

  const renderActiveView = () => {
    switch (activeNavItem) {
      case "Inbox":
        return <Inbox />;
      case "Sent":
        return <Sent />;
      case "Compose":
        return <Compose />;
      case "Settings":
        return <Settings />;
      default:
        return <Inbox />;
    }
  };

  // const handleComposeClick = () => {
  //   if (isDesktop) {
  //     setShowCompose(true);
  //   } else {
  //     setActiveNavItem("Compose");
  //   }
  // };

  return (
    <div
      className="flex flex-col md:flex-row h-screen overflow-hidden bg-gray-100"
    >
      {/* Mobile Top Bar */}
      {/* <div className="md:hidden flex items-center gap-2 p-2 bg-white shadow sticky top-0 z-20">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <input
          type="text"
          placeholder="Search in mail"
          className="flex-1 p-2 border rounded-md text-sm bg-gray-100 focus:outline-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img src="/png/profile.png" alt="Profile" className="w-8 h-8 rounded-full" />
      </div> */}

      {/* Sidebar */}
      <div
        className={`bg-white w-64 shadow-md z-30 transform transition-transform duration-200 fixed md:static h-full top-0 left-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
      >
        <Sidebar
        // onNavChange={(tab) => {
        //   setActiveNavItem(tab);
        //   if (window.innerWidth < 768) setIsSidebarOpen(false);
        // }} 
        />
      </div>

      {/* Main View */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Desktop Navbar */}
        {/* <div className="hidden md:block">
          <Navbar profileImageUrl="/png/profile.png" />
        </div> */}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-3 py-1">{renderActiveView()}</div>
      </div>

      {/* Floating Compose Button (always visible) */}
      {/* <button
        onClick={handleComposeClick}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-40"
        title="Compose"
      >
        <Pencil className="w-5 h-5" />
      </button> */}

      {/* Gmail-style Compose Overlay (desktop only) */}
      {/* {isDesktop && showCompose && (
        <div className="fixed bottom-4 right-4 md:right-6 w-[95%] sm:w-[80%] md:w-[450px] bg-white shadow-xl rounded-xl z-50 overflow-hidden animate-slideUp border border-gray-200">
          <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b">
            <span className="font-semibold text-gray-800">New Message</span>
            <button onClick={() => setShowCompose(false)} className="text-gray-600 hover:text-red-500">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="max-h-[80vh] overflow-y-auto p-4">
            <Compose onDone={() => setShowCompose(false)} />
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Mail;
