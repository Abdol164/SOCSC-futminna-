import { useConnectWallet } from "@mysten/dapp-kit"
import type { WalletWithRequiredFeatures } from "@mysten/wallet-standard"

interface ConnectWalletButtonProps {
  wallet: WalletWithRequiredFeatures
  disabled?: boolean
}

export function ConnectWalletButton({
  wallet,
  disabled = false,
}: ConnectWalletButtonProps) {
  const { mutate: connect } = useConnectWallet()

  return (
    <button disabled={disabled} onClick={() => connect({ wallet })}>
      Connect {wallet.name}
    </button>
  )
}
