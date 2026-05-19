import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import {
  createProject,
  getAllProjects,
  normalizeProjectInput,
} from "@/lib/projects";

export const dynamic = "force-dynamic";

async function requireAdmin() {
  return getCurrentUser();
}

export async function GET() {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const projects = await getAllProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Admin projects fetch error:", error);
    return NextResponse.json({ error: "Unable to load projects." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await requireAdmin();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const input = normalizeProjectInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Title, image, description, tag, and order are required." },
        { status: 400 },
      );
    }

    const id = await createProject(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin project create error:", error);
    return NextResponse.json({ error: "Unable to create project." }, { status: 500 });
  }
}
