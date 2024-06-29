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
      .from("products")
      .select("*")
      .eq("user_email", userEmail);

    const products = (data || []).map((item) => ({
      id: item.id,
      gumroadUrl: item.gumroad_url,
      name: item.name,
      seller: item.seller,
      price: item.price,
      rating: item.rating,
      imageUrl: item.image_url,
      userEmail: item.user_email,
      commission: item.commission,
      createdAt: item.created_at,
    }));

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ products: products });
  } catch (error) {
    console.error("Error fetching user's products:", error);
    return NextResponse.json(
      { error: "Failed to fetch user's products" },
      { status: 500 }
    );
  }
}
