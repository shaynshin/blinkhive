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
      .from("blinks")
      .select("id, product_id")
      .eq("user_email", userEmail);

    const blinks = (data || []).map((item) => ({
      id: item.id,
      productId: item.product_id,
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