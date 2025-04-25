import serverConfig from '../config/serverConfig';
import { EnokiClient } from "@mysten/enoki";

export const enokiClient = new EnokiClient({
    apiKey: serverConfig.VITE_ENOKI_API_KEY,
});