import "server-only";

import type { Job, JobInput, JobStatus } from "@/lib/job-types";
import { execute, query } from "@/lib/db";
import { acquireSeedLock, parseCount } from "@/lib/seed-lock";

export type { Job, JobInput, JobStatus } from "@/lib/job-types";
export { formatJobDate } from "@/lib/job-types";

interface JobRow {
  id: number;
  title: string;
  department: string;
  location: string;
  job_type: string;
  experience: string;
  short_description: string;
  full_description: string;
  publish_date: Date | string;
  status: JobStatus;
  sort_order: number;
  created_at: Date;
  updated_at: Date;
}

const DEFAULT_JOBS: JobInput[] = [
  {
    title: "Business Development Executive",
    department: "Business Development",
    location: "Lucknow, India",
    jobType: "Full-time",
    experience: "2-4 years",
    shortDescription:
      "Avconexpo is seeking a proactive Business Development Manager to drive growth through CRM management, LinkedIn lead generation, email outreach, and digital business development.",
    fullDescription:
      "Based at our Lucknow office, the role involves coordinating with technical teams, managing leads and follow-ups, supporting online marketing initiatives, and assisting with proposals and presentations. The ideal candidate has strong communication skills, a structured working approach, and a basic understanding of technical or engineering services.",
    publishDate: "2025-12-24",
    status: "Active",
    order: 1,
  },
];

function toDateString(value: Date | string): string {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  return String(value).slice(0, 10);
}

function mapJob(row: JobRow): Job {
  return {
    id: row.id,
    title: row.title,
    department: row.department,
    location: row.location,
    jobType: row.job_type,
    experience: row.experience,
    shortDescription: row.short_description,
    fullDescription: row.full_description,
    publishDate: toDateString(row.publish_date),
    status: row.status,
    order: row.sort_order,
  };
}

async function attachApplicationCounts(jobs: Job[]): Promise<Job[]> {
  if (jobs.length === 0) {
    return jobs;
  }

  const counts = await query<{ position: string; count: number }>(
    `SELECT position, COUNT(*) AS count
     FROM career_applications
     GROUP BY position`,
  );

  const countMap = new Map(counts.map((row) => [row.position, Number(row.count)]));

  return jobs.map((job) => ({
    ...job,
    applicationCount: countMap.get(job.title) ?? 0,
  }));
}

