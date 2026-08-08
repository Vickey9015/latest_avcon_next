"use client";

import { useMemo, useState } from "react";
import AdminPagination from "@/components/admin/AdminPagination";
import ImageUploadField from "@/components/admin/ImageUploadField";
import { useAdminPagination } from "@/hooks/useAdminPagination";
import {
  equipmentCategories,
  getCategoryLabel,
  slugifyEquipmentTitle,
  type EquipmentCategoryId,
  type EquipmentProduct,
  type EquipmentProductStatus,
  type EquipmentSpec,
} from "@/lib/industrial-equipment";

type EquipmentManagementProps = {
  initialProducts: EquipmentProduct[];
};

type FormState = {
  title: string;
  slug: string;
  categoryId: EquipmentCategoryId;
  shortDescription: string;
  description: string;
  featured: boolean;
  status: EquipmentProductStatus;
  order: string;
  images: string[];
  specs: EquipmentSpec[];
};

const emptyForm = (order: number): FormState => ({
  title: "",
  slug: "",
  categoryId: "electrical-distribution",
  shortDescription: "",
  description: "",
  featured: false,
  status: "Active",
  order: String(order),
  images: [""],
  specs: [{ label: "", value: "" }],
});

function toFormState(product: EquipmentProduct): FormState {
  return {
    title: product.title,
    slug: product.slug,
    categoryId: product.categoryId,
    shortDescription: product.shortDescription,
    description: product.description,
    featured: product.featured,
    status: product.status,
    order: String(product.order),
    images: product.images.length > 0 ? product.images : [""],
    specs: product.specs.length > 0 ? product.specs : [{ label: "", value: "" }],
  };
}

