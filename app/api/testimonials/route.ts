import { NextResponse } from "next/server";
import { getActiveTestimonials } from "@/lib/testimonials";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const testimonials = await getActiveTestimonials();
    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Testimonials fetch error:", error);
    return NextResponse.json({ error: "Unable to load testimonials." }, { status: 500 });
  }
}
