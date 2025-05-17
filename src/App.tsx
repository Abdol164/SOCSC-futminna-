import { RouterProvider } from "react-router-dom"
import {
  createNetworkConfig,
  SuiClientProvider,
  WalletProvider,
} from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import { QueryClientProvider } from "@tanstack/react-query"
import "@mysten/dapp-kit/dist/index.css"
import routes from "./routes"
import { queryClient } from "./query-client"
import AppProvider from "./utils/contexts/AppContext/AppContextProvider"

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
})

function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <WalletProvider
            autoConnect
            slushWallet={{
              name: "Suimail",
            }}
          >
            <RouterProvider router={routes} />
          </WalletProvider>
        </SuiClientProvider>
      </QueryClientProvider>
    </AppProvider>
  )
}

export default App
