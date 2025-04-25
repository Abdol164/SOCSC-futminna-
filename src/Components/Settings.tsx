import React, { useState } from "react";
import SubnameManager from "./SubnameManager"; // extracted from ClaimNameUI
import { IoPersonOutline, IoNotificationsOutline, IoWalletOutline, IoSettingsOutline } from "react-icons/io5";

interface Tab {
  label: string;
  icon: React.ReactNode;
}

const tabs: Tab[] = [
  { label: "Subname", icon: <IoWalletOutline /> },
  { label: "Notifications", icon: <IoNotificationsOutline /> },
  { label: "Account", icon: <IoPersonOutline /> },
  { label: "Preferences", icon: <IoSettingsOutline /> },
];

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Subname");

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white shadow-sm border-r">
        <div className="px-6 py-5 font-bold text-xl text-blue-600">Settings</div>
        <ul className="space-y-1 px-2">
          {tabs.map(({ label, icon }) => (
            <li
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center px-5 py-3 cursor-pointer rounded-lg transition ${
                activeTab === label
                  ? "bg-blue-100 text-blue-700 font-semibold"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span className="mr-3 text-lg">{icon}</span>
              {label}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white shadow-inner">
        {activeTab === "Subname" && <SubnameManager />}
        {activeTab === "Notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
        {activeTab === "Account" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-500">Manage your personal info, wallet, and linked accounts.</p>
          </div>
        )}
        {activeTab === "Preferences" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Preferences</h2>
            <p className="text-gray-500">Theme, language, and display settings coming soon.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Settings;
