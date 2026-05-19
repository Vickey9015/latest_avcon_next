import "server-only";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { UploadFolder } from "@/lib/upload-types";
import { isUploadFolder } from "@/lib/upload-types";

export type { UploadFolder } from "@/lib/upload-types";
export { isUploadFolder, UPLOAD_FOLDERS } from "@/lib/upload-types";

const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function saveAdminImage(file: File, folder: UploadFolder): Promise<string> {
  if (!file.name || file.size === 0) {
    throw new Error("Please choose an image file.");
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 5MB or smaller.");
  }

  const extensionFromName = path.extname(file.name).toLowerCase();
  const extension =
    ALLOWED_EXTENSIONS.has(extensionFromName) ? extensionFromName : MIME_TO_EXT[file.type] ?? "";

  if (!extension || !ALLOWED_EXTENSIONS.has(extension)) {
    throw new Error("Only JPG, PNG, WEBP, and GIF images are allowed.");
  }

  const safeBase = path
    .basename(file.name, extensionFromName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);

  const filename = `${Date.now()}-${randomUUID()}${safeBase ? `-${safeBase}` : ""}${extension}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads", folder);

  await mkdir(uploadDir, { recursive: true });
  await writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));

  return `/uploads/${folder}/${filename}`;
}
