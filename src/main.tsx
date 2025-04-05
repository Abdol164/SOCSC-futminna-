import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "./index.css";
import App from "./App.js";
import { AppProvider } from "./utils/contexts/AppContext.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <WalletProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </WalletProvider>
  </StrictMode>
);
