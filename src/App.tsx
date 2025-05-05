import React from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from "./utils/contexts/AppContext.js";

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl('testnet') },
  mainnet: { url: getFullnodeUrl('mainnet') },
});
const queryClient = new QueryClient();

function App() {

  return (
    <div>
      <AppProvider>
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider>
              <RouterProvider router={routes} />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </AppProvider>

    </div>
  );
}

export default App;
