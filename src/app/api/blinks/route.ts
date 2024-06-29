import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";

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

    const { productId } = await req.json();

    // Insert the blink into the database
    const { data, error } = await supabase
      .from("blinks")
      .insert({
        product_id: productId,
        user_email: userEmail,
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
