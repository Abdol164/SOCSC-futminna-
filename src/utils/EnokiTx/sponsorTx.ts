import { ExecuteSponsoredTransactionApiInput } from "../contexts/CustomWallet.js";
import { enokiClient

} from "./EnokiClient";
export const createSponsoredTx = async (sponsorTxBody: { network: any; txBytes: any; sender: any; allowedAddresses: any; }) => {
   const { network, txBytes, sender, allowedAddresses } = sponsorTxBody;
   try {
       const resp = await enokiClient.createSponsoredTransaction({
           network,
           transactionKindBytes: txBytes,
           sender,
           allowedAddresses,
       });
       return resp;
   } catch (error) {
       console.error("Error creating sponsored transaction:", error);
       throw error; // Re-throw if needed
   }

}

export const executeSponsoredTx = async (executeSponsoredTxBody: ExecuteSponsoredTransactionApiInput) => {
   const { digest, signature } = executeSponsoredTxBody;
   const resp = await enokiClient.executeSponsoredTransaction({
       digest,
       signature,
   });
   return resp;
}