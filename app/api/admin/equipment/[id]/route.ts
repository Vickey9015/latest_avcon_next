import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  deleteEquipmentProduct,
  normalizeEquipmentInput,
  updateEquipmentProduct,
} from "@/lib/equipment";

export const dynamic = "force-dynamic";

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid equipment id." }, { status: 400 });
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

    const updated = await updateEquipmentProduct(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Equipment product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin equipment update error:", error);
    const code = (error as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "An equipment product with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to update equipment product." }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: idParam } = await params;
  const id = parseId(idParam);
  if (!id) {
    return NextResponse.json({ error: "Invalid equipment id." }, { status: 400 });
  }

  try {
    const deleted = await deleteEquipmentProduct(id);
    if (!deleted) {
      return NextResponse.json({ error: "Equipment product not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin equipment delete error:", error);
    return NextResponse.json({ error: "Unable to delete equipment product." }, { status: 500 });
  }
}
