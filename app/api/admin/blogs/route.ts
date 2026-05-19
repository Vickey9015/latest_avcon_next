import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createBlog, getAllBlogs, normalizeBlogInput } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const blogs = await getAllBlogs();
    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Admin blogs fetch error:", error);
    return NextResponse.json({ error: "Unable to load blogs." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = normalizeBlogInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Title, image, slug, and order are required." },
        { status: 400 },
      );
    }

    const id = await createBlog(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin blog create error:", error);
    const code = (error as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to create blog." }, { status: 500 });
  }
}
