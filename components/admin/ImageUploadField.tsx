"use client";

import { useRef, useState } from "react";
import type { UploadFolder } from "@/lib/upload-types";

type ImageUploadFieldProps = {
  label: string;
  folder: UploadFolder;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  hint?: string;
};

export default function ImageUploadField({
  label,
  folder,
  value,
  onChange,
  required = true,
  hint,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    try {
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to upload image.");
      }
      onChange(result.url);
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Unable to upload image.");
    } finally {
      setUploading(false);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  function clearImage() {
    onChange("");
    setUploadError("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">{label}</span>
      {value ? (
        <div className="mb-3 flex items-start gap-4">
          <img
            src={value}
            alt="Preview"
            className="h-28 w-auto max-w-[200px] rounded-lg border border-gray-200 object-cover"
          />
          <button
            type="button"
            onClick={clearImage}
            className="text-sm font-medium text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      ) : null}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleFileChange}
        disabled={uploading}
        className="block w-full text-sm text-gray-600 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-orange-700 hover:file:bg-orange-100 disabled:opacity-60"
      />
      {uploading ? <p className="mt-1 text-xs text-gray-500">Uploading image...</p> : null}
      {uploadError ? <p className="mt-1 text-xs text-red-600">{uploadError}</p> : null}
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
      {required && !value && !uploading ? (
        <p className="mt-1 text-xs text-amber-600">Upload an image (JPG, PNG, WEBP, or GIF, max 5MB).</p>
      ) : null}
    </div>
  );
}
