import { execute, query } from "@/lib/db";

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company: string | null;
  country: string | null;
  machinery: string | null;
  expected_delivery: string | null;
  source: string | null;
  status: "Unread" | "Replied";
  created_at: Date;
}

export interface NewContactSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  company?: string | null;
  country?: string | null;
  machinery?: string | null;
  expected_delivery?: string | null;
  source?: string | null;
}

async function addContactColumn(sql: string) {
  try {
    await execute(sql);
  } catch (error) {
    const code = (error as { code?: string }).code;
    if (code !== "ER_DUP_FIELDNAME") {
      throw error;
    }
  }
}

export async function ensureContactSubmissionsTable() {
  await execute(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(60) NOT NULL,
      service VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      status ENUM('Unread', 'Replied') DEFAULT 'Unread',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_contact_submissions_status (status),
      INDEX idx_contact_submissions_created_at (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  await addContactColumn("ALTER TABLE contact_submissions ADD COLUMN company VARCHAR(255) NULL");
  await addContactColumn("ALTER TABLE contact_submissions ADD COLUMN country VARCHAR(120) NULL");
  await addContactColumn("ALTER TABLE contact_submissions ADD COLUMN machinery TEXT NULL");
  await addContactColumn("ALTER TABLE contact_submissions ADD COLUMN expected_delivery VARCHAR(255) NULL");
  await addContactColumn("ALTER TABLE contact_submissions ADD COLUMN source VARCHAR(80) NULL");
}

export async function createContactSubmission(submission: NewContactSubmission) {
  await ensureContactSubmissionsTable();

  return execute(
    `INSERT INTO contact_submissions
      (name, email, phone, service, message, company, country, machinery, expected_delivery, source)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      submission.name,
      submission.email,
      submission.phone,
      submission.service,
      submission.message,
      submission.company ?? null,
      submission.country ?? null,
      submission.machinery ?? null,
      submission.expected_delivery ?? null,
      submission.source ?? "contact",
    ],
  );
}

export async function getContactSubmissions() {
  await ensureContactSubmissionsTable();

  return query<ContactSubmission>(
    `SELECT id, name, email, phone, service, message, company, country, machinery,
            expected_delivery, source, status, created_at
     FROM contact_submissions
     ORDER BY created_at DESC`,
  );
}

export async function getContactCount() {
  await ensureContactSubmissionsTable();

  const rows = await query<{ count: number }>(
    `SELECT COUNT(*) AS count FROM contact_submissions`,
  );
  return rows[0]?.count ?? 0;
}

export async function updateContactSubmissionStatus(
  id: number,
  status: ContactSubmission["status"],
) {
  await ensureContactSubmissionsTable();

  const result = await execute(
    `UPDATE contact_submissions SET status = ? WHERE id = ?`,
    [status, id],
  );

  return result.affectedRows > 0;
}
