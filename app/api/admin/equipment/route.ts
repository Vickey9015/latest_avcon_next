import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createEquipmentProduct,
  getAllEquipmentProducts,
  normalizeEquipmentInput,
} from "@/lib/equipment";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const products = await getAllEquipmentProducts();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Admin equipment fetch error:", error);
    return NextResponse.json({ error: "Unable to load equipment." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = normalizeEquipmentInput(body);

    if (!input) {
      return NextResponse.json(
        {
          error:
            "Title, slug, category, short description, description, at least one image, and order are required.",
        },
        { status: 400 },
      );
    }

    const id = await createEquipmentProduct(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin equipment create error:", error);
    const code = (error as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "An equipment product with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to create equipment product." }, { status: 500 });
  }
}
