"use client";

import { useMemo, useState } from "react";
import AdminPagination from "@/components/admin/AdminPagination";
import ImageUploadField from "@/components/admin/ImageUploadField";
import FaqEditor from "@/components/admin/FaqEditor";
import RichTextEditor from "@/components/admin/RichTextEditor";
import ScrollableCell from "@/components/admin/ScrollableCell";
import { useAdminPagination } from "@/hooks/useAdminPagination";
import type { Blog, BlogStatus } from "@/lib/blog-types";
import { blogHref, formatBlogDate } from "@/lib/blog-types";
import type { FaqItem } from "@/lib/faq-types";
import { parseFaqItems } from "@/lib/faq-types";

type BlogManagementProps = {
  initialBlogs: Blog[];
};

type FormState = {
  title: string;
  image: string;
  author: string;
  category: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string;
  linkUrl: string;
  status: BlogStatus;
  publishDate: string;
  order: string;
  faqs: FaqItem[];
};

const emptyForm = (order: number): FormState => ({
  title: "",
  image: "",
  author: "",
  category: "",
  slug: "",
  excerpt: "",
  content: "",
  tags: "",
  linkUrl: "#",
  status: "Draft",
  publishDate: new Date().toISOString().slice(0, 10),
  order: String(order),
  faqs: [],
});

function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function toFormState(blog: Blog): FormState {
  return {
    title: blog.title,
    image: blog.image,
    author: blog.author,
    category: blog.category,
    slug: blog.slug,
    excerpt: blog.excerpt,
    content: blog.content,
    tags: blog.tags,
    linkUrl: blog.linkUrl,
    status: blog.status,
    publishDate: blog.publishDate,
    order: String(blog.order),
    faqs: blog.faqs,
  };
}

export default function BlogManagement({ initialBlogs }: BlogManagementProps) {
  const [blogs, setBlogs] = useState(initialBlogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialBlogs.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return blogs.filter((blog) =>
      [
        blog.title,
        blog.author,
        blog.category,
        blog.status,
        blog.publishDate,
        blog.slug,
        blog.excerpt,
        blog.content,
        blog.tags,
        String(blog.order),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [blogs, searchTerm]);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    paginatedItems: paginatedBlogs,
    totalItems,
    totalPages,
    startIndex,
  } = useAdminPagination(filteredData, searchTerm);

  async function refreshBlogs() {
    const response = await fetch("/api/admin/blogs");
    if (!response.ok) {
      throw new Error("Unable to refresh blog list.");
    }
    const payload = await response.json();
    setBlogs(payload.blogs);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(blogs.length + 1));
    setError("");
    setShowModal(true);
  }

  function openEditModal(blog: Blog) {
    setModalMode("edit");
    setSelectedId(blog.id);
    setFormData(toFormState(blog));
    setError("");
    setShowModal(true);
  }

  function openDeleteModal(id: number) {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  }

  function handleTitleChange(title: string) {
    setFormData((current) => ({
      ...current,
      title,
      slug: modalMode === "add" && !current.slug ? slugify(title) : current.slug,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    if (!formData.image.trim()) {
      setError("Please upload a featured image.");
      setPending(false);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      image: formData.image.trim(),
      author: formData.author.trim(),
      category: formData.category.trim(),
      slug: formData.slug.trim() || slugify(formData.title),
      excerpt: formData.excerpt.trim(),
      content: formData.content.trim(),
      tags: formData.tags.trim(),
      linkUrl: formData.linkUrl.trim() || "#",
      status: formData.status,
      publishDate: formData.publishDate,
      order: Number(formData.order),
      faqs: parseFaqItems(formData.faqs),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/blogs" : `/api/admin/blogs/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save blog.");
      }

      await refreshBlogs();
      setShowModal(false);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save blog.");
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/blogs/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete blog.");
      }

      await refreshBlogs();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Unable to delete blog.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Blog Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage blog posts on the public Blogs page. Only Published posts appear on the site.
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
              Add Blog
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
        <table className="w-full min-w-[1280px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">S.No</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Featured Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Blog Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Tags</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Publish Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={11} className="px-6 py-8 text-center text-gray-500">
                  No blogs found
                </td>
              </tr>
            ) : (
              paginatedBlogs.map((blog, index) => (
                <tr key={blog.id} className="align-top hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {blog.image ? (
                      <img src={blog.image} alt="" className="h-12 w-20 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gray-200">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="max-w-[200px] px-6 py-4 text-sm font-semibold text-gray-900">
                    <ScrollableCell className="font-semibold text-gray-900">{blog.title}</ScrollableCell>
                  </td>
                  <td className="max-w-[240px] px-6 py-4 text-sm leading-6 text-gray-600">
                    <ScrollableCell>{blog.excerpt || "—"}</ScrollableCell>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{blog.author || "—"}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">{blog.category || "—"}</td>
                  <td className="max-w-[160px] px-6 py-4 text-sm text-gray-700">
                    <ScrollableCell>{blog.tags || "—"}</ScrollableCell>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {formatBlogDate(blog.publishDate)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{blog.order}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(blog)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(blog.id)}
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

      <AdminPagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />

      {showModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {modalMode === "add" ? "Add Blog" : "Edit Blog"}
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
                  <span className="mb-1 block text-sm font-medium text-gray-700">Blog title</span>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(event) => handleTitleChange(event.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <div className="sm:col-span-2">
                  <ImageUploadField
                    label="Featured image"
                    folder="blogs"
                    value={formData.image}
                    onChange={(image) => setFormData({ ...formData, image })}
                  />
                </div>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Author</span>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(event) => setFormData({ ...formData, author: event.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(event) => setFormData({ ...formData, category: event.target.value })}
                    placeholder="Industry News"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Short description (excerpt)</span>
                  <textarea
                    rows={3}
                    value={formData.excerpt}
                    onChange={(event) => setFormData({ ...formData, excerpt: event.target.value })}
                    placeholder="Brief summary shown on the blog detail page intro"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <div className="sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Full content</span>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData({ ...formData, content })}
                    placeholder="Write the full article. Use the toolbar for fonts, colors, headings, lists, and links."
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Use the formatting toolbar to change font style, color, alignment, headings, lists, and links.
                  </p>
                </div>
                <div className="sm:col-span-2">
                  <FaqEditor
                    value={formData.faqs}
                    onChange={(faqs) => setFormData({ ...formData, faqs })}
                  />
                </div>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Tags</span>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(event) => setFormData({ ...formData, tags: event.target.value })}
                    placeholder="Energy, Consulting, Industry (comma separated)"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Slug</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(event) => setFormData({ ...formData, slug: slugify(event.target.value) })}
                    placeholder="my-blog-post"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Link URL</span>
                  <input
                    type="text"
                    value={formData.linkUrl}
                    onChange={(event) => setFormData({ ...formData, linkUrl: event.target.value })}
                    placeholder="# or https://..."
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="mt-1 block text-xs text-gray-500">
                    Leave as # to open the full blog page at /blogs/[slug]. Preview:{" "}
                    {blogHref({ slug: formData.slug, linkUrl: formData.linkUrl })}
                  </span>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({ ...formData, status: event.target.value as BlogStatus })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                  </select>
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
                  {pending ? "Saving..." : modalMode === "add" ? "Add Blog" : "Update Blog"}
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
              <p className="mt-4 text-gray-600">Are you sure you want to delete this blog post? This action cannot be undone.</p>
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
