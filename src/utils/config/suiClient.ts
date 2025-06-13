import { getFullnodeUrl, SuiClient } from '@mysten/sui/client'

const ACTIVE_RPC_NETWORK: 'testnet' | 'mainnet' | 'devnet' = 'testnet'

const client = new SuiClient({ url: getFullnodeUrl(ACTIVE_RPC_NETWORK) })

export { client, ACTIVE_RPC_NETWORK }
