import React, { useState, useContext } from "react";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
// import SubnameManager from "./SubnameManager"; // extracted from ClaimNameUI
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
  const { mailFee, setMailFee, walletAddress, token } = useContext(AppContext) as AppContextProps;

  const handleDone = async () => {
    try {
      const response = await fetch(`https://suimail-backend.onrender.com/settings/mailFee/${walletAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fee: mailFee }),
      });
  
      if (response.ok) {
        alert("Mail fee updated successfully!");
      } else {
        alert("Failed to update mail fee. Please try again.");
      }
    } catch (error) {
      console.error("Error updating mail fee:", error);
      alert("An error occurred. Please try again.");
    }
  };


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
              className={`flex items-center px-5 py-3 cursor-pointer rounded-lg transition ${activeTab === label
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
        {/* {activeTab === "Subname" && <SubnameManager />} */}
        {activeTab === "Notifications" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        )}
        {activeTab === "Account" && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <p className="text-gray-500 mb-4">Manage your personal info, wallet, and linked accounts.</p>
            <div>
              <h3 className="text-lg font-medium mb-2">Set SUI Amount Per Mail</h3>
              <div className="flex flex-col gap-4">
                <input
                  type="range"
                  min="0"
                  max="0.1"
                  step="0.01"
                  onChange={(e) => setMailFee(parseFloat(e.target.value))}
                  value={mailFee}
                  className="w-full"
                />
                <p className="text-gray-700">
                  Selected Amount: <span id="selectedAmount">{mailFee}</span> SUI
                </p>
                <button
                  onClick={handleDone}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Done
                </button>
              </div>
            </div>
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
