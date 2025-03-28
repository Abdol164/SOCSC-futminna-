import React, { useState, useEffect } from "react";
import { RefreshCcw, MoreVertical } from "lucide-react";
import EmailDetailPage from "./Email-view";

export default function OutboxPage() {
  const [sentEmails, setSentEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);

  useEffect(() => {
    let storedEmails = JSON.parse(localStorage.getItem("sentEmails") || "[]");

    if (storedEmails.length === 0) {
      storedEmails = [
        {
          id: 1,
          to: "john@example.com",
          sender: "You",
          subject: "Meeting Reminder",
          content: "Hey John, just a reminder about our meeting tomorrow at 10 AM.",
          date: "March 20, 2025, 10:00 AM",
        },
        {
          id: 2,
          to: "jane@example.com",
          sender: "You",
          subject: "Project Update",
          content: "Hi Jane, the latest project updates are attached. Let me know your thoughts.",
          date: "March 21, 2025, 3:45 PM",
        },
        {
          id: 3,
          to: "mark@example.com",
          sender: "You",
          subject: "Invoice Details",
          content: "Mark, please find the invoice details for last month attached.",
          date: "March 22, 2025, 9:30 AM",
        },
      ];
      localStorage.setItem("sentEmails", JSON.stringify(storedEmails));
    }

    setSentEmails(storedEmails);
  }, []);

  return (
    <div className="bg-gray-100 pt-4 pl-2">
      <div className="w-full bg-white rounded-lg shadow p-2">
        <div className="w-full flex flex-col bg-gray-50">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button onClick={() => window.location.reload()} className="p-1 rounded-full hover:bg-gray-100">
                <RefreshCcw size={18} className="text-gray-500" />
              </button>
              <button className="p-1 rounded-full hover:bg-gray-100">
                <MoreVertical size={18} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* Email List or Detail Page */}
          <div className="flex-1 overflow-y-auto scrollbar-hide max-h-[calc(100vh-100px)]">
            {selectedEmail ? (
              <EmailDetailPage email={selectedEmail} onBack={() => setSelectedEmail(null)} />
            ) : (
              sentEmails.length > 0 ? (
                sentEmails.map((email) => (
                  <div
                    key={email.id}
                    className="border-b border-gray-200 px-4 py-4 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSelectedEmail(email)}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-3">
                        <img className="h-8 w-8 rounded-full" src="/png/profile.png" alt={`${email.to} avatar`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">{email.to}</p>
                          <p className="text-xs text-gray-500">{email.date}</p>
                        </div>
                        <p className="text-sm mt-1 truncate text-gray-900">
                          {email.subject} - {email.content}
                        </p>
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
