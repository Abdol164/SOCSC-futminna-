import { SuinsClient } from "@mysten/suins";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

import { client as claimNameClient } from "../../Components/SubnameManager";

const client = new SuiClient({ url: getFullnodeUrl("testnet") });
const suinsClient = new SuinsClient({
    client,
    network: "testnet",
});

export { suinsClient };