export default function EquipmentManagement({ initialProducts }: EquipmentManagementProps) {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<FormState>(emptyForm(initialProducts.length + 1));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  const filteredData = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter((product) =>
      [
        product.title,
        product.slug,
        getCategoryLabel(product.categoryId),
        product.shortDescription,
        product.status,
        product.featured ? "featured" : "",
        String(product.order),
      ]
        .join(" ")
        .toLowerCase()
        .includes(term),
    );
  }, [products, searchTerm]);

  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    paginatedItems: paginatedProducts,
    totalItems,
    totalPages,
    startIndex,
  } = useAdminPagination(filteredData, searchTerm);

  async function refreshProducts() {
    const response = await fetch("/api/admin/equipment");
    if (!response.ok) {
      throw new Error("Unable to refresh equipment list.");
    }
    const payload = await response.json();
    setProducts(payload.products);
  }

  function openAddModal() {
    setModalMode("add");
    setSelectedId(null);
    setFormData(emptyForm(products.length + 1));
    setError("");
    setShowModal(true);
  }

  function openEditModal(product: EquipmentProduct) {
    setModalMode("edit");
    setSelectedId(product.id);
    setFormData(toFormState(product));
    setError("");
    setShowModal(true);
  }

  function openDeleteModal(id: number) {
    setSelectedId(id);
    setShowDeleteConfirm(true);
  }

  function updateImage(index: number, url: string) {
    setFormData((current) => {
      const images = [...current.images];
      images[index] = url;
      return { ...current, images };
    });
  }

  function addImageSlot() {
    setFormData((current) => ({
      ...current,
      images: [...current.images, ""],
    }));
  }

  function removeImageSlot(index: number) {
    setFormData((current) => {
      if (current.images.length <= 1) {
        return { ...current, images: [""] };
      }
      return { ...current, images: current.images.filter((_, i) => i !== index) };
    });
  }

  function updateSpec(index: number, field: keyof EquipmentSpec, value: string) {
    setFormData((current) => {
      const specs = current.specs.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec,
      );
      return { ...current, specs };
    });
  }

  function addSpecRow() {
    setFormData((current) => ({
      ...current,
      specs: [...current.specs, { label: "", value: "" }],
    }));
  }

  function removeSpecRow(index: number) {
    setFormData((current) => {
      if (current.specs.length <= 1) {
        return { ...current, specs: [{ label: "", value: "" }] };
      }
      return { ...current, specs: current.specs.filter((_, i) => i !== index) };
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPending(true);
    setError("");

    const images = formData.images.map((image) => image.trim()).filter(Boolean);
    if (images.length < 1) {
      setError("Please upload at least one product image.");
      setPending(false);
      return;
    }

    const title = formData.title.trim();
    const payload = {
      title,
      slug: formData.slug.trim() || slugifyEquipmentTitle(title),
      categoryId: formData.categoryId,
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim(),
      featured: formData.featured,
      status: formData.status,
      order: Number(formData.order),
      images,
      specs: formData.specs
        .map((spec) => ({ label: spec.label.trim(), value: spec.value.trim() }))
        .filter((spec) => spec.label || spec.value),
    };

    try {
      const response = await fetch(
        modalMode === "add" ? "/api/admin/equipment" : `/api/admin/equipment/${selectedId}`,
        {
          method: modalMode === "add" ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to save equipment product.");
      }

      await refreshProducts();
      setShowModal(false);
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to save equipment product.",
      );
    } finally {
      setPending(false);
    }
  }

  async function confirmDelete() {
    if (!selectedId) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch(`/api/admin/equipment/${selectedId}`, { method: "DELETE" });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to delete equipment product.");
      }

      await refreshProducts();
      setShowDeleteConfirm(false);
      setSelectedId(null);
    } catch (deleteError) {
      setError(
        deleteError instanceof Error ? deleteError.message : "Unable to delete equipment product.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Equipment Management</h2>
            <p className="mt-1 text-sm text-gray-500">
              Manage industrial equipment listings. Only Active products appear on the public catalog.
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
              Add Equipment
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
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Featured</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                  No equipment products found
                </td>
              </tr>
            ) : (
              paginatedProducts.map((product, index) => (
                <tr key={product.id} className="align-top hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{startIndex + index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {product.images[0] ? (
                      <img src={product.images[0]} alt="" className="h-12 w-20 rounded-lg object-cover" />
                    ) : (
                      <div className="flex h-12 w-20 items-center justify-center rounded-lg bg-gray-200">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <p className="font-semibold text-gray-900">{product.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">{product.slug}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{getCategoryLabel(product.categoryId)}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    {product.featured ? (
                      <span className="rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-800">
                        Featured
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{product.order}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openEditModal(product)}
                        className="rounded-lg p-2 text-blue-600 transition-colors hover:bg-blue-50"
                        title="Edit"
                      >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(product.id)}
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
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white">
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-800">
                  {modalMode === "add" ? "Add Equipment" : "Edit Equipment"}
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
                  <span className="mb-1 block text-sm font-medium text-gray-700">Title</span>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(event) => {
                      const title = event.target.value;
                      setFormData((current) => ({
                        ...current,
                        title,
                        slug:
                          modalMode === "add"
                            ? slugifyEquipmentTitle(title)
                            : current.slug,
                      }));
                    }}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Slug</span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        slug: slugifyEquipmentTitle(event.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Category</span>
                  <select
                    value={formData.categoryId}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        categoryId: event.target.value as EquipmentCategoryId,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    {equipmentCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Status</span>
                  <select
                    value={formData.status}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        status: event.target.value as EquipmentProductStatus,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Active">Active (show on site)</option>
                    <option value="Inactive">Inactive (hide on site)</option>
                  </select>
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-gray-700">Short description</span>
                  <textarea
                    required
                    rows={2}
                    value={formData.shortDescription}
                    onChange={(event) =>
                      setFormData({ ...formData, shortDescription: event.target.value })
                    }
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
                <label className="flex items-center gap-2 sm:col-span-1">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(event) =>
                      setFormData({ ...formData, featured: event.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Featured product</span>
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

                <div className="sm:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Images</p>
                    <button
                      type="button"
                      onClick={addImageSlot}
                      className="text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      + Add image
                    </button>
                  </div>
                  {formData.images.map((image, index) => (
                    <div key={`image-${index}`} className="rounded-lg border border-gray-200 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                          {index === 0 ? "Primary image" : `Additional image ${index}`}
                        </p>
                        {formData.images.length > 1 ? (
                          <button
                            type="button"
                            onClick={() => removeImageSlot(index)}
                            className="text-xs font-medium text-red-600 hover:text-red-700"
                          >
                            Remove
                          </button>
                        ) : null}
                      </div>
                      <ImageUploadField
                        label={index === 0 ? "Primary image file" : `Image ${index + 1} file`}
                        folder="equipment"
                        value={image}
                        onChange={(url) => updateImage(index, url)}
                        required={index === 0}
                      />
                    </div>
                  ))}
                </div>

                <div className="sm:col-span-2 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-700">Specs</p>
                    <button
                      type="button"
                      onClick={addSpecRow}
                      className="text-sm font-medium text-orange-600 hover:text-orange-700"
                    >
                      + Add spec
                    </button>
                  </div>
                  {formData.specs.map((spec, index) => (
                    <div key={`spec-${index}`} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                      <input
                        type="text"
                        placeholder="Label"
                        value={spec.label}
                        onChange={(event) => updateSpec(index, "label", event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder="Value"
                        value={spec.value}
                        onChange={(event) => updateSpec(index, "value", event.target.value)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:ring-2 focus:ring-orange-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(index)}
                        className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
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
                  {pending ? "Saving..." : modalMode === "add" ? "Add Equipment" : "Update Equipment"}
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
                Are you sure you want to delete this equipment product? This action cannot be undone.
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
