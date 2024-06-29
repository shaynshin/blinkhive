import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", params.id)
      .eq("user_email", userEmail)
      .single();

    if (fetchError) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (!product) {
      return NextResponse.json(
        { error: "Unauthorized to delete this product" },
        { status: 403 }
      );
    }

    const { error: deleteError } = await supabase
      .from("products")
      .delete()
      .eq("id", params.id)
      .eq("user_email", userEmail);

    if (deleteError) {
      console.error("Error deleting product:", deleteError);
      return NextResponse.json(
        { error: "Failed to delete product" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error in delete operation:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
