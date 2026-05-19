import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteBlog, normalizeBlogInput, updateBlog } from "@/lib/blogs";

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
    return NextResponse.json({ error: "Invalid blog id." }, { status: 400 });
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

    const updated = await updateBlog(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin blog update error:", error);
    const code = (error as { code?: string }).code;
    if (code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "A blog with this slug already exists." }, { status: 409 });
    }
    return NextResponse.json({ error: "Unable to update blog." }, { status: 500 });
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
    return NextResponse.json({ error: "Invalid blog id." }, { status: 400 });
  }

  try {
    const deleted = await deleteBlog(id);
    if (!deleted) {
      return NextResponse.json({ error: "Blog not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin blog delete error:", error);
    return NextResponse.json({ error: "Unable to delete blog." }, { status: 500 });
  }
}
