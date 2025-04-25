import React from "react";
import { Routes, Route } from "react-router-dom";
import { GlobalStateProvider } from "./providers/GlobalStateProvider"; 

import CustomWalletProvider from "./utils/contexts/CustomWallet";
import { AuthenticationProvider } from "./utils/contexts/Authentication";

import { getFullnodeUrl } from "@mysten/sui/client";
import { SuiClientProvider, WalletProvider, createNetworkConfig } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnokiFlowProvider } from "@mysten/enoki/react";
import { registerStashedWallet } from "@mysten/zksend";

import clientConfig from "./utils/config/clientConfig";
import "@mysten/dapp-kit/dist/index.css";

// Register wallet for zkSend
registerStashedWallet("Breaking the Ice - Community Vote", {});

// Custom sessionStorage adapter
const sessionStorageAdapter = {
  getItem: async (key: string) => sessionStorage.getItem(key),
  setItem: async (key: string, value: string) => sessionStorage.setItem(key, value),
  removeItem: async (key: string) => sessionStorage.removeItem(key),
};

function App({ children }: { children: React.ReactNode }) {
  const { networkConfig } = createNetworkConfig({
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  const queryClient = new QueryClient();

  return (
    <GlobalStateProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork={clientConfig.SUI_NETWORK_NAME}>
          <WalletProvider
            autoConnect
            stashedWallet={{ name: "Breaking the Ice - Community Vote" }}
            storage={sessionStorageAdapter}
          >
            <EnokiFlowProvider apiKey={clientConfig.ENOKI_API_KEY}>
              <AuthenticationProvider>
                <CustomWalletProvider>
                  <Routes>
                  </Routes>
                  {children}
                </CustomWalletProvider>
              </AuthenticationProvider>
            </EnokiFlowProvider>
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </GlobalStateProvider>
  );
}

export default App;
