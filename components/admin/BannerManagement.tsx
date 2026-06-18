"use client";

import { useMemo, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Banner, BannerStatus } from "@/lib/banner-types";
import { bannerSubtitle, bannerTitle } from "@/lib/banner-types";

type BannerManagementProps = {
  initialBanners: Banner[];
};

type FormState = {
  image: string;
  alt: string;
  linesText: string;
  status: BannerStatus;
  order: string;
};

const emptyForm = (order: number): FormState => ({
  image: "",
  alt: "",
  linesText: "",
  status: "Active",
  order: String(order),
});

function toFormState(banner: Banner): FormState {
  return {
    image: banner.image,
    alt: banner.alt,
    linesText: banner.lines.join("\n"),
    status: banner.status,
    order: String(banner.order),
  };
}

function toTableRows(banners: Banner[]) {
  return banners.map((banner) => ({
    id: banner.id,
    image: banner.image,
    title: bannerTitle(banner),
    subtitle: bannerSubtitle(banner),
    status: banner.status,
    order: banner.order,
  }));
}

export default function BannerManagement({ initialBanners }: BannerManagementProps) {
  const [banners, setBanners] = useState(initialBanners);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialBanners.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [error, setError] = useState("");

  const tableData = useMemo(() => toTableRows(banners), [banners]);

  const filteredData = tableData.filter((item) =>
    [item.title, item.subtitle, item.status, String(item.order), item.image]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  async function refreshBanners() {
    const response = await fetch("/api/admin/banners");
    if (!response.ok) {
      throw new Error("Unable to refresh banner list.");
    }
    const payload = await response.json();
    setBanners(payload.banners);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(banners.length + 1));
    setImageUploading(false);
    setError("");
    setShowModal(true);
  }

  function openEditModal(banner: Banner) {
    setModalMode("edit");
    setSelectedId(banner.id);
    setFormData(toFormState(banner));
    setImageUploading(false);
    setError("");
    setShowModal(true);
  }

  function openDeleteModal(id: number) {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    if (imageUploading) {
      setError("Please wait for the image upload to finish.");
      setPending(false);
      return;
    }

    if (!formData.image.trim()) {
      setError("Please upload a banner image.");
      setPending(false);
      return;
    }

    const lines = formData.linesText
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      image: formData.image.trim(),
      alt: formData.alt.trim(),
      lines,
      status: formData.status,
      order: Number(formData.order),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/banners" : `/api/admin/banners/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save banner.");
      }

      await refreshBanners();
      setShowModal(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save banner.");
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/banners/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete banner.");
      }

      await refreshBanners();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete banner.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Banner Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage homepage carousel slides. Only active banners appear on the site, ordered by the Order field.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <button
              type="button"
              onClick={openAddModal}
              className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Banner
            </button>
          </div>
        </div>
      </div>

      {error && !showModal && !showDeleteConfirm ? (
        <div className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Banner Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subtitle</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No banners found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                const banner = banners.find((entry) => entry.id === item.id);
                if (!banner) return null;

                return (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.image ? (
                        <img
                          key={item.image}
                          src={item.image}
                          alt=""
                          className="h-12 w-20 rounded-lg object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gray-200">
                          <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{item.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.subtitle || "—"}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                          item.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(banner)}
                          className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                          title="Edit"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => openDeleteModal(banner.id)}
                          className="rounded-lg p-2 text-red-600 transition-colors hover:bg-red-50"
                          title="Delete"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {modalMode === "add" ? "Add Banner" : "Edit Banner"}
                </h3>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg p-2 transition-colors hover:bg-gray-100"
                >
                  <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <ImageUploadField
                label="Banner image"
                folder="banners"
                value={formData.image}
                onChange={(image) => setFormData({ ...formData, image })}
                onUploadingChange={setImageUploading}
              />
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Alt text</span>
                <input
                  type="text"
                  required
                  value={formData.alt}
                  onChange={(event) => setFormData({ ...formData, alt: event.target.value })}
                  placeholder="Describe the banner image"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Headline lines</span>
                <textarea
                  required
                  rows={4}
                  value={formData.linesText}
                  onChange={(event) => setFormData({ ...formData, linesText: event.target.value })}
                  placeholder={"EPC - Engineering\nProcurement &\nConstruction"}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
                <span className="mt-1 block text-xs text-gray-500">One line per row. These appear stacked on the homepage carousel.</span>
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as BannerStatus })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Order</span>
                  <input
                    type="number"
                    min={1}
                    required
                    value={formData.order}
                    onChange={(event) => setFormData({ ...formData, order: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pending || imageUploading}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
                >
                  {imageUploading ? "Uploading image..." : pending ? "Saving..." : modalMode === "add" ? "Add Banner" : "Update Banner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-800">Confirm Delete</h3>
            </div>
            {error ? (
              <p className="mb-4 text-sm text-red-600">{error}</p>
            ) : (
              <p className="mb-6 text-gray-600">Are you sure you want to delete this banner? This action cannot be undone.</p>
            )}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteConfirm(false);
                  setError("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={pending}
                className="rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-60"
              >
                {pending ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
