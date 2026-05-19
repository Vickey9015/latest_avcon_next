import { extname } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { createCareerApplication } from "@/lib/career-applications";
import { getActiveJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const allowedExtensions = new Set([".doc", ".docx", ".pdf", ".png", ".jpg", ".jpeg", ".webp"]);
const maxResumeSize = 500 * 1024;

function readText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

async function saveResume(file: File) {
  if (!file.name || file.size === 0) {
    return { resumeData: null, resumeMimeType: null, resumeName: null };
  }

  if (file.size > maxResumeSize) {
    throw new Error("Resume file must be 500KB or smaller.");
  }

  const extension = extname(file.name).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Only DOC, DOCX, PDF, and image files are allowed.");
  }

  return {
    resumeData: Buffer.from(await file.arrayBuffer()),
    resumeMimeType: file.type || "application/octet-stream",
    resumeName: file.name,
  };
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const fullName = readText(formData.get("fullName"));
    const email = readText(formData.get("email"));
    const phone = readText(formData.get("phone"));
    const position = readText(formData.get("position"));
    const resume = formData.get("resume");

    if (!fullName || !email || !phone || !position) {
      return NextResponse.json(
        { error: "Please fill all required fields." },
        { status: 400 },
      );
    }

    const activeJobs = await getActiveJobs();
    const validPositions = new Set(activeJobs.map((job) => job.title));
    if (!validPositions.has(position)) {
      return NextResponse.json(
        { error: "Please select a valid job position from the list." },
        { status: 400 },
      );
    }

    const resumeInfo =
      resume instanceof File ? await saveResume(resume) : { resumeData: null, resumeMimeType: null, resumeName: null };

    await createCareerApplication({
      fullName,
      email,
      phone,
      position,
      resumeData: resumeInfo.resumeData,
      resumeMimeType: resumeInfo.resumeMimeType,
      resumeName: resumeInfo.resumeName,
    });

    return NextResponse.json({
      success: true,
      message: "Your application has been submitted successfully.",
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to submit your application right now." },
      { status: 500 },
    );
  }
}
