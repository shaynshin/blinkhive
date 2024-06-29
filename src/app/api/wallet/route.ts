import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";
import { PublicKey } from "@solana/web3.js";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const didToken = req.headers.get("Authorization")?.slice(7);
    if (!didToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const metadata = await magic.users.getMetadataByToken(didToken!);
    const userEmail = metadata.email;

    if (!userEmail) {
      throw new Error("Email not available");
    }

    const { publicKey } = await req.json();

    // checck if valid pubkey
    try {
      new PublicKey(publicKey);
    } catch (error) {
      throw error;
    }

    // Insert the product into the database
    const { data, error } = await supabase
      .from("wallet")
      .upsert(
        {
          user_email: userEmail,
          public_key: publicKey,
        },
        {
          onConflict: "user_email",
        }
      )
      .select();

    if (error || !data) throw error;

    const wallet = data[0];

    return NextResponse.json({
      success: true,
      wallet: {
        userEmail: wallet.user_email,
        publicKey: wallet.public_key,
      },
    });
  } catch (error) {
    console.error("Error saving wallet:", error);
    return NextResponse.json(
      { error: "Failed to save wallet" },
      { status: 500 }
    );
  }
}