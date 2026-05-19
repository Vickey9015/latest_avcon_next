import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { createJob, getAllJobs, normalizeJobInput } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const jobs = await getAllJobs();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Admin jobs fetch error:", error);
    return NextResponse.json({ error: "Unable to load jobs." }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

    const id = await createJob(input);
    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Admin job create error:", error);
    return NextResponse.json({ error: "Unable to create job." }, { status: 500 });
  }
}
