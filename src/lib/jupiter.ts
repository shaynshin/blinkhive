import { PublicKey } from "@solana/web3.js";
import { supabase } from "@/lib/supabase";

const SLIPPAGE_BPS = 200; // 0.5%
const PLATFORM_FEE_BPS = 100; // 1%

// Function to swap SOL to USDC with input 0.1 SOL and 0.5% slippage
export async function getQuote(
  inputMint: string,
  outputMint: string,
  inAmount: number
) {
  try {
    // Create a new URL object for the quote API endpoint
    const url = new URL("https://quote-api.jup.ag/v6/quote");

    // Append query parameters to the URL
    url.searchParams.append("inputMint", inputMint);

    // outputMint: The mint address of the output token (USDC)
    url.searchParams.append("outputMint", outputMint);

    // amount: The amount of input tokens to be swapped (0.1 SOL in lamports, where 1 SOL = 1,000,000,000 lamports)
    url.searchParams.append("amount", inAmount.toString());

    // slippageBps: The maximum allowable slippage for the swap (0.5% expressed in basis points)
    url.searchParams.append("slippageBps", SLIPPAGE_BPS.toString());

    // platformFeeBps: The platform fee to be added (20 basis points)
    url.searchParams.append("platformFeeBps", PLATFORM_FEE_BPS.toString());

    // Perform the fetch request to the constructed URL
    const response = await fetch(url.toString());

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      // Throw an error with the status text from the response
      throw new Error(response.statusText);
    }

    // Parse the response body as JSON
    const quoteResponse = await response.json();

    return quoteResponse;
  } catch (error) {
    // Catch any errors that occur during the fetch request or JSON parsing
    // Log the error to the console
    console.error("Failed to get quote:", error);
    throw new Error(`Error fetching quote: ${error}`);
  }
}

// Function to find the fee account and get serialized transactions for the swap
export async function getFeeAccountAndSwapTransaction(
  referralAccountPubkey: PublicKey,
  mint: PublicKey,
  quoteResponse: any,
  userPubkey: PublicKey
) {
  try {
    // Find the fee account program address synchronously
    // Parameters:
    // - Buffer.from("referral_ata"): A buffer containing the string "referral_ata"
    // - referralAccountPubkey.toBuffer(): The buffer representation of the referral account public key
    // - mint.toBuffer(): The buffer representation of the token mint
    // - new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3"): The public key of the Referral Program
    const [feeAccount] = await PublicKey.findProgramAddressSync(
      [
        Buffer.from("referral_ata"),
        referralAccountPubkey.toBuffer(),
        mint.toBuffer(),
      ],
      new PublicKey("REFER4ZgmyYx9c6He5XfaTMiGfdLwRnkV4RPp9t9iF3")
    );

    console.log(feeAccount.toBase58());

    // Construct the request body for the swap API
    const requestBody = {
      quoteResponse, // The quote response from the /quote API
      userPublicKey: userPubkey.toBase58(), // The user's public key
      wrapAndUnwrapSol: true, // Auto wrap and unwrap SOL (default is true)
      feeAccount, // The fee account obtained from findProgramAddressSync
    };

    // Perform the fetch request to the swap API
    const response = await fetch("https://quote-api.jup.ag/v6/swap", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the request body to a JSON string
    });

    // Check if the response is not OK (status code is not in the range 200-299)
    if (!response.ok) {
      // Throw an error with the status text from the response
      throw new Error(`Error performing swap: ${response.statusText}`);
    }

    // Parse the response body as JSON to get the swap transaction
    const { swapTransaction } = await response.json();

    // Log the swap transaction to the console
    console.log({ swapTransaction });

    return swapTransaction; // Return the swap transaction
  } catch (error) {
    // Catch any errors that occur during the fetch request or JSON parsing
    // Log the error to the console
    console.error("Failed to get fee account and swap transaction:", error);
  }
}

export const validateAndGetCoinMintStr = async (coin: string) => {
  const { data, error } = await supabase
    .from("jupiter")
    .select("name, symbol, mint, decimals, logo_uri")
    .or(`symbol.ilike.${coin},mint.eq.${coin}`)
    .single();

  if (error) throw error;

  if (!data) {
    throw Error("Token not found");
  }
  return data;
};
