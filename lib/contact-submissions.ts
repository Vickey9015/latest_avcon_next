import { execute, query } from "@/lib/db";

export interface ContactSubmission {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: "Unread" | "Replied";
  created_at: Date;
}

export interface NewContactSubmission {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
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
}

export async function createContactSubmission(submission: NewContactSubmission) {
  await ensureContactSubmissionsTable();

  return execute(
    `INSERT INTO contact_submissions (name, email, phone, service, message)
     VALUES (?, ?, ?, ?, ?)`,
    [
      submission.name,
      submission.email,
      submission.phone,
      submission.service,
      submission.message,
    ],
  );
}

export async function getContactSubmissions() {
  await ensureContactSubmissionsTable();

  return query<ContactSubmission>(
    `SELECT id, name, email, phone, service, message, status, created_at
     FROM contact_submissions
     ORDER BY created_at DESC`,
  );
}
