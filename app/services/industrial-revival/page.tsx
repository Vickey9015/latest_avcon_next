import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function IndustrialRevivalPage() {
  return <ServiceDetailTemplate {...servicePages.industrial} />;
}
