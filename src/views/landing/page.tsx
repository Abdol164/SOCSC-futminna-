import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type WalletAccount } from "@wallet-standard/base"
import { ConnectModal, useCurrentAccount } from "@mysten/dapp-kit"
import { useLoginMutation } from "../../hooks/auth"
import { setCookie } from "@/utils/helpers/auth"
import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants"

export default function LandingPage() {
  const navigate = useNavigate()
  const currentAccount = useCurrentAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentAccountIsSet, setCurrentAccountIsSet] = useState(false)
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation()

  const handleLogin = useCallback(
    async (wallet: WalletAccount) => {
      try {
        const response = await login(wallet.address)
        if (response.access_token) {
          setCookie(ACCESS_TOKEN_COOKIE_NAME, response.access_token)
          navigate("/mail")
        }
      } catch (error) {
        console.error(error)
      }
    },
    [login, navigate]
  )

  useEffect(() => {
    if (currentAccount && !currentAccountIsSet) {
      handleLogin(currentAccount)
      setCurrentAccountIsSet(true)
    }
  }, [currentAccount, handleLogin, currentAccountIsSet])

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Your Suimail Account
        </h1>
        <div className="space-y-6">
          <div className="flex justify-center">
            <div style={{ padding: 20 }}>
              <ConnectModal
                trigger={
                  <button disabled={!!currentAccount || isLoginPending}>
                    {renderConnectButtonLabel(currentAccount, isLoginPending)}
                  </button>
                }
                open={isModalOpen}
                onOpenChange={() => setIsModalOpen(!isModalOpen)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const renderConnectButtonLabel = (
  wallet: WalletAccount | null,
  isPending: boolean
) => {
  if (!wallet) return "Connect Wallet"
  if (isPending) return "Connecting..."
  return `${wallet.address.slice(0, 4)}...${wallet.address.slice(-4)}`
}
