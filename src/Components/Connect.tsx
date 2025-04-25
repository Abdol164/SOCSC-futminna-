import React, { useEffect, useContext, useState } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "../App.css";
import "@suiet/wallet-kit/style.css";
import { useCustomWallet } from "../utils/contexts/CustomWallet";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Mail from "./Mail";


function Connect() {
  const { setConnectionState, setWalletAddress, setToken } = useContext(AppContext) as AppContextProps;
  const { isConnected, redirectToAuthUrl, address } = useCustomWallet();
  const wallet = useWallet();

  const [loading, setLoading] = useState(true);

  const handleGoogleLogin = () => {
    console.log("Google login button clicked");
    redirectToAuthUrl();
  };

  const handleConnect = async () => {
    const response = await fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: wallet.account?.address }),
    });

    const responseData = await response.json();
    console.log("Response from server:", responseData);
    setToken(responseData.token);
  };

  const checkSuimailSubname = async () => {
    if (!wallet.account?.address) return;
    setLoading(false);
  };

  useEffect(() => {
    if (wallet.connected) {
      handleConnect();
      setLoading(false);
    }
    setWalletAddress(wallet.account?.address || "");
    setConnectionState(wallet.connected ? "connected" : "disconnected");
  }, [
    wallet.connected,
    wallet.account?.address,
    setWalletAddress,
    setConnectionState,
  ]);

  return (
    <div className={wallet.connected ? "min-h-screen bg-white" : "flex flex-col items-center justify-center min-h-screen bg-white"}>
      {wallet.connected ? (
        loading ? (
          <div className="text-white text-xl font-semibold">Checking username...</div>
        ) : (
          <Mail />
        )
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login Your Suimail Account
          </h1>
          <form className="space-y-6">
            <div className="flex justify-center">
              <ConnectButton className="mb-4" />
            </div>
            <button
              type="button"
              className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
              onClick={handleGoogleLogin}
            >
              <img src="/png/Google.png" alt="Google" className="w-6 h-6 mr-2" />
              Sign in with Google
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Connect;
