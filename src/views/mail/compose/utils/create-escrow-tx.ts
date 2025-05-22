import { MIST_PER_SUI } from "@/constants";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";

//This hook creates an escrow transaction for a specified recipient and required fee.
export const useCreateEscrowTx = () => {
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();

  const escrowTx = async (
    requiredFee: number,
    recipient: string
  ): Promise<boolean> => {
    const SUI_AMOUNT = requiredFee * MIST_PER_SUI;

    try {
      const tx = new Transaction();

      // Split 0.01 SUI from the gas coin
      const [coin] = tx.splitCoins(tx.gas, [tx.pure.u64(SUI_AMOUNT)]);

      // Transfer the split coin to the recipient
      tx.moveCall({
        target:"0xc32af5cb942a3728e4922edcc88bc504e679d90d94a012214512dba9ffc869a9::escrow::create_escrow",
        arguments: [
          tx.object(coin), // SUI coin object
          tx.pure.address(recipient), // recipient address
          tx.pure.u64(100000), // duration in ms
          tx.object('0x6'), // clock object
        ],
      });

      // Sign and execute the transaction block
      const result = await new Promise<boolean>((resolve, reject) => {
        signAndExecuteTransaction(
          { transaction: tx, chain: "sui:testnet" },
          {
            onSuccess: () => {
              console.log("Transaction executed successfully");
              resolve(true);
            },
            onError: (error: unknown) => {
              console.error("Transaction rejected:", error);
              reject(false);
            },
          }
        );
      });
      console.log("Transaction result:", result);
      return result;
    } catch (error) {
      console.error("Error sending SUI:", error);
      return false;
    }
  };

  return { escrowTx };
};
