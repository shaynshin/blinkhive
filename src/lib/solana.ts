import { Connection } from "@solana/web3.js";


// Initialize connection to Solana
export const connection = new Connection(process.env.SOLANA_RPC_URL!);