import { NextResponse } from "next/server";
import { load } from "cheerio";
import { supabase } from "@/lib/supabase";
import { Magic } from "@magic-sdk/admin";

const magic = new Magic(process.env.MAGIC_SECRET_KEY);

export async function POST(req: Request) {
  try {
    const didToken = req.headers.get("Authorization")?.slice(7);
    if (!didToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { url } = await req.json();
    const metadata = await magic.users.getMetadataByToken(didToken!);
    const userEmail = metadata.email;

    if (!userEmail) {
      throw new Error("Email not available");
    }

    // Check if the user is whitelisted as an merchant
    const { data: whitelistData, error: whitelistError } = await supabase
      .from("whitelist")
      .select("*")
      .eq("user_email", userEmail)
      .eq("user_role", "merchant")
      .single();

    if (whitelistError || !whitelistData) {
      return NextResponse.json(
        { error: "User not whitelisted as merchant" },
        { status: 403 }
      );
    }

    // First, check product eligibility
    const eligibilityUrl = `https://app.gumroad.com/global_affiliates/product_eligibility/${encodeURIComponent(
      url
    )}`;

    const eligibilityResponse = await fetch(eligibilityUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Cookie: `${process.env.GUMROAD_AFFLIATE_ID}; ${process.env.GUMROAD_APP_SESSION}; ${process.env.GUMROAD_GUID}; ${process.env.GUMROAD_GUID}`,
        Accept: "application/json",
      },
    });

    const responseText = await eligibilityResponse.text();

    let eligibilityData;
    try {
      eligibilityData = JSON.parse(responseText);
    } catch (error) {
      console.error("Failed to parse JSON:", error);
      throw new Error("Invalid response from eligibility check");
    }

    if (!eligibilityData.success || !eligibilityData.product.recommendable) {
      throw new Error("Product is not eligible for recommendation");
    }

    if (!eligibilityData.success || !eligibilityData.product.recommendable) {
      throw new Error("Product is not eligible for recommendation");
    }
    const response = await fetch(url);
    const html = await response.text();
    const $ = load(html);

    const name = $('h1[itemprop="name"]').first().text().trim();
    const priceText = $(".price").first().text().trim();
    const price = parseFloat(priceText.replace("$", ""));
    const ratingElement = $(".rating");
    const rating =
      parseFloat(ratingElement.find(".rating-average").text().trim()) || 0;
    const seller = $(".user").text().trim();
    const imageUrl = $('meta[property="og:image"]').attr("content") || "";

    // Validation
    const scrapedData = { name, price, rating, seller, imageUrl };
    const missingFields = Object.entries(scrapedData)
      .filter(([_, value]) => value === undefined || value === "")
      .map(([key, _]) => key);

    if (missingFields.length > 0) {
      throw new Error(`Missing or empty fields: ${missingFields.join(", ")}`);
    }

    // Insert the product into the database
    const { data, error } = await supabase
      .from("products")
      .insert({
        name,
        price,
        rating,
        seller,
        commission: 0.1,
        image_url: imageUrl,
        gumroad_url: url,
        user_email: userEmail,
      })
      .select();

    if (error || !data) throw error;

    const product = data[0];

    return NextResponse.json({
      success: true,
      product: {
        id: product.id,
        gumroadUrl: product.gumroad_url,
        name: product.name,
        seller: product.seller,
        price: product.price,
        rating: product.rating,
        imageUrl: product.image_url,
        commission: product.commission,
        userEmail: product.user_email,
        createdAt: product.created_at,
      },
    });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");

    const { data, error } = await supabase
      .from("products")
      .select(
        "id, name, price, rating, seller, image_url, gumroad_url, commission"
      );

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
