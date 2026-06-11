export type ContactSubmissionStatus = "Unread" | "Replied";

export interface ContactSubmissionRow {
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
  status: ContactSubmissionStatus;
  created_at: string;
}
