import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.waste;
  return seoForRoute({
    pathname: "/services/waste-management",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function WasteManagementPage() {
  return <ServiceDetailTemplate {...servicePages.waste} />;
}
