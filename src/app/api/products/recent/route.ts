import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(_req: Request) {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, price, rating, seller, image_url, gumroad_url, commission"
      )
      .order("created_at", { ascending: false })
      .limit(12);

    if (error) {
      throw new Error(error.message);
    }

    const products = (data || []).map((item) => ({
      id: item.id,
      gumroadUrl: item.gumroad_url,
      name: item.name,
      seller: item.seller,
      price: item.price,
      rating: item.rating,
      imageUrl: item.image_url,
      commission: item.commission,
    }));

    return NextResponse.json({ products: products });
  } catch (error) {
    console.error("Error fetching all products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
