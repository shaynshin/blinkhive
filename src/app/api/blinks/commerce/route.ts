import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyWalletSignature } from "@/lib/walletAuth";

export async function POST(req: Request) {
  try {
    const verificationStr = req.headers.get("x-verification");
    const signatureStr = req.headers.get("x-signature");
    const pubkey = req.headers.get("x-pubkey");

    if (
      !verificationStr ||
      !signatureStr ||
      !pubkey ||
      !verifyWalletSignature(verificationStr, signatureStr, pubkey)
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    // Check if the user is whitelisted as an affiliate
    const { data: whitelistData, error: whitelistError } = await supabase
      .from("whitelist")
      .select("*")
      .eq("user_pub_key", pubkey)
      .eq("user_role", "affiliate")
      .single();

    if (whitelistError || !whitelistData) {
      return NextResponse.json(
        { error: "User not whitelisted as affiliate" },
        { status: 403 }
      );
    }

    // Insert the blink into the database
    const { data, error } = await supabase
      .from("commerce_blinks")
      .insert({
        product_id: productId,
        user_pub_key: pubkey,
      })
      .select();

    if (error || !data) throw error;

    const blink = data[0];

    return NextResponse.json({
      success: true,
      blink: {
        id: blink.id,
        productId: blink.product_id,
      },
    });
  } catch (error) {
    console.error("Error creating blink:", error);
    return NextResponse.json(
      { error: "Error creating blink" },
      { status: 500 }
    );
  }
}
