import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function GET(req: Request) {
  try {
    const didToken = req.headers.get("Authorization")?.slice(7);
    if (!didToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const metadata = await magic.users.getMetadataByToken(didToken);
    const userEmail = metadata.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "User email not found" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("wallet")
      .select("user_email, public_key")
      .eq("user_email", userEmail);

    const wallets = (data || []).map((item) => ({
      userEmail: item.user_email,
      publicKey: item.public_key,
    }));

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ wallet: wallets[0] });
  } catch (error) {
    console.error("Error fetching user's wallet:", error);
    return NextResponse.json(
      { error: "Failed to fetch user's wallet" },
      { status: 500 }
    );
  }
}
