import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import "./index.css";
import { AppProvider } from "./utils/contexts/AppContext.js";
import App from "./App"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <AppProvider> */}
      <App />
    {/* </AppProvider> */}
  </StrictMode>
);
