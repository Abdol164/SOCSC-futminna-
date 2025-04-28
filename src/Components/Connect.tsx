import React, { useEffect, useContext } from "react";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "../App.css";
import "@suiet/wallet-kit/style.css";
import { useCustomWallet } from "../utils/contexts/CustomWallet";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Mail from "./Mail";
import { useNavigate } from "react-router-dom";
import PadlockLoader from "./PadlockLoader";


function Connect() {
  const { setConnectionState, setWalletAddress, setToken, token } = useContext(AppContext) as AppContextProps;
  const { isConnected, redirectToAuthUrl, address } = useCustomWallet();
  const wallet = useWallet();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    console.log("Google login button clicked");
    redirectToAuthUrl();
  };

  const handleConnect = async () => {
    const response = await fetch("https://fc81j2ps-3000.uks1.devtunnels.ms/user/login", {
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

  // const checkSuimailSubname = async () => {
  //   if (!wallet.account?.address) return;
  //   setLoading(false);
  // };

  useEffect(() => {
    console.log('address:', wallet.account?.address);
    if (wallet.connected && !token) {
      handleConnect();
    }
    if (token){
      navigate("/mail");
    }
    setWalletAddress(wallet.account?.address || "");
    setConnectionState(wallet.connected ? "connected" : "disconnected");
  }, [
    wallet.connected,
    wallet.account?.address,
    setWalletAddress,
    setConnectionState,
    token,
  ]);

  return (
    <div className={wallet.connected ? "min-h-screen bg-white" : "flex flex-col items-center justify-center min-h-screen bg-white"}>
      {wallet.connected ? (
        <PadlockLoader/>
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login Your Suimail Account
          </h1>
          <div className="space-y-6">
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
          </div>
        </div>
      )}
    </div>
  );
}

export default Connect;
