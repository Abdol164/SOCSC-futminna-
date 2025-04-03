import React from "react";
import Sidebar from "./Sidebar";

function Mail() {
    window.location.hash = "#mail";
    
    return (
        <div className="w-64 border-r border-b-5 border-gray-200 overflow-auto sticky-top">
            <Sidebar />
        </div>
    );
};

export default Mail;