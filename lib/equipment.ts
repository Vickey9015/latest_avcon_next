import "server-only";

import {
  DEFAULT_EQUIPMENT_PRODUCTS,
  isEquipmentCategoryId,
  slugifyEquipmentTitle,
  type EquipmentCategoryId,
  type EquipmentProduct,
  type EquipmentProductInput,
  type EquipmentProductStatus,
  type EquipmentSpec,
} from "@/lib/industrial-equipment";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type {
  EquipmentCategoryId,
  EquipmentProduct,
  EquipmentProductInput,
  EquipmentProductStatus,
  EquipmentSpec,
} from "@/lib/industrial-equipment";

interface EquipmentRow {
  id: number;
  slug: string;
  title: string;
  category_id: string;
  short_description: string;
  description: string;
  specs: string | EquipmentSpec[] | null;
  images: string | string[] | null;
  featured: number | boolean;
  status: EquipmentProductStatus;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const EQUIPMENT_SELECT = `
  id, slug, title, category_id, short_description, description, specs, images,
  featured, status, sort_order, created_at, updated_at
`;

function coerceJsonArray(value: unknown): unknown[] {
  if (Array.isArray(value)) return value;
  if (typeof value !== "string" || !value.trim()) return [];
  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function parseSpecs(value: unknown): EquipmentSpec[] {
  return coerceJsonArray(value)
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const row = item as Record<string, unknown>;
      const label = typeof row.label === "string" ? row.label.trim() : "";
      const specValue = typeof row.value === "string" ? row.value.trim() : "";
      if (!label || !specValue) return null;
      return { label, value: specValue };
    })
    .filter((item): item is EquipmentSpec => Boolean(item));
}

function parseImages(value: unknown): string[] {
  return coerceJsonArray(value)
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
}

function serializeSpecs(specs: EquipmentSpec[]): string {
  return JSON.stringify(specs);
}

function serializeImages(images: string[]): string {
  return JSON.stringify(images);
}

function mapEquipment(row: EquipmentRow): EquipmentProduct {
  const categoryId = isEquipmentCategoryId(row.category_id)
    ? row.category_id
    : "others";

  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    categoryId,
    shortDescription: row.short_description,
    description: row.description,
    specs: parseSpecs(row.specs),
    images: parseImages(row.images),
    featured: Boolean(row.featured),
    status: row.status === "Inactive" ? "Inactive" : "Active",
    order: row.sort_order,
  };
}

