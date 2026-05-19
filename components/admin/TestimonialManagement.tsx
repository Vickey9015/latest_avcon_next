"use client";

import { useMemo, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type { Testimonial, TestimonialStatus } from "@/lib/testimonial-types";
import { formatTestimonialRole } from "@/lib/testimonial-types";

type TestimonialManagementProps = {
  initialTestimonials: Testimonial[];
};

type FormState = {
  quote: string;
  name: string;
  image: string;
  company: string;
  designation: string;
  rating: string;
  status: TestimonialStatus;
  order: string;
};

const emptyForm = (order: number): FormState => ({
  quote: "",
  name: "",
  image: "",
  company: "",
  designation: "",
  rating: "5",
  status: "Active",
  order: String(order),
});

function toFormState(testimonial: Testimonial): FormState {
  return {
    quote: testimonial.quote,
    name: testimonial.name,
    image: testimonial.image,
    company: testimonial.company,
    designation: testimonial.designation,
    rating: String(testimonial.rating),
    status: testimonial.status,
    order: String(testimonial.order),
  };
}

export default function TestimonialManagement({ initialTestimonials }: TestimonialManagementProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialTestimonials.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return testimonials.filter((item) =>
      [item.name, item.company, item.designation, item.quote, item.status, String(item.rating), String(item.order)]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [testimonials, searchTerm]);

  async function refreshTestimonials() {
    const response = await fetch("/api/admin/testimonials");
    if (!response.ok) {
      throw new Error("Unable to refresh testimonial list.");
    }
    const payload = await response.json();
    setTestimonials(payload.testimonials);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(testimonials.length + 1));
    setError("");
    setShowModal(true);
  }

  function openEditModal(testimonial: Testimonial) {
    setModalMode("edit");
    setSelectedId(testimonial.id);
    setFormData(toFormState(testimonial));
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

    if (!formData.image.trim()) {
      setError("Please upload a client photo.");
      setPending(false);
      return;
    }

    const payload = {
      quote: formData.quote.trim(),
      name: formData.name.trim(),
      image: formData.image.trim(),
      company: formData.company.trim(),
      designation: formData.designation.trim(),
      rating: Number(formData.rating),
      status: formData.status,
      order: Number(formData.order),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/testimonials" : `/api/admin/testimonials/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save testimonial.");
      }

      await refreshTestimonials();
      setShowModal(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save testimonial.");
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/testimonials/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete testimonial.");
      }

      await refreshTestimonials();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete testimonial.");
    } finally {
      setPending(false);
    }
  }

  const rolePreview = formatTestimonialRole(formData.designation, formData.company);

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Testimonial Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage client feedback shown in the homepage carousel. Only Active testimonials appear on the site.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="button"
              onClick={openAddModal}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Testimonial
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
        <table className="w-full min-w-[1100px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Photo</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Client Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Company</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Rating</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No testimonials found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {item.image ? (
                      <img src={item.image} alt="" className="h-12 w-12 rounded-full object-cover" />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.company || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.designation}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{item.rating} / 5</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
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
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{item.order}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(item)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(item.id)}
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
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <h3 className="text-xl font-bold text-gray-800">
                {modalMode === "add" ? "Add Testimonial" : "Edit Testimonial"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-gray-700">Client feedback / quote</span>
                <textarea
                  required
                  rows={4}
                  value={formData.quote}
                  onChange={(event) => setFormData({ ...formData, quote: event.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                />
              </label>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Client name</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(event) => setFormData({ ...formData, name: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <ImageUploadField
                  label="Client photo"
                  folder="testimonials"
                  value={formData.image}
                  onChange={(image) => setFormData({ ...formData, image })}
                />
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Designation</span>
                  <input
                    type="text"
                    required
                    value={formData.designation}
                    onChange={(event) => setFormData({ ...formData, designation: event.target.value })}
                    placeholder="CEO"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Company</span>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(event) => setFormData({ ...formData, company: event.target.value })}
                    placeholder="Manufacturing Unit"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Rating</span>
                  <select
                    value={formData.rating}
                    onChange={(event) => setFormData({ ...formData, rating: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    {[5, 4, 3, 2, 1].map((value) => (
                      <option key={value} value={value}>
                        {value} stars
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as TestimonialStatus })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
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
              {rolePreview ? (
                <p className="text-sm text-gray-500">
                  Role preview on homepage: <span className="font-medium text-gray-700">{rolePreview}</span>
                </p>
              ) : null}
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
                  disabled={pending}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
                >
                  {pending ? "Saving..." : modalMode === "add" ? "Add Testimonial" : "Update Testimonial"}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}

      {showDeleteConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-6">
            <h3 className="text-lg font-bold text-gray-800">Confirm Delete</h3>
            {error ? (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            ) : (
              <p className="mt-4 text-gray-600">
                Are you sure you want to delete this testimonial? This action cannot be undone.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
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
