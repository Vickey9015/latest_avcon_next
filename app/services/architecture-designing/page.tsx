import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.architecture;
  return seoForRoute({
    pathname: "/services/architecture-designing",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function ArchitectureDesigningPage() {
  return <ServiceDetailTemplate {...servicePages.architecture} />;
}
