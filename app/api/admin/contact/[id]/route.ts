import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { updateContactSubmissionStatus } from "@/lib/contact-submissions";
import type { ContactSubmissionStatus } from "@/lib/contact-types";

export const dynamic = "force-dynamic";

function parseId(value: string) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function parseStatus(value: unknown): ContactSubmissionStatus | null {
  if (value === "Unread" || value === "Replied") {
    return value;
  }
  return null;
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
    return NextResponse.json({ error: "Invalid submission id." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const status = parseStatus(body.status);
    if (!status) {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }

    const updated = await updateContactSubmissionStatus(id, status);
    if (!updated) {
      return NextResponse.json({ error: "Submission not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, status });
  } catch (error) {
    console.error("Contact status update error:", error);
    return NextResponse.json({ error: "Unable to update status." }, { status: 500 });
  }
}
