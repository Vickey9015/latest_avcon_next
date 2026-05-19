export type ContactSubmissionStatus = "Unread" | "Replied";

export interface ContactSubmissionRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: ContactSubmissionStatus;
  created_at: string;
}
