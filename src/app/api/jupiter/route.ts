import { NextResponse } from "next/server";
import { JupiterAllowedTokens } from "@/lib/jupiter";
import { supabase } from "@/lib/supabase";

export async function GET(_request: Request) {
  try {
    const { data, error } = await supabase
      .from("jupiter")
      .select("name, symbol, mint, decimals, logo_uri");

    if (error) throw error;
    if (!data) throw Error("Token not found");

    const jupiterAllowedTokens: JupiterAllowedTokens[] = (data || []).map(
      (item: any) => ({
        name: item.name,
        symbol: item.symbol,
        mint: item.mint,
        decimals: item.decimals,
        logoURI: item.logo_uri,
      })
    );

    return NextResponse.json({ jupiterAllowedTokens });
  } catch (error) {
    console.error("Error fetching Jupiter allowed tokens:", error);
    const message = "Failed to fetch Jupiter allowed tokens";
    return NextResponse.json(message, {
      status: 500,
    });
  }
}
