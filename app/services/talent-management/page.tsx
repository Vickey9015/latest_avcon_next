import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";

export default function TalentManagementPage() {
  return <ServiceDetailTemplate {...servicePages.talent} />;
}
