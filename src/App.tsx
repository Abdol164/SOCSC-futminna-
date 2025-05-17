import { useEffect } from "react"
import { RouterProvider } from "react-router-dom"
import {
  WalletProvider,
  SuiClientProvider,
  createNetworkConfig,
  useSuiClientContext,
} from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import { QueryClientProvider } from "@tanstack/react-query"
import { isEnokiNetwork, registerEnokiWallets } from "@mysten/enoki"
import "@mysten/dapp-kit/dist/index.css"
import routes from "./routes"
import { queryClient } from "./query-client"
import { suimailClientConfig } from "./utils/config/clientConfig"
import AppProvider from "./utils/contexts/AppContext/AppContextProvider"

// Config options for the networks you want to connect to
const { networkConfig } = createNetworkConfig({
  testnet: { url: getFullnodeUrl("testnet") },
  mainnet: { url: getFullnodeUrl("mainnet") },
})

export default function App() {
  return (
    <AppProvider>
      <QueryClientProvider client={queryClient}>
        <SuiClientProvider networks={networkConfig} defaultNetwork="testnet">
          <RegisterEnokiWallets />
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

function RegisterEnokiWallets() {
  const { client, network } = useSuiClientContext()

  useEffect(() => {
    if (!isEnokiNetwork(network)) return

    const { unregister } = registerEnokiWallets({
      apiKey: suimailClientConfig.ENOKI_API_KEY,
      providers: {
        google: {
          clientId: suimailClientConfig.GOOGLE_CLIENT_ID,
        },
        facebook: {
          clientId: "YOUR_FACEBOOK_CLIENT_ID",
        },
        twitch: {
          clientId: "YOUR_TWITCH_CLIENT_ID",
        },
      },
      client,
      network,
    })

    return unregister
  }, [client, network])

  return null
}
