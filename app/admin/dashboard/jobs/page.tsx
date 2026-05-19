import JobManagement from "@/components/admin/JobManagement";
import { getAllJobs } from "@/lib/jobs";

export const dynamic = "force-dynamic";

export default async function JobsAdminPage() {
  const jobs = await getAllJobs();

  return <JobManagement initialJobs={jobs} />;
}
