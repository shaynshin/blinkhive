import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get("path");
  const ref = searchParams.get("ref");

  const baseUrl = "http://localhost:3000";
  let destination = `https://actions.dialect.to/?action=solana-action:${encodeURIComponent(
    `${baseUrl}/api/action/${path}`
  )}`;

  if (ref) {
    destination += encodeURIComponent(`?ref=${ref as string}`);
  }

  return NextResponse.redirect(destination);
}
