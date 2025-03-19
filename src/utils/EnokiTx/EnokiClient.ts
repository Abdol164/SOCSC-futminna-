import serverConfig from '../config/serverConfig.ts';
import { EnokiClient } from "@mysten/enoki";

export const enokiClient = new EnokiClient({
    apiKey: serverConfig.ENOKI_SECRET_KEY,
});