import { NextResponse } from "next/server";
import { load } from "cheerio";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function GET(req: Request) {
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

    // Check if the user is whitelisted as an merchant
    const { data: whitelistData, error: whitelistError } = await supabase
      .from("whitelist")
      .select("*")
      .eq("user_email", userEmail)
      .eq("user_role", "merchant")
      .single();

    if (whitelistError || !whitelistData) {
      return NextResponse.json(
        { error: "User not whitelisted as merchant" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error fetching whitelist:", error);
    return NextResponse.json(
      { error: "Failed to fetch whitelist" },
      { status: 500 }
    );
  }
}
