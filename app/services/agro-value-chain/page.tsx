import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function AgroValueChainPage() {
  return <ServiceDetailTemplate {...servicePages.agro} />;
}
