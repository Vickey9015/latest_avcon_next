"use client";

import { useMemo, useState } from "react";
import ImageUploadField from "@/components/admin/ImageUploadField";
import type {
  Project,
  ProjectLifecycleStatus,
  ProjectVisibility,
} from "@/lib/project-types";

type ProjectManagementProps = {
  initialProjects: Project[];
};

type FormState = {
  title: string;
  image: string;
  description: string;
  tag: string;
  client: string;
  sector: string;
  status: ProjectVisibility;
  lifecycleStatus: ProjectLifecycleStatus;
  completionPct: string;
  order: string;
};

const emptyForm = (order: number): FormState => ({
  title: "",
  image: "",
  description: "",
  tag: "",
  client: "",
  sector: "",
  status: "Active",
  lifecycleStatus: "Active",
  completionPct: "0",
  order: String(order),
});

function toFormState(project: Project): FormState {
  return {
    title: project.title,
    image: project.image,
    description: project.description,
    tag: project.tag,
    client: project.client,
    sector: project.sector,
    status: project.status,
    lifecycleStatus: project.lifecycleStatus,
    completionPct: String(project.completionPct),
    order: String(project.order),
  };
}

export default function ProjectManagement({ initialProjects }: ProjectManagementProps) {
  const [projects, setProjects] = useState(initialProjects);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialProjects.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return projects.filter((project) =>
      [
        project.title,
        project.client,
        project.sector,
        project.tag,
        project.status,
        project.lifecycleStatus,
        String(project.completionPct),
        String(project.order),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [projects, searchTerm]);

  async function refreshProjects() {
    const response = await fetch("/api/admin/projects");
    if (!response.ok) {
      throw new Error("Unable to refresh project list.");
    }
    const payload = await response.json();
    setProjects(payload.projects);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(projects.length + 1));
    setError("");
    setShowModal(true);
  }

  function openEditModal(project: Project) {
    setModalMode("edit");
    setSelectedId(project.id);
    setFormData(toFormState(project));
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
      setError("Please upload a project image.");
      setPending(false);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      image: formData.image.trim(),
      description: formData.description.trim(),
      tag: formData.tag.trim(),
      client: formData.client.trim(),
      sector: formData.sector.trim(),
      status: formData.status,
      lifecycleStatus: formData.lifecycleStatus,
      completionPct: Number(formData.completionPct),
      order: Number(formData.order),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/projects" : `/api/admin/projects/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save project.");
      }

      await refreshProjects();
      setShowModal(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save project.");
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/projects/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete project.");
      }

      await refreshProjects();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete project.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Project Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage projects shown on the public Projects page. Only items with visibility Active appear on the site.
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
              Add Project
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Project Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Project Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Sector</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Completion %</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                  No projects found
                </td>
              </tr>
            ) : (
              filteredData.map((project, index) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {project.image ? (
                      <img src={project.image} alt="" className="h-12 w-20 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gray-200">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{project.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.client || "—"}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.sector || project.tag}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        project.lifecycleStatus === "Completed"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {project.lifecycleStatus}
                    </span>
                    {project.status === "Inactive" ? (
                      <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs font-medium text-yellow-800">
                        Hidden
                      </span>
                    ) : null}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{project.completionPct}%</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{project.order}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(project)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(project.id)}
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
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {modalMode === "add" ? "Add Project" : "Edit Project"}
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
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Project name</span>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(event) => setFormData({ ...formData, title: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Project image"
                    folder="projects"
                    value={formData.image}
                    onChange={(image) => setFormData({ ...formData, image })}
                  />
                </div>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Tag (card badge)</span>
                  <input
                    type="text"
                    required
                    value={formData.tag}
                    onChange={(event) => setFormData({ ...formData, tag: event.target.value })}
                    placeholder="Clean Energy"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Sector</span>
                  <input
                    type="text"
                    value={formData.sector}
                    onChange={(event) => setFormData({ ...formData, sector: event.target.value })}
                    placeholder="Energy"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Client</span>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(event) => setFormData({ ...formData, client: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Description</span>
                  <textarea
                    required
                    rows={5}
                    value={formData.description}
                    onChange={(event) => setFormData({ ...formData, description: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Project status</span>
                  <select
                    value={formData.lifecycleStatus}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        lifecycleStatus: event.target.value as ProjectLifecycleStatus,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Completion %</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    required
                    value={formData.completionPct}
                    onChange={(event) => setFormData({ ...formData, completionPct: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Website visibility</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as ProjectVisibility })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active (show on site)</option>
                    <option value="Inactive">Inactive (hide on site)</option>
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
                  disabled={pending}
                  className="rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700 disabled:opacity-60"
                >
                  {pending ? "Saving..." : modalMode === "add" ? "Add Project" : "Update Project"}
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
              <p className="mt-4 text-gray-600">Are you sure you want to delete this project? This action cannot be undone.</p>
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
