import React, { useEffect, useContext } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "../App.css";
import "@suiet/wallet-kit/style.css";
import { useCustomWallet } from "../utils/contexts/CustomWallet.tsx";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Mail from "./Mail";

function Connect() {
  const { setConnectionState, setWalletAddress, setToken } = useContext(
    AppContext
  ) as AppContextProps;
  const { isConnected, redirectToAuthUrl, address } = useCustomWallet();

  const wallet = useWallet();
  window.location.hash = "#connect";

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
    const authToken = responseData.token;
    setToken(authToken);
  };

  useEffect(() => {
    if (wallet.connected) {
      handleConnect();
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md">
        {wallet.connected ? (
          <Mail />
        ) : (
          <>
            <ConnectButton className="mb-4" />
            <button
              className="flex items-center justify-center w-full p-3 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              onClick={handleGoogleLogin}
            >
              <img
                src="/png/Google.png"
                alt="Google"
                className="w-6 h-6 mr-2"
              />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Connect;
