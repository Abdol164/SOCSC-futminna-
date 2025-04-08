import React, { useContext, useEffect, useState } from "react";
import EmailList from "./EmailList";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

const Inbox = () => {
  let responseData;

  const { walletAddress, token } = useContext(AppContext) as AppContextProps;
  const [inbox, setInbox] = useState([]);

  const fetchEmail = async () => {
    const response = await fetch(`http://localhost:3000/mail/inbox/${walletAddress}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    })

    responseData = await response.json();
    console.log("Inbox Response from server:", responseData);
    setInbox(responseData);
    console.log("Inbox: ", inbox)
  }
  
  useEffect(() => {
    fetchEmail();
  }, [])

  return (
    <div className="flex flex-1 overflow-hidden relative pt-16">
        <div className="flex-1 overflow-auto bg-white shadow-md">
          {inbox.length === 0 ? (
            <p className="text-center text-gray-500">No emails found</p>
          ) : (
            inbox.map((email) => (
              <EmailList email={email} />
            ))
          )}
          {/* <EmailList />
          <EmailList />
          <EmailList /> */}
        </div>
    </div>
  );
}


export default Inbox;
