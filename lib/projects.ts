import "server-only";

import type {
  Project,
  ProjectInput,
  ProjectLifecycleStatus,
  ProjectVisibility,
} from "@/lib/project-types";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type {
  Project,
  ProjectInput,
  ProjectLifecycleStatus,
  ProjectVisibility,
} from "@/lib/project-types";

interface ProjectRow {
  id: number;
  title: string;
  image: string;
  description: string;
  tag: string;
  client: string;
  sector: string;
  status: ProjectVisibility;
  lifecycle_status: ProjectLifecycleStatus;
  completion_pct: number;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const DEFAULT_PROJECTS: ProjectInput[] = [
  {
    title: "Sustainable Energy Facility",
    image: "/slider2.jpg",
    description:
      "Avconexpo proudly establishes a state-of-the-art sustainable industrial facility dedicated to producing clean energy and materials through advanced technology and eco-friendly practices. This project supports local infrastructure, economic growth, and a resilient industrial ecosystem.",
    tag: "Clean Energy",
    client: "",
    sector: "Energy",
    status: "Active",
    lifecycleStatus: "Active",
    completionPct: 85,
    order: 1,
  },
  {
    title: "Water Bottling Plant",
    image: "/sectors/utilities.jpg",
    description:
      "AVCONEXPO successfully installed a state-of-the-art water bottling line in Rwanda, delivering clean and efficiently packaged drinking water. The turnkey setup includes automated purification, filling, and packaging systems for hygiene, reliability, and cost efficiency.",
    tag: "Turnkey Plant",
    client: "Rwanda Client",
    sector: "Utilities",
    status: "Active",
    lifecycleStatus: "Completed",
    completionPct: 100,
    order: 2,
  },
  {
    title: "Milk processing plant",
    image: "/sectors/Agro_Processing.jpg",
    description:
      "A milk processing plant transforms fresh raw milk into safe, high-quality dairy products through intake, testing, clarification, pasteurization, homogenization, and hygienic packaging. The setup ensures product consistency while preserving nutritional quality.",
    tag: "Agro Processing",
    client: "",
    sector: "Agro Processing",
    status: "Active",
    lifecycleStatus: "Active",
    completionPct: 60,
    order: 3,
  },
];

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    title: row.title,
    image: row.image,
    description: row.description,
    tag: row.tag,
    client: row.client,
    sector: row.sector,
    status: row.status,
    lifecycleStatus: row.lifecycle_status,
    completionPct: row.completion_pct,
    order: row.sort_order,
  };
}

export async function ensureProjectsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      image VARCHAR(500) NOT NULL,
      description TEXT NOT NULL,
      tag VARCHAR(120) NOT NULL,
      client VARCHAR(255) NOT NULL DEFAULT '',
      sector VARCHAR(120) NOT NULL DEFAULT '',
      status ENUM('Active', 'Inactive') DEFAULT 'Active',
      lifecycle_status ENUM('Active', 'Completed') DEFAULT 'Active',
      completion_pct INT NOT NULL DEFAULT 0,
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_projects_status (status),
      INDEX idx_projects_sort_order (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function dedupeProjects() {
  await execute(`
    DELETE t1 FROM projects t1
    INNER JOIN projects t2
      ON t1.title = t2.title
      AND t1.sort_order = t2.sort_order
      AND t1.id > t2.id
  `);
}

async function seedDefaultProjects() {
  const existing = await query<{ count: number }>("SELECT COUNT(*) AS count FROM projects");
  if (parseCount(existing) > 0) {
    await dedupeProjects();
    return;
  }

  if (!(await acquireSeedLock("projects"))) {
    return;
  }

  const afterLock = await query<{ count: number }>("SELECT COUNT(*) AS count FROM projects");
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const project of DEFAULT_PROJECTS) {
    await execute(
      `INSERT INTO projects
        (title, image, description, tag, client, sector, status, lifecycle_status, completion_pct, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        project.title,
        project.image,
        project.description,
        project.tag,
        project.client,
        project.sector,
        project.status,
        project.lifecycleStatus,
        project.completionPct,
        project.order,
      ],
    );
  }
}

export async function getActiveProjects(): Promise<Project[]> {
  await ensureProjectsTable();
  await seedDefaultProjects();
  await dedupeProjects();

  const rows = await query<ProjectRow>(
    `SELECT id, title, image, description, tag, client, sector, status, lifecycle_status, completion_pct, sort_order, created_at, updated_at
     FROM projects
     WHERE status = 'Active'
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapProject);
}

export async function getAllProjects(): Promise<Project[]> {
  await ensureProjectsTable();
  await seedDefaultProjects();
  await dedupeProjects();

  const rows = await query<ProjectRow>(
    `SELECT id, title, image, description, tag, client, sector, status, lifecycle_status, completion_pct, sort_order, created_at, updated_at
     FROM projects
     ORDER BY sort_order ASC, id ASC`,
  );

  return rows.map(mapProject);
}

export async function getProjectCount(): Promise<number> {
  await ensureProjectsTable();
  await seedDefaultProjects();

  const result = await query<{ count: number }>("SELECT COUNT(*) AS count FROM projects");
  return result[0]?.count ?? 0;
}

export async function createProject(input: ProjectInput): Promise<number> {
  await ensureProjectsTable();

  const result = await execute(
    `INSERT INTO projects
      (title, image, description, tag, client, sector, status, lifecycle_status, completion_pct, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.image,
      input.description,
      input.tag,
      input.client,
      input.sector,
      input.status,
      input.lifecycleStatus,
      input.completionPct,
      input.order,
    ],
  );

  return result.insertId;
}

export async function updateProject(id: number, input: ProjectInput): Promise<boolean> {
  await ensureProjectsTable();

  const result = await execute(
    `UPDATE projects
     SET title = ?, image = ?, description = ?, tag = ?, client = ?, sector = ?,
         status = ?, lifecycle_status = ?, completion_pct = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.title,
      input.image,
      input.description,
      input.tag,
      input.client,
      input.sector,
      input.status,
      input.lifecycleStatus,
      input.completionPct,
      input.order,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteProject(id: number): Promise<boolean> {
  await ensureProjectsTable();

  const result = await execute("DELETE FROM projects WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export function normalizeProjectInput(body: Record<string, unknown>): ProjectInput | null {
  const title =
    (typeof body.title === "string" ? body.title.trim() : "") ||
    (typeof body.name === "string" ? body.name.trim() : "");
  const image = typeof body.image === "string" ? body.image.trim() : "";
  const description =
    (typeof body.description === "string" ? body.description.trim() : "") ||
    (typeof body.text === "string" ? body.text.trim() : "");
  const tag = typeof body.tag === "string" ? body.tag.trim() : "";
  const client = typeof body.client === "string" ? body.client.trim() : "";
  const sector = typeof body.sector === "string" ? body.sector.trim() : "";
  const status: ProjectVisibility = body.status === "Inactive" ? "Inactive" : "Active";
  const lifecycleStatus: ProjectLifecycleStatus =
    body.lifecycleStatus === "Completed" || body.lifecycle_status === "Completed"
      ? "Completed"
      : "Active";
  const completionPct = Math.min(
    100,
    Math.max(0, Math.floor(Number(body.completionPct ?? body.completion_pct ?? body.completion ?? 0))),
  );
  const order = Number(body.order ?? body.sort_order);

  if (!title || !image || !description || !tag || !Number.isFinite(order) || order < 1) {
    return null;
  }

  return {
    title,
    image,
    description,
    tag,
    client,
    sector,
    status,
    lifecycleStatus,
    completionPct,
    order: Math.floor(order),
  };
}
