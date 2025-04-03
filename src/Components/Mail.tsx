import React, { useContext } from "react";
import Sidebar from "./Sidebar";
import { AppContext } from "../utils/contexts/AppContext";
import Inbox from "./Inbox";
import Sent from "./Sent";

function Mail() {
    window.location.hash = "#mail";

    const appContext = useContext(AppContext);
    if (!appContext) {
        throw new Error("AppContext is not provided");
    }

    const { activeNavItem } = appContext;
    
    return (
        <div className="flex h-screen">
            <div className="w-64 border-r border-b-5 border-gray-200 overflow-auto sticky-top">
                <Sidebar />
            </div>
            {activeNavItem === "Inbox" && (<Inbox/>)}
            {activeNavItem === "Sent" && (<Sent/>)}

        </div>
    );
};

export default Mail;