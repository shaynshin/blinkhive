import { NextResponse } from "next/server";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const didToken = req.headers.get("Authorization")?.slice(7);
    const metadata = await magic.users.getMetadataByToken(didToken!);

    // Here you would typically create a session or JWT for the user
    return NextResponse.json({ email: metadata.email });
  } catch (error) {
    console.error("An error occurred during login:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 500 });
  }
}
