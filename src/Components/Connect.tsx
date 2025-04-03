import React from "react";
import {
    ConnectButton,
    useWallet,
} from "@suiet/wallet-kit";
import '../App.css'
import "@suiet/wallet-kit/style.css";
import { useEffect } from "react";

function Connect() {
    const wallet = useWallet();
    window.location.hash = "#connect";

    useEffect(() => {
        console.log("Wallet connected:", wallet.connected);
    })

    return (
        <div className="App">
            <h1 className="title">GM, Welcome to Suimail</h1>
            <ConnectButton />
        </div>
    )
}

export default Connect;