import React, { useContext, useState } from "react";
import EmailList from "./EmailList";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

const Inbox = () => {

  const { walletAddress, token } = useContext(AppContext) as AppContextProps;
  const [inbox, setInbox] = useState([]);

  const fetchEmail = async () => {
    const response = await fetch(`http://localhost:3000/mail/inbox/${walletAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    })

    const responseData = await response.json();
    setInbox(responseData);
    console.log("Response from server:", responseData);
  }

  fetchEmail();

  return (
    <div className="flex flex-1 overflow-hidden relative pt-16">
      <>
        <div className="flex-1 overflow-auto bg-white shadow-md">
          {inbox.map((email, index) => (
            <EmailList key={index} email={email} />
          ))}
        </div>
      </>
    </div>
  );
}


export default Inbox;
