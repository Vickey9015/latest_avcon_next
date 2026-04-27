import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function StartupAcceleratorPage() {
  return <ServiceDetailTemplate {...servicePages.startup} />;
}
