// import React from 'react';
import { useState, useEffect } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { ConnectButton } from "@suiet/wallet-kit";

import { useCustomWallet } from "../utils/contexts/CustomWallet.tsx";
import InboxPage from "./Inbox.jsx";

const wallets = [
  {
    id: "sui-wallet",
    name: "Sui Wallet",
    icon: "/png/Sui Symbol.png", // the images needed
    category: "main",
  },
  {
    id: "suiet",
    name: "Suiet",
    icon: "/png/suiet.png",
    category: "main",
  },
  {
    id: "nightly",
    name: "Nightly",
    icon: "/png/nightly.png",
    category: "main",
  },
  {
    id: "ethos",
    name: "Ethos",
    icon: "/png/ethos.png",
    category: "main",
  },
  {
    id: "martian",
    name: "Martian",
    icon: "/png/martian.png",
    category: "main",
  },
  {
    id: "surf",
    name: "Surf Wallet",
    icon: "/png/surf.png",
    category: "main",
  },
];

const web2Logins = [
  {
    id: "google",
    name: "Google",
    icon: "/path/to/google.png",
  },
  {
    id: "discord",
    name: "Discord",
    icon: "/png/discord-login.png",
  },
];

const WalletConnect = () => {
  const { isConnected, redirectToAuthUrl, address } = useCustomWallet();
  console.log("address", address);
  const handleGoogleLogin = () => {
    redirectToAuthUrl();
  };

  const wallet = useWallet();

  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (!wallet.connected) return;
    setWalletAddress(wallet.account?.address); // Set the wallet address
  }, [wallet.connected]);

  // Log the updated wallet address inside the effect or use it wherever needed
  useEffect(() => {
    console.log(walletAddress); // Logs the updated wallet address
  }, [walletAddress]);

  return (
    <div>
      {isConnected ? (
        <InboxPage />
      ) : (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-500 flex items-center justify-center gap-2">
                <img
                  src="/png/suimail-mark.png"
                  alt="SUIMAIL"
                  className="w-6 h-6"
                />
                SUIMAIL
              </h1>
              <h2 className="text-xl font-semibold mt-4 text-gray-700">
                Login
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {/* {wallets.map(wallet => (
              <button
                key={wallet.id}
                className="p-4 rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center gap-2"
              >
                <img 
                  src={wallet.icon} 
                  alt={wallet.name} 
                  className="w-8 h-8 object-contain"
                />
                <span className="text-sm text-gray-600 font-medium">{wallet.name}</span>
              </button>
            ))} */}
              <div className="col-span-3 flex justify-center items-center">
                <ConnectButton
                  style={{
                    background:
                      "linear-gradient(to bottom, #21C1FF 30%, #1B7CE6 70%)",
                    alignSelf: "center",
                  }}
                  className=""
                  connectText={
                    <div className="">
                      <img src="logo" alt="" />
                      <p>{walletAddress ? walletAddress : "Login"}</p>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">Web2 Login</p>
              <div className="flex justify-center gap-4">
                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors" onClick={handleGoogleLogin}>
                  <img
                    src="/path/to/google.png"
                    alt="Google"
                    className="w-6 h-6 object-contain"
                  />
                </button>

                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <img
                    src="/png/discord-login.png"
                    alt="Discord"
                    className="w-6 h-6 object-contain"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      ;
    </div>
  );
};

export default WalletConnect;
