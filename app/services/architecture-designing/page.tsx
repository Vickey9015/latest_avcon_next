import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function ArchitectureDesigningPage() {
  return <ServiceDetailTemplate {...servicePages.architecture} />;
}
