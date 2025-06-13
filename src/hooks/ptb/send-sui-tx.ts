/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { Transaction } from '@mysten/sui/transactions'
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'
import type { SuiSignAndExecuteTransactionOutput } from '@mysten/wallet-standard'
import { MIST_PER_SUI } from '@mysten/sui/utils'

export const useSendSuiTx = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

  const sendSuiTx = async (
    amount: number,
    recipient: string,
    onSuccess?: (response: SuiSignAndExecuteTransactionOutput) => void,
    onError?: (error: any) => void
  ) => {
    const amountInMist = Number(amount.toFixed(8)) * Number(MIST_PER_SUI)

    try {
      setIsLoading(true)
      const tx = new Transaction()

      const [coin] = tx.splitCoins(tx.gas, [amountInMist])

      tx.transferObjects([coin], recipient)

      const result = await new Promise<any>((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: response => {
              resolve(response)
              onSuccess?.(response)
            },
            onError: (error: any) => {
              reject(error)
              onError?.(error)
            },
          }
        )
      })
      return result
    } catch (error) {
      onError?.(error as any)
    } finally {
      setIsLoading(false)
    }
  }

  return { sendSuiTx, isLoading }
}
