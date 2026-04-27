import { execute, query } from "@/lib/db";

export interface CareerApplication {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  resume_url: string | null;
  resume_name: string | null;
  status: "New" | "Reviewed" | "Shortlisted" | "Rejected";
  created_at: Date;
}

export interface NewCareerApplication {
  fullName: string;
  email: string;
  phone: string;
  position: string;
  resumeUrl?: string | null;
  resumeName?: string | null;
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
      status ENUM('New', 'Reviewed', 'Shortlisted', 'Rejected') DEFAULT 'New',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_career_applications_status (status),
      INDEX idx_career_applications_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
}

export async function createCareerApplication(application: NewCareerApplication) {
  await ensureCareerApplicationsTable();

  return execute(
    `INSERT INTO career_applications
      (full_name, email, phone, position, resume_url, resume_name)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      application.fullName,
      application.email,
      application.phone,
      application.position,
      application.resumeUrl ?? null,
      application.resumeName ?? null,
    ],
  );
}

export async function getCareerApplications() {
  await ensureCareerApplicationsTable();

  return query<CareerApplication>(
    `SELECT id, full_name, email, phone, position, resume_url, resume_name, status, created_at
     FROM career_applications
     ORDER BY created_at DESC`,
  );
}
