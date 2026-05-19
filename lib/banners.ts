import "server-only";

import type { Banner, BannerInput, BannerStatus } from "@/lib/banner-types";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type { Banner, BannerInput, BannerStatus } from "@/lib/banner-types";
export { bannerSubtitle, bannerTitle } from "@/lib/banner-types";

interface BannerRow {
  id: number;
  image: string;
  alt_text: string;
  headline_lines: string;
  status: BannerStatus;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const DEFAULT_BANNERS: BannerInput[] = [
  {
    image: "/assets/docs/img/real_one.jpeg",
    alt: "Industrial piping and plant — engineering and EPC",
    lines: ["EPC - Engineering", "Procurement &", "Construction"],
    status: "Active",
    order: 1,
  },
  {
    image: "/assets/docs/img/real_two.jpeg",
    alt: "Industrial facility at dusk — greenfield and brownfield development",
    lines: ["Greenfield And", "Brownfield", "Project", "Development"],
    status: "Active",
    order: 2,
  },
  {
    image: "/assets/docs/img/real_five.jpeg",
    alt: "Manufacturing and industrial solutions",
    lines: ["Project Feasibility &", "Market Research"],
    status: "Active",
    order: 3,
  },
  {
    image: "/slider4.jpg",
    alt: "Construction and consultancy project",
    lines: ["Global Business &", "Technical Consultancy"],
    status: "Active",
    order: 4,
  },
];

function parseLines(value: string): string[] {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.map((line) => String(line).trim()).filter(Boolean);
    }
  } catch {
    // fall through
  }
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

function serializeLines(lines: string[]): string {
  return JSON.stringify(lines.map((line) => line.trim()).filter(Boolean));
}

function mapBanner(row: BannerRow): Banner {
  return {
    id: row.id,
    image: row.image,
    alt: row.alt_text,
    lines: parseLines(row.headline_lines),
    status: row.status,
    order: row.sort_order,
  };
}

export async function ensureBannersTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS banners (
      id INT AUTO_INCREMENT PRIMARY KEY,
      image VARCHAR(500) NOT NULL,
      alt_text VARCHAR(500) NOT NULL,
      headline_lines TEXT NOT NULL,
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_banners_status (status),
      INDEX idx_banners_sort_order (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function dedupeBanners() {
  await execute(`
    DELETE t1 FROM banners t1
    INNER JOIN banners t2
      ON t1.sort_order = t2.sort_order
      AND t1.image = t2.image
      AND t1.alt_text = t2.alt_text
      AND t1.id > t2.id
  `);
}

async function seedDefaultBanners() {
  const existing = await query<{ count: number }>("SELECT COUNT(*) AS count FROM banners");
  if (parseCount(existing) > 0) {
    await dedupeBanners();
    return;
  }

  if (!(await acquireSeedLock("banners"))) {
    return;
  }

  const afterLock = await query<{ count: number }>("SELECT COUNT(*) AS count FROM banners");
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const banner of DEFAULT_BANNERS) {
    await execute(
      `INSERT INTO banners (image, alt_text, headline_lines, status, sort_order)
       VALUES (?, ?, ?, ?, ?)`,
      [banner.image, banner.alt, serializeLines(banner.lines), banner.status, banner.order],
    );
  }
}

export async function getActiveBanners(): Promise<Banner[]> {
  await ensureBannersTable();
  await seedDefaultBanners();
  await dedupeBanners();

  const rows = await query<BannerRow>(
    `SELECT id, image, alt_text, headline_lines, status, sort_order, created_at, updated_at
     FROM banners
     WHERE status = 'Active'
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapBanner);
}

export async function getAllBanners(): Promise<Banner[]> {
  await ensureBannersTable();
  await seedDefaultBanners();
  await dedupeBanners();

  const rows = await query<BannerRow>(
    `SELECT id, image, alt_text, headline_lines, status, sort_order, created_at, updated_at
     FROM banners
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapBanner);
}

export async function getBannerCount(): Promise<number> {
  await ensureBannersTable();
  await seedDefaultBanners();

  const result = await query<{ count: number }>("SELECT COUNT(*) AS count FROM banners");
  return result[0]?.count ?? 0;
}

export async function createBanner(input: BannerInput): Promise<number> {
  await ensureBannersTable();

  const result = await execute(
    `INSERT INTO banners (image, alt_text, headline_lines, status, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
    [input.image, input.alt, serializeLines(input.lines), input.status, input.order],
  );

  return result.insertId;
}

export async function updateBanner(id: number, input: BannerInput): Promise<boolean> {
  await ensureBannersTable();

  const result = await execute(
    `UPDATE banners
     SET image = ?, alt_text = ?, headline_lines = ?, status = ?, sort_order = ?
     WHERE id = ?`,
    [input.image, input.alt, serializeLines(input.lines), input.status, input.order, id],
  );

  return result.affectedRows > 0;
}

export async function deleteBanner(id: number): Promise<boolean> {
  await ensureBannersTable();

  const result = await execute("DELETE FROM banners WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export function normalizeBannerInput(body: Record<string, unknown>): BannerInput | null {
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const alt = typeof body.alt === "string" ? body.alt.trim() : "";
  const status = body.status === "Inactive" ? "Inactive" : "Active";
  const order = Number(body.order);

  let lines: string[] = [];
  if (Array.isArray(body.lines)) {
    lines = body.lines.map((line) => String(line).trim()).filter(Boolean);
  } else if (typeof body.lines === "string") {
    lines = parseLines(body.lines);
  } else if (typeof body.title === "string") {
    const title = body.title.trim();
    const subtitle = typeof body.subtitle === "string" ? body.subtitle.trim() : "";
    lines = [title, subtitle].filter(Boolean);
  }

  if (!image || !alt || lines.length === 0 || !Number.isFinite(order) || order < 1) {
    return null;
  }

  return { image, alt, lines, status, order: Math.floor(order) };
}
