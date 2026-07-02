import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.talent;
  return seoForRoute({
    pathname: "/services/talent-management",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function TalentManagementPage() {
  return <ServiceDetailTemplate {...servicePages.talent} pathname="/services/talent-management" />;
}
