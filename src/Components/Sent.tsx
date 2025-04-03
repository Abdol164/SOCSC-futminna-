import React from "react";
import { useContext, useEffect } from "react";
// import EmailList from "./Email-list";
// import EmailDetailPage from "./Email-view";
import Sidebar from "./Sidebar";
// import Navbar from "./navbar";
import { AppContext } from "../utils/contexts/AppContext";
// import PropTypes from "prop-types";

export default function SentPage() {
    // const { setNewbie, walletAddress, activePage } = useContext(AppContext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (walletAddress) {
    //             try {
    //                 const response = await fetch("http://localhost:3000/mail/outbox", {
    //                     method: "POST",
    //                     headers: {
    //                         "Content-Type": "application/json",
    //                     },
    //                     body: JSON.stringify({ address: walletAddress }),
    //                 });
    //                 const result = await response.json();
    //                 setNewbie(result.newbie);
    //             } catch (err) {
    //                 console.log(err);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [setNewbie, walletAddress]);

    return (
        <>
            <div>Sent</div>
        </>
        // <div className="flex h-screen">
        //     {activePage === "Sent" && (
        //         <>
        //             <div className="flex h-screen">
        //                 {/* Navbar */}
        //                 <div className="fixed border-b-2 top-0 right-0 w-4/5 bg-white z-50">
        //                     <Navbar activePage="Sent" />
        //                 </div>

        //                 {/* Sidebar */}
        //                 <div className="w-64 border-r border-b-5 border-gray-200 overflow-auto sticky-top">
        //                     <Sidebar activePage="Sent" setActivePage={() => { }} />
        //                 </div>

        //                 {/* EmailList */}
        //                 <div className="w-80 mt-20 border-r border-gray-200">
        //                     <EmailList type="outbox" typeMessage="outboxMessage" />
        //                 </div>

        //                 {/* EmailView */}
        //                 <div className="flex-1 mt-20 overflow-auto">
        //                     <EmailDetailPage />
        //                 </div>
        //             </div>
        //         </>
        //     )}
        //     {/* {activePage === "Inbox" && <SentPage/>} */}
        // </div>

    );
}