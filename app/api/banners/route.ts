import { NextResponse } from "next/server";
import { getActiveBanners } from "@/lib/banners";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const banners = await getActiveBanners();
    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Banners fetch error:", error);
    return NextResponse.json({ error: "Unable to load banners." }, { status: 500 });
  }
}
