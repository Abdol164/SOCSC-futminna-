import React, { useEffect, useContext, useState } from "react";
import { useWallet } from "@suiet/wallet-kit";
import { ConnectButton, useWallets, useCurrentAccount, useConnectWallet, useAutoConnectWallet } from '@mysten/dapp-kit';

import "../App.css";
import "@suiet/wallet-kit/style.css";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
import Mail from "./Mail";
import { useNavigate } from "react-router-dom";
import PadlockLoader from "./PadlockLoader";
import { isEnokiWallet, EnokiWallet, AuthProvider } from '@mysten/enoki';

import { Transaction } from '@mysten/sui/transactions';


function Connect() {
  const { setConnectionState, setWalletAddress, setToken, token } = useContext(AppContext) as AppContextProps;
  const wallet = useWallet();
  const navigate = useNavigate();
  const currentAccount = useCurrentAccount();
  const autoConnectionStatus = useAutoConnectWallet();
  const { mutateAsync: connect } = useConnectWallet();

  const wallets = useWallets().filter(isEnokiWallet);
  const walletsByProvider = wallets.reduce(
    (map, wallet) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>(),
  );
  console.log(wallets);

  const googleWallet = walletsByProvider.get('google');
  console.log('currentAccount:(connect)', currentAccount?.address);
  console.log(connect);

  const handleConnect = async () => {
    try {
      const response = await fetch(`https://suimail-backend.onrender.com/user/login/${currentAccount?.address}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ address: currentAccount?.address }),
      });

      if (!response.ok) {
        console.error("Failed to fetch:", response.status, response.statusText);
        return;
      }

      const responseData = response.headers.get("Content-Length") !== "0" ? await response.json() : {};
      console.log("Response from server:", responseData);

      if (responseData.token) {
        setToken(responseData.token);
      }
      else {
        console.warn("No token received in response");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    console.log('inside useEffect');
    if (currentAccount && !token) {
      handleConnect();
    }
    if (token) {
      navigate("/mail");
    }
    if (currentAccount) {
      setWalletAddress(currentAccount.address || "");
    }
    setConnectionState(currentAccount ? "connected" : "disconnected");
  }, [
    currentAccount,
    setWalletAddress,
    setConnectionState,
    token,
  ]);

  return (
    <div>
      {currentAccount ? (
        <PadlockLoader />
      ) : (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login Your Suimail Account
          </h1>
          <div className="space-y-6">
            <div className="flex justify-center">
              <div style={{ padding: 20 }}>
                <ConnectButton />
                <ul>
                  {wallets.map((wallet) => (
                    <li key={wallet.name}>
                      <button
                        onClick={() => {
                          connect(
                            { wallet },
                            {
                              onSuccess: () => console.log('connected'),
                            },
                          );
                        }}
                      >
                        Connect to {wallet.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>  
            </div>
            {googleWallet ? (
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  connect({ wallet: googleWallet });
                }}
              >
                <img src="/png/Google.png" alt="Google" className="w-6 h-6 mr-2" />
                Sign in with Google
              </button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

export default Connect;
