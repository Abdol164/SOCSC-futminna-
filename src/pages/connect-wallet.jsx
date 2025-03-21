// import React from 'react';
import { useState, useEffect, useContext } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { ConnectButton } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { useCustomWallet } from "../utils/contexts/CustomWallet.tsx";
import InboxPage from "./Inbox.jsx";
import axios from "axios";
import { AppContext } from '../utils/contexts/AppContext';

const WalletConnect = () => {
  const { sharedState, setSharedState } = useContext(AppContext);
  const { responseData, setResponseData } = useState();
  const { isConnected, redirectToAuthUrl, address } = useCustomWallet();
  console.log("address", address);
  const handleGoogleLogin = () => {
    redirectToAuthUrl();
  };

  const wallet = useWallet();

  const [walletAddress, setWalletAddress] = useState("");
  const handleConnect = () => {
    // Update shared state
    setSharedState({ ...sharedState, walletConnected: true });
  };

  useEffect(() => {
    if (!wallet.connected) return;
    setWalletAddress(wallet.account?.address); // Set the wallet address
  }, [wallet.connected]);

  // Log
  useEffect(async() => {
    if (walletAddress) {
      // Send the wallet address to the backend
      // axios
      //   .post("http://localhost:5000/user/login", { walletAddress })
      //   .then((response) => {
      //     console.log("Response from backend:", response.data);
      //   })
      //   .catch((error) => {
      //     console.error("Error sending wallet address to backend:", error);
      //   });
      try{
        const response = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ walletAddress }),
        })
      }catch(err){
        console.log(err)
      }

      const result = await response.json();
      setResponseData(result);
      console.log(result.message)

    }
  }, [walletAddress]);

  return (
    <div>
      {isConnected || wallet.connected ? (
        <InboxPage />
      ) : (
        <div
          className="min-h-screen bg-gray-100 flex items-center justify-center p-4 absolute inset-0 bg-black bg-opacity-10"
          style={{ backgroundImage: "url('/png/brand.png" }}
        >
          <div
            className="bg-black rounded-2xl  p-10 w-   bg-black bg-opacity-50 backdrop-blur-md "
            style={{ backgroundImage: "url('/" }}
          >
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-blue-500 flex items-center justify-center gap-2">
                <img
                  src="/png/suimail-mark.png"
                  alt="SUIMAIL"
                  className="w-6 h-6"
                />
                SUIMAIL
              </h1>
              <h2 className="text-xl font-semibold mt-4 text-white">Login</h2>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="col-span-3 flex justify-center items-center">
                <ConnectButton
                  style={{
                    background:
                      "linear-gradient(to bottom, #21C1FF 30%, #1B7CE6 70%)",
                    alignSelf: "center",
                  }}
                  className=""
                  connectText={
                    <div className="wkit-button">
                      <img src="logo" alt="" />
                      <p>
                        {walletAddress ? walletAddress : "Login"}connect wallet
                      </p>
                    </div>
                  }
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-sm text-white mb-4">Web2 Login</p>
              <div className="flex justify-center gap-4">
                <button
                  className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                  onClick={handleGoogleLogin}
                >
                  <img
                    src="/png/Google.png"
                    alt="Google"
                    className="w-6 h-6 object-contain"
                  />
                </button>

                <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <img
                    src="/png/apple.png"
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
