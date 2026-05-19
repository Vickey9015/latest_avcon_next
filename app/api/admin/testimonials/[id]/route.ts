import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  deleteTestimonial,
  normalizeTestimonialInput,
  updateTestimonial,
} from "@/lib/testimonials";

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
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const input = normalizeTestimonialInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Quote, client name, photo, designation, and order are required." },
        { status: 400 },
      );
    }

    const updated = await updateTestimonial(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin testimonial update error:", error);
    return NextResponse.json({ error: "Unable to update testimonial." }, { status: 500 });
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
    return NextResponse.json({ error: "Invalid testimonial id." }, { status: 400 });
  }

  try {
    const deleted = await deleteTestimonial(id);
    if (!deleted) {
      return NextResponse.json({ error: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin testimonial delete error:", error);
    return NextResponse.json({ error: "Unable to delete testimonial." }, { status: 500 });
  }
}
