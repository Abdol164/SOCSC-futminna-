import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Inbox from "./Inbox";
import Sent from "./Sent";
import Compose from "./Compose";

function Mail() {
    const { activeNavItem } = useContext(AppContext) as AppContextProps;
    window.location.hash = "#mail";
    
    return (
        <div className="flex h-screen">
            <div className="w-64 border-r border-b-5 border-gray-200 overflow-auto sticky-top">
                <Sidebar />
            </div>
            {activeNavItem === "Inbox" && (<Inbox/>)}
            {activeNavItem === "Sent" && (<Sent/>)}
            {activeNavItem === "Compose" && (<Compose/>)}

        </div>
    );
};

export default Mail;