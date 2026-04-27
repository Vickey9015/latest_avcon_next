import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function WasteManagementPage() {
  return <ServiceDetailTemplate {...servicePages.waste} />;
}
