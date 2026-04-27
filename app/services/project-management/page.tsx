import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function ProjectManagementPage() {
  return <ServiceDetailTemplate {...servicePages.projectManagement} />;
}