export async function ensureJobsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS career_jobs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      department VARCHAR(120) NOT NULL DEFAULT '',
      location VARCHAR(255) NOT NULL DEFAULT '',
      job_type VARCHAR(80) NOT NULL DEFAULT 'Full-time',
      experience VARCHAR(120) NOT NULL DEFAULT '',
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      publish_date DATE NOT NULL,
      status ENUM('Active', 'Inactive', 'Closed') DEFAULT 'Active',
      sort_order INT NOT NULL DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_career_jobs_status (status),
      INDEX idx_career_jobs_sort_order (sort_order),
      INDEX idx_career_jobs_publish_date (publish_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

async function dedupeJobs() {
  await execute(`
    DELETE t1 FROM career_jobs t1
    INNER JOIN career_jobs t2
      ON t1.title = t2.title
      AND t1.sort_order = t2.sort_order
      AND t1.id > t2.id
  `);
}

async function seedDefaultJobs() {
  const existing = await query<{ count: number }>("SELECT COUNT(*) AS count FROM career_jobs");
  if (parseCount(existing) > 0) {
    await dedupeJobs();
    return;
  }

  if (!(await acquireSeedLock("career_jobs"))) {
    return;
  }

  const afterLock = await query<{ count: number }>("SELECT COUNT(*) AS count FROM career_jobs");
  if (parseCount(afterLock) > 0) {
    return;
  }

  for (const job of DEFAULT_JOBS) {
    await execute(
      `INSERT INTO career_jobs
        (title, department, location, job_type, experience, short_description, full_description, publish_date, status, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        job.title,
        job.department,
        job.location,
        job.jobType,
        job.experience,
        job.shortDescription,
        job.fullDescription,
        job.publishDate,
        job.status,
        job.order,
      ],
    );
  }
}

export async function getActiveJobs(): Promise<Job[]> {
  await ensureJobsTable();
  await seedDefaultJobs();
  await dedupeJobs();

  const rows = await query<JobRow>(
    `SELECT id, title, department, location, job_type, experience, short_description, full_description, publish_date, status, sort_order, created_at, updated_at
     FROM career_jobs
     WHERE status = 'Active'
     ORDER BY sort_order ASC, publish_date DESC, id ASC`,
  );

  return rows.map(mapJob);
}

export async function getAllJobs(): Promise<Job[]> {
  await ensureJobsTable();
  await seedDefaultJobs();
  await dedupeJobs();

  const rows = await query<JobRow>(
    `SELECT id, title, department, location, job_type, experience, short_description, full_description, publish_date, status, sort_order, created_at, updated_at
     FROM career_jobs
     ORDER BY sort_order ASC, publish_date DESC, id ASC`,
  );

  return attachApplicationCounts(rows.map(mapJob));
}

export async function getJobCount(): Promise<number> {
  await ensureJobsTable();
  await seedDefaultJobs();

  const result = await query<{ count: number }>("SELECT COUNT(*) AS count FROM career_jobs");
  return result[0]?.count ?? 0;
}

export async function createJob(input: JobInput): Promise<number> {
  await ensureJobsTable();

  const result = await execute(
    `INSERT INTO career_jobs
      (title, department, location, job_type, experience, short_description, full_description, publish_date, status, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      input.title,
      input.department,
      input.location,
      input.jobType,
      input.experience,
      input.shortDescription,
      input.fullDescription,
      input.publishDate,
      input.status,
      input.order,
    ],
  );

  return result.insertId;
}

export async function updateJob(id: number, input: JobInput): Promise<boolean> {
  await ensureJobsTable();

  const result = await execute(
    `UPDATE career_jobs
     SET title = ?, department = ?, location = ?, job_type = ?, experience = ?,
         short_description = ?, full_description = ?, publish_date = ?, status = ?, sort_order = ?
     WHERE id = ?`,
    [
      input.title,
      input.department,
      input.location,
      input.jobType,
      input.experience,
      input.shortDescription,
      input.fullDescription,
      input.publishDate,
      input.status,
      input.order,
      id,
    ],
  );

  return result.affectedRows > 0;
}

export async function deleteJob(id: number): Promise<boolean> {
  await ensureJobsTable();

  const result = await execute("DELETE FROM career_jobs WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

export function normalizeJobInput(body: Record<string, unknown>): JobInput | null {
  const title = typeof body.title === "string" ? body.title.trim() : "";
  const department = typeof body.department === "string" ? body.department.trim() : "";
  const location = typeof body.location === "string" ? body.location.trim() : "";
  const jobType =
    (typeof body.jobType === "string" ? body.jobType.trim() : "") ||
    (typeof body.type === "string" ? body.type.trim() : "") ||
    "Full-time";
  const experience = typeof body.experience === "string" ? body.experience.trim() : "";
  const shortDescription =
    (typeof body.shortDescription === "string" ? body.shortDescription.trim() : "") ||
    (typeof body.short === "string" ? body.short.trim() : "");
  const fullDescription =
    (typeof body.fullDescription === "string" ? body.fullDescription.trim() : "") ||
    (typeof body.full === "string" ? body.full.trim() : "");
  const publishDate =
    (typeof body.publishDate === "string" ? body.publishDate.trim() : "") ||
    (typeof body.publish_date === "string" ? body.publish_date.trim() : "") ||
    new Date().toISOString().slice(0, 10);

  let status: JobStatus = "Active";
  if (body.status === "Inactive" || body.status === "Closed") {
    status = body.status;
  }

  const order = Number(body.order ?? body.sort_order);

  if (
    !title ||
    !shortDescription ||
    !fullDescription ||
    !Number.isFinite(order) ||
    order < 1
  ) {
    return null;
  }

  return {
    title,
    department,
    location,
    jobType,
    experience,
    shortDescription,
    fullDescription,
    publishDate,
    status,
    order: Math.floor(order),
  };
}
