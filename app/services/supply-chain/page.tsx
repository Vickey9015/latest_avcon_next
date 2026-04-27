import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function SupplyChainPage() {
  return <ServiceDetailTemplate {...servicePages.supplyChain} />;
}
