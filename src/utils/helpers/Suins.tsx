import { suinsClient } from "../config/suinsClient";

export const getUserSubname = async (walletAddress: string): Promise<string | null> => {
  try {
    const subname = `${walletAddress}.suimail.sui`;
    const nameRecord = await suinsClient.getNameRecord(subname);
    
    if (!nameRecord || !nameRecord.name) {
      console.log(`Subname ${subname} does not exist.`);
      return null;
    }

    console.log(`Subname ${subname} exists:`, nameRecord.name);
    return nameRecord.name;
  } catch (error) {
    console.error("Error fetching name record:", error);
    return null;
  }
};
