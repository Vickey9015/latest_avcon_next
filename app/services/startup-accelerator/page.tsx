import ServiceDetailTemplate from "@/components/ServiceDetailTemplate";
import { servicePages } from "@/lib/service-pages";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata() {
  const s = servicePages.startup;
  return seoForRoute({
    pathname: "/services/startup-accelerator",
    title: `${s.title} | AVCONEXPO`,
    description: `${s.subtitle}${s.highlight ? ` ${s.highlight}` : ""}`,
    imageUrl: s.image,
  });
}

export default function StartupAcceleratorPage() {
  return <ServiceDetailTemplate {...servicePages.startup} pathname="/services/startup-accelerator" />;
}
