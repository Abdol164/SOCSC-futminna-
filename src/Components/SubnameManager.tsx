// import { SuinsClient, SuinsTransaction } from "@mysten/suins";
// import { SuiClient, getFullnodeUrl } from "@mysten/sui/client";
// import { Transaction } from "@mysten/sui/transactions";
// import { Ed25519Keypair } from "@mysten/sui/keypairs/ed25519";
// import React, { useEffect, useState, useContext } from "react";
// import { AppContext, AppContextProps } from "../utils/contexts/AppContext";
// import axios from "axios";

// const rpcUrl = getFullnodeUrl("testnet");
// export const client = new SuiClient({ url: rpcUrl });

// if (!import.meta.env.VITE_PRIVATE_KEY) {
//   throw new Error("Missing VITE_PRIVATE_KEY in environment variables");
// }
// const keypair = Ed25519Keypair.fromSecretKey(import.meta.env.VITE_PRIVATE_KEY); 

// export const suinsClient = new SuinsClient({
//   client,
//   network: "testnet",
// });

// export const createLeafSubname = async (
//   name: string,
//   parentNftId: string,
//   targetAddress: string
// ) => {
//   const transaction = new Transaction();
//   const suinsTransaction = new SuinsTransaction(suinsClient, transaction);

//   suinsTransaction.createLeafSubName({
//     parentNft: parentNftId,
//     name,
//     targetAddress,
//   });

//   try {
//     const { events } = await client.signAndExecuteTransaction({
//       signer: keypair,
//       transaction: suinsTransaction.transaction,
//       options: {
//         showBalanceChanges: true,
//         showEvents: true,
//         showInput: false,
//         showEffects: true,
//         showObjectChanges: true,
//         showRawInput: false,
//       },
//     });
//   } catch {
//     console.log("Transaction Failed");
//   }
// };

// const ClaimNameUI = () => {
//   const { walletAddress, setSubname } = useContext(AppContext) as AppContextProps;
//   const [name, setName] = useState("");
//   const [parentNftId, setParentNftId] = useState("");
//   const [status, setStatus] = useState("");
//   const [availability, setAvailability] = useState<"available" | "taken" | "checking" | "">("");

//   const fullName = `${name}`;

//   const checkAvailability = async () => {
//     if (!name) {
//       setAvailability("");
//       return;
//     }
//     setAvailability("checking");
//     try {
//       const record = await suinsClient.getNameRecord(fullName);
//       if (record) {
//         setAvailability("taken");
//       } else {
//         setAvailability("available");
//       }
//     } catch {
//       // If not found, we consider it available
//       setAvailability("available");
//     }
//   };

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       checkAvailability();
//     }, 500); // debounce input
//     return () => clearTimeout(timeout);
//   }, [name]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (availability !== "available") {
//       setStatus("❌ Name is not available.");
//       return;
//     }
//     setStatus("Processing...");
//     try {
//       await createLeafSubname(name, parentNftId, walletAddress);
//       setStatus("✅ Subname registered successfully!");

//       // Send the registered subname to the backend
//       await axios.post("/api/register-subname", { name, parentNftId, walletAddress });

//       // Store the registered subname in context
//       setSubname(name);
//     } catch (error) {
//       console.error(error);
//       setStatus("❌ Failed to register subname.");
//     }
//   };

//   return (
//     <div
//       className="flex items-center min-h-screen px-4 py-10"
//       style={{ background: "linear-gradient(to bottom, #006bf9, #00c1fa)" }}
//     >
//       <div className="w-full max-w-4xl bg-white shadow-2xl rounded-xl p-8 sm:p-10 lg:p-12">
//         <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
//           Register a Subname
//         </h1>
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label
//               htmlFor="name"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Subname
//             </label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 px-4 py-2"
//               required
//             />
//             {availability === "checking" && (
//               <p className="text-sm text-gray-500 mt-1">Checking availability...</p>
//             )}
//             {availability === "available" && (
//               <p className="text-sm text-green-600 mt-1">✅ {fullName} is available</p>
//             )}
//             {availability === "taken" && (
//               <p className="text-sm text-red-600 mt-1">❌ {fullName} is already taken</p>
//             )}
//           </div>

//           <div>
//             <label
//               htmlFor="parentNftId"
//               className="block text-sm font-medium text-gray-700"
//             >
//               Parent NFT ID
//             </label>
//             <input
//               type="text"
//               id="parentNftId"
//               value={parentNftId}
//               onChange={(e) => setParentNftId(e.target.value)}
//               className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-focus-500 focus:border-blue-500 px-4 py-2"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full  text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
//             disabled={availability !== "available"}
//             style={{
//               background: 'linear-gradient(to bottom, #006bf9, #00c1fa)',
//             }}
//           >
//             Register
//           </button>
//         </form>
//         {status && (
//           <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubnameManager;
