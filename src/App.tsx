import React from "react";
import { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import routes from "./routes";
import { createNetworkConfig, SuiClientProvider, WalletProvider, useSuiClientContext } from '@mysten/dapp-kit';
import { getFullnodeUrl } from '@mysten/sui/client';
import { isEnokiNetwork, registerEnokiWallets } from '@mysten/enoki';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProvider } from "./utils/contexts/AppContext.js";
import clientConfig from "./utils/config/clientConfig";

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
            <RegisterEnokiWallets />
            <WalletProvider>
              <RouterProvider router={routes} />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </AppProvider>

    </div>
  );
}

function RegisterEnokiWallets() {
	const { client, network } = useSuiClientContext();
 
	useEffect(() => {
		if (!isEnokiNetwork(network)) return;
 
		const { unregister } = registerEnokiWallets({
			apiKey: clientConfig.ENOKI_API_KEY,
			providers: {
				google: {
					clientId: clientConfig.GOOGLE_CLIENT_ID,
				},
				facebook: {
					clientId: 'YOUR_FACEBOOK_CLIENT_ID',
				},
				twitch: {
					clientId: 'YOUR_TWITCH_CLIENT_ID',
				},
			},
			client,
			network,
		});
 
		return unregister;
	}, [client, network]);
 
	return null;
}

export default App;