export async function ensureEquipmentTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS equipment_products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      slug VARCHAR(180) NOT NULL,
      title VARCHAR(255) NOT NULL,
      category_id VARCHAR(80) NOT NULL,
      short_description TEXT NOT NULL,
      description MEDIUMTEXT NOT NULL,
      specs JSON NOT NULL,
      images JSON NOT NULL,
      featured TINYINT(1) NOT NULL DEFAULT 0,
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_equipment_products_slug (slug),
      INDEX idx_equipment_status (status),
      INDEX idx_equipment_category (category_id),
      INDEX idx_equipment_sort_order (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function seedDefaultEquipment() {
  const existing = await query<{ count: number }>(
    "SELECT COUNT(*) AS count FROM equipment_products",
  );
  if (parseCount(existing) > 0) {
    return;
  }

  if (!(await acquireSeedLock("equipment_products_v1"))) {
    return;
  }

  const afterLock = await query<{ count: number }>(
    "SELECT COUNT(*) AS count FROM equipment_products",
  );
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const product of DEFAULT_EQUIPMENT_PRODUCTS) {
    await execute(
      `INSERT INTO equipment_products
        (slug, title, category_id, short_description, description, specs, images, featured, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        product.slug,
        product.title,
        product.categoryId,
        product.shortDescription,
        product.description,
        serializeSpecs(product.specs),
        serializeImages(product.images),
        product.featured ? 1 : 0,
        product.status,
        product.order,
      ],
    );
  }
}

async function readyEquipmentTable() {
  await ensureEquipmentTable();
  await seedDefaultEquipment();
}

export async function getAllEquipmentProducts(): Promise<EquipmentProduct[]> {
  await readyEquipmentTable();

  const rows = await query<EquipmentRow>(
    `SELECT ${EQUIPMENT_SELECT}
     FROM equipment_products
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapEquipment);
}

export async function getPublishedEquipmentProducts(): Promise<EquipmentProduct[]> {
  await readyEquipmentTable();

  const rows = await query<EquipmentRow>(
    `SELECT ${EQUIPMENT_SELECT}
     FROM equipment_products
     WHERE status = 'Active'
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapEquipment);
}

export async function getPublishedEquipmentProductBySlug(
  slug: string,
): Promise<EquipmentProduct | null> {
  await readyEquipmentTable();

  const rows = await query<EquipmentRow>(
    `SELECT ${EQUIPMENT_SELECT}
     FROM equipment_products
     WHERE slug = ? AND status = 'Active'
     LIMIT 1`,
    [slug],
  );

  return rows[0] ? mapEquipment(rows[0]) : null;
}

export async function getPublishedEquipmentByCategory(
  categoryId: EquipmentCategoryId | "all",
): Promise<EquipmentProduct[]> {
  if (categoryId === "all") {
    return getPublishedEquipmentProducts();
  }

  await readyEquipmentTable();

  const rows = await query<EquipmentRow>(
    `SELECT ${EQUIPMENT_SELECT}
     FROM equipment_products
     WHERE status = 'Active' AND category_id = ?
     ORDER BY sort_order ASC, id ASC`,
    [categoryId],
  );

  return rows.map(mapEquipment);
}

export async function createEquipmentProduct(input: EquipmentProductInput): Promise<number> {
  await ensureEquipmentTable();

  const result = await execute(
    `INSERT INTO equipment_products
      (slug, title, category_id, short_description, description, specs, images, featured, status, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.slug,
      input.title,
      input.categoryId,
      input.shortDescription,
      input.description,
      serializeSpecs(input.specs),
      serializeImages(input.images),
      input.featured ? 1 : 0,
      input.status,
      input.order,
    ],
  );

  return result.insertId;
}

export async function updateEquipmentProduct(
  id: number,
  input: EquipmentProductInput,
): Promise<boolean> {
  await ensureEquipmentTable();

  const result = await execute(
    `UPDATE equipment_products
     SET slug = ?, title = ?, category_id = ?, short_description = ?, description = ?,
         specs = ?, images = ?, featured = ?, status = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.slug,
      input.title,
      input.categoryId,
      input.shortDescription,
      input.description,
      serializeSpecs(input.specs),
      serializeImages(input.images),
      input.featured ? 1 : 0,
      input.status,
      input.order,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteEquipmentProduct(id: number): Promise<boolean> {
  await ensureEquipmentTable();

  const result = await execute("DELETE FROM equipment_products WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

function parseSpecsInput(value: unknown): EquipmentSpec[] | null {
  if (!Array.isArray(value)) return [];
  const specs: EquipmentSpec[] = [];
  for (const item of value) {
    if (!item || typeof item !== "object") return null;
    const row = item as Record<string, unknown>;
    const label = typeof row.label === "string" ? row.label.trim() : "";
    const specValue = typeof row.value === "string" ? row.value.trim() : "";
    if (!label && !specValue) continue;
    if (!label || !specValue) return null;
    specs.push({ label, value: specValue });
  }
  return specs;
}

function parseImagesInput(value: unknown): string[] | null {
  if (!Array.isArray(value)) return null;
  const images = value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
  return images.length > 0 ? images : null;
}

export function normalizeEquipmentInput(
  body: Record<string, unknown>,
): EquipmentProductInput | null {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const shortDescription =
    (typeof body.shortDescription === "string" ? body.shortDescription.trim() : "") ||
    (typeof body.short_description === "string" ? body.short_description.trim() : "");
  const description = typeof body.description === "string" ? body.description.trim() : "";
  const categoryRaw =
    (typeof body.categoryId === "string" ? body.categoryId.trim() : "") ||
    (typeof body.category_id === "string" ? body.category_id.trim() : "");
  const status: EquipmentProductStatus = body.status === "Inactive" ? "Inactive" : "Active";
  const featured = Boolean(body.featured);
  const order = Number(body.order ?? body.sort_order);

  let slug =
    (typeof body.slug === "string" ? body.slug.trim() : "") || slugifyEquipmentTitle(title);
  slug = slugifyEquipmentTitle(slug);

  if (!isEquipmentCategoryId(categoryRaw)) {
    return null;
  }

  const specs = parseSpecsInput(body.specs);
  const images = parseImagesInput(body.images);

  if (
    !title ||
    !slug ||
    !shortDescription ||
    !description ||
    !images ||
    specs === null ||
    !Number.isFinite(order) ||
    order < 1
  ) {
    return null;
  }

  return {
    title,
    slug,
    categoryId: categoryRaw,
    shortDescription,
    description,
    specs,
    images,
    featured,
    status,
    order: Math.floor(order),
  };
}
