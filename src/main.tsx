import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from "@suiet/wallet-kit";
import { RouterProvider } from "react-router-dom";
import "@suiet/wallet-kit/style.css";
import "./index.css";
import { AppProvider } from "./utils/contexts/AppContext.js";
import routes from "./routes";
 import { SuinsProvider } from './utils/contexts/SuinsContext'; 


createRoot(document.getElementById("root")!).render(
  <StrictMode>
      <SuinsProvider>
      <WalletProvider>
        <AppProvider>
          <RouterProvider router={routes} />
        </AppProvider>
      </WalletProvider>
      </SuinsProvider>
  </StrictMode>
);
