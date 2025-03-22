import React, { useState, useEffect } from "react";
import { RefreshCcw, MoreVertical, Trash2 } from "lucide-react";
import EmailDetailPage from "./Email-view";

export default function OutboxPage() {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedEmails, setSelectedEmails] = useState([]);

  useEffect(() => {
    let storedEmails = JSON.parse(localStorage.getItem("sentEmails") || "[]");

    if (storedEmails.length === 0) {
      storedEmails = [
        {
          id: 1,
          to: "john@example.com",
          subject: "Meeting Reminder",
          body: "Hey John, just a reminder about our meeting tomorrow at 10 AM.",
          timestamp: "March 20, 2025, 10:00 AM",
        },
        {
          id: 2,
          to: "jane@example.com",
          subject: "Project Update",
          body: "Hi Jane, the latest project updates are attached. Let me know your thoughts.",
          timestamp: "March 21, 2025, 3:45 PM",
        },
        {
          id: 3,
          to: "mark@example.com",
          subject: "Invoice Details",
          body: "Mark, please find the invoice details for last month attached.",
          timestamp: "March 22, 2025, 9:30 AM",
        },
      ];
      localStorage.setItem("sentEmails", JSON.stringify(storedEmails));
    }

    setSentEmails(storedEmails);
  }, []);

  // Toggle email selection
  const toggleSelectEmail = (id) => {
    setSelectedEmails((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((emailId) => emailId !== id)
        : [...prevSelected, id]
    );
  };

  // Delete selected emails
  const deleteSelectedEmails = () => {
    const updatedEmails = sentEmails.filter((email) => !selectedEmails.includes(email.id));
    setSentEmails(updatedEmails);
    localStorage.setItem("sentEmails", JSON.stringify(updatedEmails));
    setSelectedEmails([]);
  };

  return (
    <div className="bg-gray-100 pt-4 pl-2">
      <div className="w-full bg-white rounded-lg shadow p-2">
        <div className="w-full flex flex-col bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-800">Outbox (Sent Emails)</h2>
            <div className="flex items-center space-x-2">
              <button onClick={() => window.location.reload()} className="p-1 rounded-full hover:bg-gray-100">
                <RefreshCcw size={18} className="text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100" onClick={deleteSelectedEmails} disabled={selectedEmails.length === 0}>
                <Trash2 size={18} className={`text-gray-500 ${selectedEmails.length === 0 ? "opacity-50 cursor-not-allowed" : "hover:text-red-500"}`} />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <MoreVertical size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto scrollbar-hide max-h-[calc(100vh-100px)]">
            {selectedEmail ? (
              <EmailDetailPage email={selectedEmail} onBack={() => setSelectedEmail(null)} />
            ) : (
              sentEmails.length > 0 ? (
                sentEmails.map((email) => (
                  <div
                    key={email.id}
                    className="border-b border-gray-200 px-4 py-4 flex items-center cursor-pointer hover:bg-gray-100"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(email.id)}
                      onChange={() => toggleSelectEmail(email.id)}
                      className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
                      onClick={(e) => e.stopPropagation()}
                    />
                    <div className="flex-1" onClick={() => setSelectedEmail(email)}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <img className="h-8 w-8 rounded-full" src="/png/profile.png" alt={`${email.to} avatar`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-gray-900">{email.to}</p>
                            <p className="text-xs text-gray-500">{email.timestamp}</p>
                          </div>
                          <p className="text-sm mt-1 truncate text-gray-900">
                            {email.subject} - {email.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No sent emails available.
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
