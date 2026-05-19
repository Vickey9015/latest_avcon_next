import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createTestimonial,
  getAllTestimonials,
  normalizeTestimonialInput,
} from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const testimonials = await getAllTestimonials();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Admin testimonials fetch error:", error);
    return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const id = await createTestimonial(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin testimonial create error:", error);
    return NextResponse.json({ error: "Unable to create testimonial." }, { status: 500 });
  }
}
