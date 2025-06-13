import { z } from 'zod'

/*
 * The schema for the server-side environment variables
 * These variables should be defined in:
 * * the app/.env.development.local file for the local environment
 * * the Vercel's UI for the deployed environment
 * They must not be tracked by Git
 * They are SECRET, and not exposed to the client side
 */

const serverConfigSchema = z.object({
  VITE_ENOKI_API_KEY: z.string(),
})
const serverConfig = serverConfigSchema.parse({
  VITE_ENOKI_API_KEY: import.meta.env.VITE_ENOKI_API_KEY,
})

export default serverConfig
