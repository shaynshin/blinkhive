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
      .from("users")
      .select("email, name, public_key")
      .eq("email", userEmail);

    const users = (data || []).map((item) => ({
      userEmail: item.email,
      userName: item.name,
      publicKey: item.public_key,
    }));

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ user: users[0] });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}
