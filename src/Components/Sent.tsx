import React, { useContext, useEffect, useState } from "react";
import EmailList from "./EmailList";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";


const Sent = () => {
    const { walletAddress, token } = useContext(AppContext) as AppContextProps;
    const [outbox, setOutbox] = useState([]);

    const fetchEmail = async () => {
        const response = await fetch(`https://fc81j2ps-3000.uks1.devtunnels.ms/mail/outbox/${walletAddress}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })

        const responseData = await response.json();
        setOutbox(responseData);
        console.log("Response from server:", responseData);
    }

    useEffect(()=>{
        fetchEmail();
    }, [])
    
    return (
        <div className="flex flex-1 overflow-hidden relative pt-16">
            <div className="flex-1 overflow-auto bg-white shadow-md">
                {outbox.length !==0 && outbox.map((email) => (
                    <EmailList email={email} />
                ))}
            </div>
        </div>
    );
}

export default Sent;