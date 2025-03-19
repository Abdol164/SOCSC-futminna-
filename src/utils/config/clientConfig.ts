import { z } from "zod";
// import * as dotenv from "dotenv";
// dotenv.config();
// import "dotenv"

/*
 * The schema for the client-side environment variables
 * These variables should be defined in the app/.env file
 * These variables are NOT SECRET, they are exposed to the client side
 * They can and should be tracked by Git
 * All of the env variables must have the NEXT_PUBLIC_ prefix
 */

// const VITE_SUI_NETWORK="https://rpc.testnet.sui.io:443"
// const VITE_SUI_NETWORK_NAME="testnet"
// const VITE_ENOKI_API_KEY= "enoki_private_c4d7e165c3d9fab880398c32506fe4b9"
const VITE_GOOGLE_CLIENT_ID= "1072360981884-bhp21rhttj3thnd5dvq6p0nbfk6m85i0.apps.googleusercontent.com"
// const VITE_PACKAGE_ID="0x06314af232888760ff6eb65d6acd0e9307546f89e30d8000d162bc3ae21bf639"


const clientConfigSchema = z.object({
    SUI_NETWORK: z.string(),
    SUI_NETWORK_NAME: z.enum(["mainnet", "testnet"]),
    ENOKI_API_KEY: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    PACKAGE_ID: z.string(),
});

// const clientConfig = clientConfigSchema.parse({
//     SUI_NETWORK: import.meta.env.NEXT_PUBLIC_SUI_NETWORK!,
//     SUI_NETWORK_NAME: import.meta.env.NEXT_PUBLIC_SUI_NETWORK_NAME as
//         | "mainnet"
//         | "testnet",
//     ENOKI_API_KEY: import.meta.env.NEXT_PUBLIC_ENOKI_API_KEY!,
//     GOOGLE_CLIENT_ID: import.meta.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
//     PACKAGE_ID: import.meta.env.NEXT_PUBLIC_PACKAGE_ID!,
//     GLOBAL_COUNTER_ID: import.meta.env.NEXT_PUBLIC_GLOBAL_COUNTER_ID!,
// });
const clientConfig = clientConfigSchema.parse({
    SUI_NETWORK: import.meta.env.VITE_SUI_NETWORK!,
    SUI_NETWORK_NAME: import.meta.env.VITE_SUI_NETWORK_NAME!,
    ENOKI_API_KEY: import.meta.env.VITE_ENOKI_API_KEY! ,
    GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID! || VITE_GOOGLE_CLIENT_ID,
    PACKAGE_ID: import.meta.env.VITE_PACKAGE_ID!,
});

export default clientConfig;