import path from "node:path";
import { UPLOAD_FOLDERS } from "@/lib/upload-types";

export const UPLOADS_ROOT = path.join(process.cwd(), "uploads");
export const LEGACY_UPLOADS_ROOT = path.join(process.cwd(), "public", "uploads");

/** Folders that `/uploads/[...path]` is allowed to serve (upload folders + careers PDFs). */
const UPLOAD_ROUTE_FOLDERS = new Set<string>([...UPLOAD_FOLDERS, "careers"]);

export function isUploadRouteFolder(folder: string): boolean {
  return UPLOAD_ROUTE_FOLDERS.has(folder);
}

function isPathInsideRoot(filePath: string, root: string): boolean {
  const resolvedRoot = path.resolve(root);
  const resolvedFile = path.resolve(filePath);
  return resolvedFile === resolvedRoot || resolvedFile.startsWith(`${resolvedRoot}${path.sep}`);
}

export function getUploadFileCandidates(segments: string[]): string[] {
  if (segments.length < 2) {
    return [];
  }

  const [folder, ...rest] = segments;
  if (!isUploadRouteFolder(folder) || rest.some((part) => !part || part === "." || part === "..")) {
    return [];
  }

  const relativePath = path.join(folder, ...rest);

  return [UPLOADS_ROOT, LEGACY_UPLOADS_ROOT]
    .map((root) => path.resolve(root, relativePath))
    .filter((filePath) => isPathInsideRoot(filePath, UPLOADS_ROOT) || isPathInsideRoot(filePath, LEGACY_UPLOADS_ROOT));
}
