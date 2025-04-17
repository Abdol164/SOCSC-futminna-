import React from "react";
import {
  WalletProvider,
  SuiClientProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { getFullnodeUrl } from "@mysten/sui/client";
import { registerStashedWallet } from "@mysten/zksend";
import { EnokiFlowProvider } from "@mysten/enoki/react";
import clientConfig from "../utils/config/clientConfig";
import CustomWalletProvider from "../utils/contexts/CustomWallet";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthenticationProvider } from "../utils/contexts/Authentication";

import "@mysten/dapp-kit/dist/index.css";
registerStashedWallet("Breaking the Ice - Community Vote", {});

///storage sessions

const sessionStorageAdapter = {
  getItem: async (key) => {
    return sessionStorage.getItem(key);
  },
  setItem: async (key, value) => {
    sessionStorage.setItem(key, value);
  },
  removeItem: async (key) => {
    sessionStorage.removeItem(key);
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  const { networkConfig } = createNetworkConfig({
    testnet: { url: getFullnodeUrl("testnet") },
    mainnet: { url: getFullnodeUrl("mainnet") },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={networkConfig}
        defaultNetwork={clientConfig.SUI_NETWORK_NAME}
      >
        <WalletProvider
          autoConnect
          stashedWallet={{
            name: "Breaking the Ice - Community Vote",
          }}
          storage={sessionStorageAdapter}
        >
          <EnokiFlowProvider apiKey={clientConfig.ENOKI_API_KEY}>
            <AuthenticationProvider>
              <CustomWalletProvider>{children}</CustomWalletProvider>
            </AuthenticationProvider>
          </EnokiFlowProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
