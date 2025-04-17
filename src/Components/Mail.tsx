import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Compose from "./Compose";
import Subscription from "./Subscription";
import Settings from "./Settings";

function Mail() {
  const { activeNavItem } = useContext(AppContext) as AppContextProps;
  window.location.hash = "#mail";

  useEffect(() => {
    //console.log(activeNavItem)
  }, [activeNavItem]);

  return (
    <div className="flex h-screen">
      <div className="w-64 border-r border-b-5 border-gray-200 overflow-auto sticky-top">
        <Sidebar />
      </div>
      <div>
        <Navbar activePage={""} profileImageUrl={""} />
      </div>
      {activeNavItem === "Inbox" && <Inbox />}
      {activeNavItem === "Sent" && <Sent />}
      {activeNavItem === "Subscription" && <Subscription />}
      {activeNavItem === "Compose" && <Compose />}
      {activeNavItem === "Settings" && <Settings />}
    </div>
  );
}

export default Mail;
