import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { isUploadFolder } from "@/lib/upload-types";
import { saveAdminImage } from "@/lib/upload-image";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folderValue = formData.get("folder");
    const folder = typeof folderValue === "string" ? folderValue : "";

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No image file provided." }, { status: 400 });
    }

    if (!isUploadFolder(folder)) {
      return NextResponse.json({ error: "Invalid upload folder." }, { status: 400 });
    }

    const url = await saveAdminImage(file, folder);
    return NextResponse.json({ success: true, url });
  } catch (error) {
    console.error("Admin image upload error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to upload image." },
      { status: 400 },
    );
  }
}
