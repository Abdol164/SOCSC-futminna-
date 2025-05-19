import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { type WalletAccount } from "@wallet-standard/base"
import { ConnectModal, useConnectWallet, useCurrentAccount, useWallets } from "@mysten/dapp-kit"
import { useLoginMutation } from "../../hooks/auth"
import { setCookie } from "@/utils/helpers/auth"
import { ACCESS_TOKEN_COOKIE_NAME } from "@/constants"
import { isEnokiWallet, type EnokiWallet, type AuthProvider } from '@mysten/enoki';
import Google from "../../../public/images/Google.png"



export default function LandingPage() {
  const navigate = useNavigate()
  const currentAccount = useCurrentAccount()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { mutateAsync: login, isPending: isLoginPending } = useLoginMutation()
  const { mutateAsync: connect } = useConnectWallet();


  const wallets = useWallets().filter(isEnokiWallet);
  const walletsByProvider = wallets.reduce(
    (map: { set: (arg0: any, arg1: any) => any }, wallet: { provider: any }) => map.set(wallet.provider, wallet),
    new Map<AuthProvider, EnokiWallet>(),
  );
  console.log(wallets);

  const googleWallet = walletsByProvider.get('google');
  console.log('currentAccount:(connect)', currentAccount?.address);
  console.log(connect);

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
    if (currentAccount) {
      handleLogin(currentAccount)
    }
  }, [currentAccount, handleLogin])

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
          {/* <button
            type="button"
            disabled={isLoginPending}
            className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            <img
              src="/icons/google-icon.png"
              alt="Google"
              className="w-6 h-6 mr-2"
            />
            Sign in with Google
          </button> */}

{googleWallet ? (
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-lg hover:bg-gray-100"
                onClick={() => {
                  connect({ wallet: googleWallet });
                }}
              >
                <img src={Google} alt="Google" className="w-6 h-6 mr-2" />
                Sign in with Google
              </button>
            ) : null}
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
