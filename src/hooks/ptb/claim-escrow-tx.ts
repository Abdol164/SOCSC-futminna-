/* eslint-disable @typescript-eslint/no-explicit-any */
import { Transaction } from '@mysten/sui/transactions'
import { useSignAndExecuteTransaction } from '@mysten/dapp-kit'

//This hook creates an escrow transaction for a specified recipient and required fee.
export const useClaimEscrowTx = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction()

  const claimEscrowTx = async (objectId: any): Promise<string> => {
    try {
      const tx = new Transaction()

      tx.moveCall({
        target:
          '0x285fb6adc9f70f7b014557948b59c6f790a8876540a793df7cbb00778e2ddbba::escrow::claim',
        arguments: [tx.object(objectId)],
      })

      // Sign and execute the transaction block
      const result = await new Promise<string>((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: 'sui:testnet' },
          {
            onSuccess: (response: any) => {
              console.log(
                'Transaction executed successfully: ',
                response.digest
              )
              resolve(response.digest)
            },
            onError: (error: unknown) => {
              console.error('Transaction rejected:', error)
              reject('false')
            },
          }
        )
      })
      console.log('Transaction result:', result)
      return result
    } catch (error) {
      console.error('Error sending SUI:', error)
      return 'false'
    }
  }

  return { claimEscrowTx }
}
