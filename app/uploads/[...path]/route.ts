import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getUploadFileCandidates } from "@/lib/upload-paths";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

async function findExistingFile(segments: string[]): Promise<string | null> {
  for (const filePath of getUploadFileCandidates(segments)) {
    try {
      await access(filePath);
      return filePath;
    } catch {
      continue;
    }
  }

  return null;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await params;
  const filePath = await findExistingFile(segments);

  if (!filePath) {
    return new NextResponse("Not found", { status: 404 });
  }

  const fileBuffer = await readFile(filePath);
  const extension = path.extname(filePath).toLowerCase();

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": MIME_TYPES[extension] ?? "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
