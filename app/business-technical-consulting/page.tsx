import type { Metadata } from "next";
import BusinessTechnicalConsultingPhpPage from "@/components/BusinessTechnicalConsultingPhpPage";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const s = servicePages.businessTechnical;
  return seoForRoute({
    pathname: "/business-technical-consulting",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function BusinessTechnicalConsultingRootPage() {
  return <BusinessTechnicalConsultingPhpPage />;
}
