import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { extname, join } from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { createCareerApplication } from "@/lib/career-applications";

export const dynamic = "force-dynamic";

const allowedExtensions = new Set([".doc", ".docx", ".pdf", ".png", ".jpg", ".jpeg", ".webp"]);
const maxResumeSize = 500 * 1024;

function readText(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function cleanFileName(fileName: string) {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
}

async function saveResume(file: File) {
  if (!file.name || file.size === 0) return { resumeUrl: null, resumeName: null };
  if (file.size > maxResumeSize) {
    throw new Error("Resume file must be 500KB or smaller.");
  }

  const extension = extname(file.name).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    throw new Error("Only DOC, DOCX, PDF, and image files are allowed.");
  }

  const uploadsDir = join(process.cwd(), "public", "uploads", "careers");
  await mkdir(uploadsDir, { recursive: true });

  const storedName = `${Date.now()}-${randomUUID()}-${cleanFileName(file.name)}`;
  const filePath = join(uploadsDir, storedName);
  const bytes = Buffer.from(await file.arrayBuffer());
  await writeFile(filePath, bytes);

  return {
    resumeUrl: `/uploads/careers/${storedName}`,
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

    const resumeInfo = resume instanceof File ? await saveResume(resume) : { resumeUrl: null, resumeName: null };

    await createCareerApplication({
      fullName,
      email,
      phone,
      position,
      resumeUrl: resumeInfo.resumeUrl,
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
