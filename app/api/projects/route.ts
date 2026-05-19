import { NextResponse } from "next/server";
import { getActiveProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const projects = await getActiveProjects();
    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Projects fetch error:", error);
    return NextResponse.json({ error: "Unable to load projects." }, { status: 500 });
  }
}
