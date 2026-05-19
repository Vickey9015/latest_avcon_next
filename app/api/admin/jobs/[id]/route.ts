import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { deleteJob, normalizeJobInput, updateJob } from "@/lib/jobs";

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
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const input = normalizeJobInput(body);

    if (!input) {
      return NextResponse.json(
        { error: "Title, descriptions, and order are required." },
        { status: 400 },
      );
    }

    const updated = await updateJob(id, input);
    if (!updated) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin job update error:", error);
    return NextResponse.json({ error: "Unable to update job." }, { status: 500 });
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
    return NextResponse.json({ error: "Invalid job id." }, { status: 400 });
  }

  try {
    const deleted = await deleteJob(id);
    if (!deleted) {
      return NextResponse.json({ error: "Job not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin job delete error:", error);
    return NextResponse.json({ error: "Unable to delete job." }, { status: 500 });
  }
}
