import { execute, query } from "@/lib/db";

export interface CareerApplication {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  resume_url: string | null;
  resume_name: string | null;
  resume_mime_type: string | null;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  created_at: Date;
}

export interface CareerResume {
  resume_name: string;
  resume_mime_type: string;
  resume_data: Buffer;
}

export interface NewCareerApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeUrl?: string | null;
  resumeName?: string | null;
  resumeMimeType?: string | null;
  resumeData?: Buffer | null;
}

async function addCareerColumn(sql: string) {
  try {
    await execute(sql);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }
}

export async function ensureCareerApplicationsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS career_applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      position VARCHAR(255) NOT NULL,
      resume_url VARCHAR(500) NULL,
      resume_name VARCHAR(255) NULL,
      resume_mime_type VARCHAR(120) NULL,
      resume_data LONGBLOB NULL,
      status ENUM('New', 'Reviewed', 'Shortlisted', 'Rejected') DEFAULT 'New',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_career_applications_status (status),
      INDEX idx_career_applications_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await addCareerColumn("ALTER TABLE career_applications ADD COLUMN resume_mime_type VARCHAR(120) NULL");
  await addCareerColumn("ALTER TABLE career_applications ADD COLUMN resume_data LONGBLOB NULL");
}

export async function createCareerApplication(application: NewCareerApplication) {
  await ensureCareerApplicationsTable();

  return execute(
    `INSERT INTO career_applications
      (full_name, email, phone, position, resume_url, resume_name, resume_mime_type, resume_data)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      application.fullName,
      application.email,
      application.phone,
      application.position,
      application.resumeUrl ?? null,
      application.resumeName ?? null,
      application.resumeMimeType ?? null,
      application.resumeData ?? null,
    ],
  );
}

export async function getCareerApplications() {
  await ensureCareerApplicationsTable();

  return query<CareerApplication>(
    `SELECT id, full_name, email, phone, position, resume_url, resume_name, resume_mime_type, status, created_at
     FROM career_applications
     ORDER BY created_at DESC`,
  );
}

export async function getCareerResume(id: number) {
  await ensureCareerApplicationsTable();

  const [resume] = await query<CareerResume>(
    `SELECT resume_name, resume_mime_type, resume_data
     FROM career_applications
     WHERE id = ? AND resume_data IS NOT NULL
     LIMIT 1`,
    [id],
  );

  return resume ?? null;
}
