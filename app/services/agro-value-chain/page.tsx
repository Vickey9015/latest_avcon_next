import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.agro;
  return seoForRoute({
    pathname: "/services/agro-value-chain",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function AgroValueChainPage() {
  return <ServiceDetailTemplate {...servicePages.agro} pathname="/services/agro-value-chain" />;
}
