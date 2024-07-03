import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { verifyWalletSignature } from "@/lib/walletAuth";

export async function GET(req: Request) {
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

    const { data, error } = await supabase
      .from("blinks")
      .select("id, products (*)")
      .eq("user_pub_key", pubkey);

    const blinks = (data || []).map((item: any) => ({
      id: item.id,
      productId: item.products.id,
      productName: item.products.name,
      productPrice: item.products.price,
      productRating: item.products.rating,
      productSeller: item.products.seller,
      productImageUrl: item.products.image_url,
      productCommission: item.products.commission,
      productGumroadUrl: item.products.gumroad_url,
    }));

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ blinks });
  } catch (error) {
    console.error("Error fetching user's blinks:", error);
    return NextResponse.json(
      { error: "Failed to fetch user's blinks" },
      { status: 500 }
    );
  }
}
