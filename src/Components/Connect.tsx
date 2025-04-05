import React, { useEffect, useContext} from "react";
import {
    ConnectButton,
    useWallet,
} from "@suiet/wallet-kit";
import '../App.css'
import "@suiet/wallet-kit/style.css";
import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
// import PadlockLoader from "./PadlockLoader";
import Mail from "./Mail";

function Connect() {
    const { setConnectionState, setWalletAddress, setToken } = useContext(AppContext) as AppContextProps;

    const wallet = useWallet();
    window.location.hash = "#connect";

    const handleConnect = async () => {
        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address: wallet.account?.address }),
        })

        const responseData = await response.json();
        console.log("Response from server:", responseData);
        const authToken = responseData.token;
        setToken(authToken);
    }

    useEffect(() => {
        console.log('Inside useEffect');
        if (wallet.connected) {
            handleConnect();
        }
        setWalletAddress(wallet.account?.address || "");
        setConnectionState(wallet.connected ? "connected" : "disconnected");
        console.log("Wallet connected:", wallet.connected);
        console.log("Wallet address:", wallet.account?.address);
    }, [wallet.connected, wallet.account?.address, setWalletAddress, setConnectionState]);

    return (
        <div className="App">
            {wallet.connected ? (
                // <PadlockLoader />
                <Mail />
            ) : (
                <ConnectButton />
            )}
        </div>
    )
}

export default Connect;