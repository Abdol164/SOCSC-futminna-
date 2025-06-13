import { MIST_PER_SUI } from '@/constants'
import { Transaction } from '@mysten/sui/transactions'
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'

export const useChargeMailTxFee = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

  const chargeMailTxFee = async (
    requiredFee: number,
    recipient: string
  ): Promise<boolean> => {
    const SUI_AMOUNT = requiredFee * MIST_PER_SUI

    try {
      const tx = new Transaction()

      // Split 0.01 SUI from the gas coin
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(SUI_AMOUNT)])

      // Transfer the split coin to the recipient
      tx.transferObjects([coin], tx.pure.address(recipient))

      // Sign and execute the transaction block
      const result = await new Promise<boolean>((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: () => {
              console.log('Transaction executed successfully')
              resolve(true)
            },
            onError: (error: unknown) => {
              console.error('Transaction rejected:', error)
              reject(false)
            },
          }
        )
      })
      console.log('Transaction result:', result)
      return result
    } catch (error) {
      console.error('Error sending SUI:', error)
      return false
    }
  }

  return { chargeMailTxFee }
}
