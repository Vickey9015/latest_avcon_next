import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  deleteBanner,
  normalizeBannerInput,
  updateBanner,
} from "@/lib/banners";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }
  return user;
}

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid banner id." }, { status: 400 });
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

    const updated = await updateBanner(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin banner update error:", error);
    return NextResponse.json({ error: "Unable to update banner." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid banner id." }, { status: 400 });
  }

  try {
    const deleted = await deleteBanner(id);
    if (!deleted) {
      return NextResponse.json({ error: "Banner not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin banner delete error:", error);
    return NextResponse.json({ error: "Unable to delete banner." }, { status: 500 });
  }
}
