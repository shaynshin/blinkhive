import { NextResponse } from "next/server";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import {
  PublicKey,
  SystemProgram,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";

import {
  deserializeInstruction,
  fetchGenPubkey,
  getAddressLookupTableAccounts,
  getFeeAccountAndSwapIxs,
  getQuote,
  validateAndGetCoinMintStr,
} from "@/lib/jupiter";
import { connection } from "@/lib/solana";

const adminJupRefKey = new PublicKey(process.env.ADMIN_JUP_REF_KEY!);

export async function GET(
  req: Request,
  { params }: { params: { coinInCoinOut: string } }
) {
  try {
    const [coinIn, coinOut] = params.coinInCoinOut.split("-");
    const { searchParams } = new URL(req.url);
    const refPubkey = searchParams.get("ref");

    const { name: nameIn, symbol: symbolIn } = await validateAndGetCoinMintStr(
      coinIn
    );
    const { name: nameOut, symbol: symbolOut } =
      await validateAndGetCoinMintStr(coinOut);

    const response: ActionGetResponse = {
      title: `Swap $${symbolIn} → $${symbolOut}`,
      description: `Exchange ${nameIn} for ${nameOut} at the best rates via Jupiter, Solana's top DEX aggregator.`,
      icon: "https://ucarecdn.com/bb6ebebc-a810-4943-906d-5e3c2ca17b8d/-/preview/880x880/-/quality/smart/-/format/auto/",
      label: "Buy now", // not displayed since `links.actions` are provided
      links: {
        actions: [
          {
            label: `Swap Now`, // button text
            href: `/api/action/jup/${params.coinInCoinOut}?${
              refPubkey ? `ref=${refPubkey}&` : ""
            }amount={amount}`,
            parameters: [
              {
                name: `amount`, // field name
                label: `Amount of $${symbolIn} to swap`, // text input placeholder
              },
            ],
          },
        ],
      },
    };

    return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error fetching action:", error);
    const message = "Failed to fetch action";
    return new Response(message, {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS

export async function OPTIONS(_request: Request) {
  return new NextResponse(null, {
    status: 204,
    headers: ACTIONS_CORS_HEADERS,
  });
}

export async function POST(
  req: Request,
  { params }: { params: { coinInCoinOut: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const amountIn = searchParams.get("amount");
    const refPubkey = searchParams.get("ref");

    if (!amountIn || +amountIn <= 0) {
      return NextResponse.json(
        { error: "Invalid amount" },
        { status: 400, headers: ACTIONS_CORS_HEADERS }
      );
    }

    const [coinIn, coinOut]: string[] = params.coinInCoinOut.split("-");

    const { mint: mintIn, decimals: decimalsIn } =
      await validateAndGetCoinMintStr(coinIn);
    const { mint: mintOut } = await validateAndGetCoinMintStr(coinOut);

    const quoteResponse = await getQuote(
      mintIn,
      mintOut,
      +amountIn * 10 ** decimalsIn
    );

    const reqBody: ActionPostRequest = await req.json();
    const userPubkey = new PublicKey(reqBody.account);

    const {
      computeBudgetInstructions, // The necessary instructions to setup the compute budget.
      setupInstructions, // Setup missing ATA for the users.
      swapInstruction: swapInstructionPayload, // The actual swap instruction.
      cleanupInstruction, // Unwrap the SOL if `wrapAndUnwrapSol = true`.
      addressLookupTableAddresses, // The lookup table addresses that you can use if you are using versioned transaction.
    } = await getFeeAccountAndSwapIxs(
      adminJupRefKey,
      new PublicKey(mintOut),
      quoteResponse,
      userPubkey
    );

    const addressLookupTableAccounts = await getAddressLookupTableAccounts(
      addressLookupTableAddresses
    );

    const instructions = [
      ...computeBudgetInstructions.map(deserializeInstruction),
      ...setupInstructions.map(deserializeInstruction),
      deserializeInstruction(swapInstructionPayload),
    ];

    if (cleanupInstruction) {
      instructions.push(deserializeInstruction(cleanupInstruction));
    }

    if (refPubkey) {
      const genPubkeyStr = await fetchGenPubkey(refPubkey, mintOut);
      const refTransferIx = SystemProgram.transfer({
        fromPubkey: userPubkey,
        toPubkey: new PublicKey(genPubkeyStr),
        lamports: 898888,
      });
      instructions.push(refTransferIx);
    }

    const blockhash = (await connection.getLatestBlockhash()).blockhash;
    const messageV0 = new TransactionMessage({
      payerKey: userPubkey,
      recentBlockhash: blockhash,
      instructions,
    }).compileToV0Message(addressLookupTableAccounts);
    const transaction = new VersionedTransaction(messageV0);

    const response: ActionPostResponse = {
      transaction: Buffer.from(transaction.serialize()).toString("base64"),
    };

    return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error fetching action:", error);
    const message = `Failed to create transaction: ${error}`;
    return NextResponse.json(
      { message },
      {
        status: 500,
        headers: ACTIONS_CORS_HEADERS,
      }
    );
  }
}
