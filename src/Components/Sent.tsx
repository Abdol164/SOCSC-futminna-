import React, { useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import EmailList from "./EmailList";
import EmailView from "./EmailView";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";

const Sent: React.FC = () => {
  const { walletAddress, token, activeNavItem } = useContext(AppContext) as AppContextProps;
  const [outbox, setOutbox] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any | null>(null);

  const isDesktop = useMediaQuery({ minWidth: 1024 });

  const fetchEmail = async () => {
    try {
      const response = await fetch(`https://fc81j2ps-3000.uks1.devtunnels.ms/mail/outbox/${walletAddress}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      const responseData = await response.json();
      console.log('Outbox response:', responseData);
      setOutbox(responseData);
    } catch (err) {
      console.error("Failed to fetch inbox, using default test data.", err);
      // Fallback default data
      setOutbox([
        {
          subject: "Welcome to SuiMail!",
          from: "support@suimail.com",
          to: walletAddress,
          date: new Date().toISOString(),
          senderImage: "/png/profile.png",
          attachments: [{ name: "welcome.pdf", url: "#" }],
          body: "Hi there! Thanks for signing up with SuiMail. We're glad to have you on board!",
        },
        {
          subject: "Security Alert",
          from: "security@suimail.com",
          to: walletAddress,
          date: new Date().toISOString(),
          senderImage: "/png/profile.png",
          attachments: [],
          body: "We noticed a new login to your account. If this wasn't you, please reset your password.",
        },
      ]);
    }
  };

  useEffect(() => {
    fetchEmail();
  }, [activeNavItem]);

  return (
    <div className={`flex flex-col h-screen pt-${isDesktop ? 16 : 5}`}>
      {selectedEmail ? (
        <div className="w-full h-full">
          <EmailView
            email={selectedEmail}
            body={selectedEmail.body}
            onBack={() => setSelectedEmail(null)}
          />
        </div>
      ) : (
        //  Email List
        <div className="w-full h-full overflow-y-auto border-r border-gray-200">
          {outbox.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">Outbox loading....</p>
          ) : (
            outbox
              .slice() // Create a shallow copy of the array
              .reverse() // Reverse the order of the array
              .map((email, index) => (
                <div key={index} onClick={() => setSelectedEmail(email)}>
                  <EmailList email={email} />
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default Sent;