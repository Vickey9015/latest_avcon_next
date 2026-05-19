"use client";

import { useMemo, useState } from "react";
import type { Job, JobStatus } from "@/lib/job-types";
import { formatJobDate } from "@/lib/job-types";

type JobManagementProps = {
  initialJobs: Job[];
};

type FormState = {
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  shortDescription: string;
  fullDescription: string;
  publishDate: string;
  status: JobStatus;
  order: string;
};

const emptyForm = (order: number): FormState => ({
  title: "",
  department: "",
  location: "",
  jobType: "Full-time",
  experience: "",
  shortDescription: "",
  fullDescription: "",
  publishDate: new Date().toISOString().slice(0, 10),
  status: "Active",
  order: String(order),
});

function toFormState(job: Job): FormState {
  return {
    title: job.title,
    department: job.department,
    location: job.location,
    jobType: job.jobType,
    experience: job.experience,
    shortDescription: job.shortDescription,
    fullDescription: job.fullDescription,
    publishDate: job.publishDate,
    status: job.status,
    order: String(job.order),
  };
}

export default function JobManagement({ initialJobs }: JobManagementProps) {
  const [jobs, setJobs] = useState(initialJobs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialJobs.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return jobs.filter((job) =>
      [
        job.title,
        job.department,
        job.location,
        job.jobType,
        job.experience,
        job.status,
        String(job.applicationCount ?? 0),
        String(job.order),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [jobs, searchTerm]);

  async function refreshJobs() {
    const response = await fetch("/api/admin/jobs");
    if (!response.ok) {
      throw new Error("Unable to refresh job list.");
    }
    const payload = await response.json();
    setJobs(payload.jobs);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(jobs.length + 1));
    setError("");
    setShowModal(true);
  }

  function openEditModal(job: Job) {
    setModalMode("edit");
    setSelectedId(job.id);
    setFormData(toFormState(job));
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

    const payload = {
      title: formData.title.trim(),
      department: formData.department.trim(),
      location: formData.location.trim(),
      jobType: formData.jobType.trim(),
      experience: formData.experience.trim(),
      shortDescription: formData.shortDescription.trim(),
      fullDescription: formData.fullDescription.trim(),
      publishDate: formData.publishDate,
      status: formData.status,
      order: Number(formData.order),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/jobs" : `/api/admin/jobs/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save job.");
      }

      await refreshJobs();
      setShowModal(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save job.");
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/jobs/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete job.");
      }

      await refreshJobs();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete job.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Jobs Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage job openings on the Career page. Only Active jobs are shown publicly.
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
              Add Job
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Job Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Experience</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Applications</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={10} className="px-6 py-8 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            ) : (
              filteredData.map((job, index) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{job.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.department || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.location || "—"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{job.jobType}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{job.experience || "—"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        job.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : job.status === "Closed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {job.applicationCount ?? 0}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{job.order}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(job)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(job.id)}
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
                {modalMode === "add" ? "Add Job" : "Edit Job"}
              </h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-6">
              {error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Job title</span>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Department</span>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={(event) => setFormData({ ...formData, department: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Location</span>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(event) => setFormData({ ...formData, location: event.target.value })}
                    placeholder="Lucknow, India"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Job type</span>
                  <select
                    value={formData.jobType}
                    onChange={(event) => setFormData({ ...formData, jobType: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Experience</span>
                  <input
                    type="text"
                    value={formData.experience}
                    onChange={(event) => setFormData({ ...formData, experience: event.target.value })}
                    placeholder="2-4 years"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Publish date</span>
                  <input
                    type="date"
                    required
                    value={formData.publishDate}
                    onChange={(event) => setFormData({ ...formData, publishDate: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as JobStatus })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active (show on site)</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Closed">Closed</option>
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
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Short description</span>
                  <textarea
                    required
                    rows={3}
                    value={formData.shortDescription}
                    onChange={(event) => setFormData({ ...formData, shortDescription: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Full description</span>
                  <textarea
                    required
                    rows={5}
                    value={formData.fullDescription}
                    onChange={(event) => setFormData({ ...formData, fullDescription: event.target.value })}
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
                  disabled={pending}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
                >
                  {pending ? "Saving..." : modalMode === "add" ? "Add Job" : "Update Job"}
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
              <p className="mt-4 text-gray-600">Are you sure you want to delete this job? This action cannot be undone.</p>
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
