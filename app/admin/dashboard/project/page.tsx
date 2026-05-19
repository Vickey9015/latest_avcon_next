import ProjectManagement from "@/components/admin/ProjectManagement";
import { getAllProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectAdminPage() {
  const projects = await getAllProjects();

  return <ProjectManagement initialProjects={projects} />;
}
