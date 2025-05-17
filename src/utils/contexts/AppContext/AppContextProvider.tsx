import { useState, type ReactNode } from "react"
import { AppContext } from "./AppContext"

interface AppProviderProps {
  children: ReactNode
}

export default function AppProvider({ children }: AppProviderProps) {
  const [activeNavItem, setActiveNavItem] = useState("")
  const [walletAddress, setWalletAddress] = useState("")
  const [connectionState, setConnectionState] = useState("")
  const [mailFee, setMailFee] = useState(0)
  const [subname, setSubname] = useState("")

  return (
    <AppContext.Provider
      value={{
        activeNavItem,
        setActiveNavItem,
        walletAddress,
        setWalletAddress,
        connectionState,
        setConnectionState,
        mailFee,
        setMailFee,
        subname,
        setSubname,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
