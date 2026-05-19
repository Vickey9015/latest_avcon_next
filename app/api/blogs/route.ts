import { NextResponse } from "next/server";
import { getPublishedBlogs } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const blogs = await getPublishedBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Blogs fetch error:", error);
    return NextResponse.json({ error: "Unable to load blogs." }, { status: 500 });
  }
}
