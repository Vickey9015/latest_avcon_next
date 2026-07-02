import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.industrial;
  return seoForRoute({
    pathname: "/services/industrial-revival",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function IndustrialRevivalPage() {
  return <ServiceDetailTemplate {...servicePages.industrial} pathname="/services/industrial-revival" />;
}
