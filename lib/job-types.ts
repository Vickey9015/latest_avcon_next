export type JobStatus = "Active" | "Inactive" | "Closed";

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  shortDescription: string;
  fullDescription: string;
  publishDate: string;
  status: JobStatus;
  order: number;
  applicationCount?: number;
}

export interface JobInput {
  title: string;
  department: string;
  location: string;
  jobType: string;
  experience: string;
  shortDescription: string;
  fullDescription: string;
  publishDate: string;
  status: JobStatus;
  order: number;
}

export function formatJobDate(value: string | Date): string {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "";
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
