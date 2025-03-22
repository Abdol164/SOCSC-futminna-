import React, { useState, useRef } from "react";
import EmailList from "./Email-list";
import EmailDetailPage from "./Email-view";
import Sidebar from "./Sidebar";
import Navbar from "./navbar";
import ComposeEmail from "./compose";
import OutboxPage from "./outbox";

export default function InboxPage() {
  // State management
  const [activePage, setActivePage] = useState("Inbox");
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [listWidth, setListWidth] = useState(400);
  const [isResizing, setIsResizing] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const containerRef = useRef(null);
  
  const handleCompose = () => {
    setIsComposing(true);
  };

  // Start resizing when mouse is pressed on the resizer
  const handleMouseDown = () => {
    setIsResizing(true);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Adjust width dynamically while dragging
  const handleMouseMove = (e) => {
    if (!isResizing || !containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = Math.min(Math.max(250, e.clientX - containerRect.left), 600);
    setListWidth(newWidth);
  };

  // Stop resizing when mouse is released
  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div ref={containerRef} className="flex h-screen bg-gray-50">
      {/* Sidebar Section */}
      <div className="w-64 border-r border-gray-200 bg-white shadow-md">
        <Sidebar setActivePage={setActivePage} onCompose={handleCompose} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar Section */}
        <div className="fixed top-0 right-0 w-[calc(100%-16rem)] bg-white shadow-md z-50 h-16">
          <Navbar activePage={activePage} onCompose={() => setIsComposing(true)} />
        </div>

        {/* Content Switcher */}
        <div className="flex flex-1 overflow-hidden relative pt-16">
          {activePage === "Inbox" && (
            <div className="flex-1 overflow-auto bg-white shadow-md">
              <EmailList onSelectEmail={setSelectedEmail} />
            </div>
          )}

          {activePage === "Sent" && (
            <div className="flex-1 overflow-auto bg-white shadow-md">
              <OutboxPage />
            </div>
          )}

          {/* Resizer (Visible only when an email is selected) */}
          {selectedEmail && activePage === "Inbox" && (
            <div
              className="w-2 bg-gray-300 cursor-col-resize transition-opacity duration-200 hover:bg-gray-500"
              onMouseDown={handleMouseDown}
            />
          )}

          {/* Email Detail View (Only for Inbox) */}
          {selectedEmail && activePage === "Inbox" && (
            <div className="flex-1 bg-white shadow-md rounded-lg overflow-auto">
              <EmailDetailPage email={selectedEmail} onBack={() => setSelectedEmail(null)} />
            </div>
          )}
        </div>
      </div>

      {/* Compose Email Modal */}
      {isComposing && <ComposeEmail onClose={() => setIsComposing(false)} />}
    </div>
  );
}
