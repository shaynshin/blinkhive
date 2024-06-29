import { NextResponse } from "next/server";
import {
  ActionGetResponse,
  ActionPostRequest,
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
} from "@solana/actions";
import {
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import {
  createTransferCheckedInstruction,
  getAssociatedTokenAddressSync,
  createAssociatedTokenAccountInstruction,
} from "@solana/spl-token";

import { supabase } from "@/lib/supabase";

// USDC
const TOKEN_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
);
const TOKEN_DECIMALS = 6;

const ADMIN_FEE_PCT = 0.2;

const signerSecret = JSON.parse(
  process.env.SIGNER_PRIVATE_KEY || ""
) as number[];
const signerSecretKey = Uint8Array.from(signerSecret);
const signerKeypair = Keypair.fromSecretKey(signerSecretKey);

const adminPubKey = new PublicKey(process.env.ADMIN_PUBLIC_KEY!);

// Initialize connection to Solana
const connection = new Connection(process.env.SOLANA_RPC_URL!);

export async function GET(
  _request: Request,
  { params }: { params: { blinkId: string } }
) {
  try {
    const { data: products, error: fetchError } = await supabase
      .from("blinks")
      .select("products (*)")
      .eq("id", params.blinkId)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = products.products as any;

    const response: ActionGetResponse = {
      title: `Buy ${product.name}`,
      description: `Buy ${product.name} by ${product.seller} for only $${product.price} USDC today! Rated ${product.rating}/5.0 by other buyers.`,
      icon: `${product.image_url}`,
      label: "Buy now", // not displayed since `links.actions` are provided
      links: {
        actions: [
          {
            label: `Buy for $${product.price}`, // button text
            href: `/api/action/${params.blinkId}?email={email}`,
            parameters: [
              {
                name: "email", // field name
                label: "Your email to receive purchase", // text input placeholder
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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export async function POST(
  req: Request,
  { params }: { params: { blinkId: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const buyerEmail = searchParams.get("email");

    if (!buyerEmail || !isValidEmail(buyerEmail)) {
      return NextResponse.json({ error: "Email invalid" }, { status: 400 });
    }

    const { data: blink, error: fetchError } = await supabase
      .from("blinks")
      .select("id, wallet (public_key), products (price, commission)")
      .eq("id", params.blinkId)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const product = blink.products as any;

    const wallet = blink.wallet as any;

    const reqBody: ActionPostRequest = await req.json();

    // transfer to merchant
    const transaction = await prepareTransaction(
      new PublicKey(reqBody.account), // buyer
      adminPubKey, // merchant
      new PublicKey(wallet.public_key), // affiliate
      adminPubKey, // admin
      product.price,
      product.commission,
      blink.id,
      buyerEmail
    );

    // transaction.addSignature(signerKeypair.publicKey, signerKeypair.secretKey);
    transaction.sign([signerKeypair]);
    const response: ActionPostResponse = {
      transaction: Buffer.from(transaction.serialize()).toString("base64"),
    };

    return NextResponse.json(response, { headers: ACTIONS_CORS_HEADERS });
  } catch (error) {
    console.error("Error fetching action:", error);
    const message = "Failed to create transaction";
    return new Response(message, {
      status: 500,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
}

async function prepareTransaction(
  buyerPubKey: PublicKey,
  merchantPubKey: PublicKey,
  affiliatePubKey: PublicKey,
  adminPubKey: PublicKey,
  amount: number,
  commission: number,
  blinkId: string,
  buyerEmail: string
) {
  // Add a dummy instruction to require the signer's signature
  const dummyInstruction = SystemProgram.transfer({
    fromPubkey: signerKeypair.publicKey,
    toPubkey: signerKeypair.publicKey,
    lamports: 0,
  });

  const ixList: TransactionInstruction[] = [dummyInstruction];

  const totalAmount = amount * 10 ** TOKEN_DECIMALS;

  const adminAmount = totalAmount * commission * ADMIN_FEE_PCT;
  const affiliateAmount = totalAmount * commission - adminAmount;
  const merchantAmount = totalAmount - affiliateAmount - adminAmount;

  const buyerATA = getAssociatedTokenAddressSync(TOKEN_MINT, buyerPubKey);
  const affiliateATA = getAssociatedTokenAddressSync(
    TOKEN_MINT,
    affiliatePubKey
  );
  const merchantATA = getAssociatedTokenAddressSync(TOKEN_MINT, merchantPubKey);
  const adminATA = getAssociatedTokenAddressSync(TOKEN_MINT, adminPubKey);

  const [affiliateATAInfo, merchantATAInfo] = await Promise.all([
    connection.getAccountInfo(affiliateATA),
    connection.getAccountInfo(merchantATA),
  ]);

  if (!affiliateATAInfo) {
    ixList.push(
      createAssociatedTokenAccountInstruction(
        buyerPubKey,
        affiliateATA,
        affiliatePubKey,
        TOKEN_MINT
      )
    );
  }

  if (!merchantATAInfo) {
    ixList.push(
      createAssociatedTokenAccountInstruction(
        buyerPubKey,
        merchantATA,
        merchantPubKey,
        TOKEN_MINT
      )
    );
  }

  const createTransferFromBuyerIX = (receiverATA: PublicKey, amount: number) =>
    createTransferCheckedInstruction(
      buyerATA,
      TOKEN_MINT,
      receiverATA,
      buyerPubKey,
      amount,
      TOKEN_DECIMALS
    );

  const transferAdminIx = createTransferFromBuyerIX(adminATA, adminAmount);
  ixList.push(transferAdminIx);

  const transferAffiliateIx = createTransferFromBuyerIX(
    affiliateATA,
    affiliateAmount
  );
  ixList.push(transferAffiliateIx);

  const transferMerchantIx = createTransferFromBuyerIX(
    merchantATA,
    merchantAmount
  );
  ixList.push(transferMerchantIx);

  const memoIx = new TransactionInstruction({
    keys: [],
    data: Buffer.from(
      `{"NewPurchase":{"blinkId":"${blinkId}", "buyerEmail":"${buyerEmail}"}}`,
      "utf-8"
    ),
    programId: new PublicKey("MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr"),
  });
  ixList.push(memoIx);

  const blockhash = await connection
    .getLatestBlockhash({ commitment: "max" })
    .then((res) => res.blockhash);
  const messageV0 = new TransactionMessage({
    payerKey: buyerPubKey,
    recentBlockhash: blockhash,
    instructions: ixList,
  }).compileToV0Message();
  return new VersionedTransaction(messageV0);
}
