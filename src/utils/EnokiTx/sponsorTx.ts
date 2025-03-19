import { enokiClient

} from "./EnokiClient.ts";
export const createSponsoredTx = async (sponsorTxBody) => {
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

export const executeSponsoredTx = async (executeSponsoredTxBody) => {
   const { digest, signature } = executeSponsoredTxBody;
   const resp = await enokiClient.executeSponsoredTransaction({
       digest,
       signature,
   });
   return resp;
}