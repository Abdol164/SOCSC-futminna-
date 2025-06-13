import { MIST_PER_SUI } from '@mysten/sui/utils'

export function getSuiUSDBalance(suiPrice: number, balance: number) {
  return (suiPrice * balance) / Number(MIST_PER_SUI)
}
