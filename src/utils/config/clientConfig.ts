import { z } from "zod"

const suimailClientConfigSchema = z.object({
  SUI_NETWORK: z.string(),
  SUI_NETWORK_NAME: z.enum(["mainnet", "testnet"]),
  ENOKI_API_KEY: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  PACKAGE_ID: z.string(),
})

const suimailClientConfig = suimailClientConfigSchema.parse({
  SUI_NETWORK: import.meta.env.VITE_SUI_NETWORK!,
  SUI_NETWORK_NAME: import.meta.env.VITE_SUI_NETWORK_NAME as
    | "mainnet"
    | "testnet",
  ENOKI_API_KEY: import.meta.env.VITE_ENOKI_API_KEY!,
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID!,
  PACKAGE_ID: import.meta.env.VITE_PACKAGE_ID!,
})

export { suimailClientConfig }
