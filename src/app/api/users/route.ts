import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";
import { PublicKey } from "@solana/web3.js";

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
      throw new Error("Invalid email");
    }

    const { publicKey, userName } = await req.json();

    if (!userName) {
      throw new Error("Invalid username");
    }

    // checck if valid pubkey
    try {
      new PublicKey(publicKey);
    } catch (error) {
      throw error;
    }

    // Insert the product into the database
    const { data, error } = await supabase
      .from("users")
      .upsert(
        {
          email: userEmail,
          name: userName,
          public_key: publicKey,
        },
        {
          onConflict: "email",
        }
      )
      .select();

    if (error || !data) throw error;

    const user = data[0];

    return NextResponse.json({
      success: true,
      user: {
        userEmail: user.email,
        userName: user.name,
        publicKey: user.public_key,
      },
    });
  } catch (error) {
    console.error("Error saving user:", error);
    return NextResponse.json(
      { error: "Failed to save user" },
      { status: 500 }
    );
  }
}
