import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createBanner,
  getAllBanners,
  normalizeBannerInput,
} from "@/lib/banners";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  return user;
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const banners = await getAllBanners();
    return NextResponse.json({ banners });
  } catch (error) {
    console.error("Admin banners fetch error:", error);
    return NextResponse.json({ error: "Unable to load banners." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = normalizeBannerInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Image, alt text, headline lines, and order are required." },
        { status: 400 },
      );
    }

    const id = await createBanner(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin banner create error:", error);
    return NextResponse.json({ error: "Unable to create banner." }, { status: 500 });
  }
}
