import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import {
  WalletProvider,
  SuiClientProvider,
  createNetworkConfig,
} from "@mysten/dapp-kit";
import { queryClient } from "./query-client";
import { getFullnodeUrl } from "@mysten/sui/client";
import { QueryClientProvider } from "@tanstack/react-query";
import '@mysten/dapp-kit/dist/index.css';

import './index.css';

import Loader from './components/Loader'

const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) return <Loader />;

  return (
    <BrowserRouter>
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
            <WalletProvider>
              <AppRoutes />
            </WalletProvider>
          </SuiClientProvider>
        </QueryClientProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
