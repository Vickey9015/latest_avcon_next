import { NextResponse } from "next/server";
import { getActiveJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const jobs = await getActiveJobs();
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Jobs fetch error:", error);
    return NextResponse.json({ error: "Unable to load jobs." }, { status: 500 });
  }
}
