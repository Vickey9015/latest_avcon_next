import { NextResponse } from "next/server";
import { getCareerResume } from "@/lib/career-applications";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function safeFileName(fileName: string) {
  return fileName.replace(/["\r\n]/g, "_");
}

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const applicationId = Number(id);

  if (!Number.isInteger(applicationId) || applicationId <= 0) {
    return NextResponse.json({ error: "Invalid resume id." }, { status: 400 });
  }

  const resume = await getCareerResume(applicationId);
  if (!resume) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(resume.resume_data), {
    headers: {
      "Content-Disposition": `attachment; filename="${safeFileName(resume.resume_name)}"`,
      "Content-Type": resume.resume_mime_type || "application/octet-stream",
    },
  });
}
