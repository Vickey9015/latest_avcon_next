import Image from "next/image";
import { HoverTiltCard3D } from "@/components/motion";
import SectionHeading from "./SectionHeading";

const services = [
  {
    title: "Business and Technical consultancy",
    image: "/service-details/business-technical-consultancy.jpg",
    body:
      "Concept to Consumer - We conceptualise, evaluate financial and technical viability, assess risks, prepare Detailed Business reports, assist in capital arrangement, manage supply chain, execute projects, train teams, and support market entry. Sratch to shelf - We architect, engineer, design, source, build, and deliver turnkey projects with technical, commercial, and strategic excellence.",
    href: `/services/business-technical-consulting`,
    icon: "M10.5 6V5a2.5 2.5 0 015 0v1M4 8.5h18m-16 0V19a2 2 0 002 2h10a2 2 0 002-2V8.5M9 13h6",
  },
  {
    title: "Project Management",
    image: "/service-details/projectmanagement.jpg",
    body:
      "We synchronise timelines, teams, and targets to ensure seamless project delivery with precision, quality, and accountability.",
    href: `/services/project-management`,
    icon: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  },
  {
    title: "Architecture & Designing",
    image: "/service-details/architecture.jpg",
    body:
      "Concept to Creation, we craft functional environments guided by cosmic energy and planetary alignment, enriching life, work, and harmony of mind, body and soul.",
    href: `/services/architecture-designing`,
    icon: "M12 3l8 4.5-8 4.5-8-4.5L12 3zm0 9v9m-7-5l7 5 7-5",
  },
  {
    title: "Industrial Revival & Growth",
    image: "/service-details/sick-industry.jpg",
    body:
      "We diagnose, restructure, modernise and revive industries, helping them achieve their full potential by ensuring financial health, technical efficiency, productivity and operability for sustainable growth.",
    href: `/services/industrial-revival`,
    icon: "M4 19V5m0 14h16M7 15l3-3 3 2 5-7",
  },
  {
    title: "Startup accelerator",
    image: "/service-details/startup.jpg",
    body:
      "Vision to Venture- we empower startups with strategy, structure, business-technical expertise, and market access for rapid, sustainable growth.",
    href: `/services/startup-accelerator`,
    icon: "M12 15l-3-3m3 3l3-3m-3 3V3m7 9a7 7 0 11-14 0",
  },
  {
    title: "Waste management",
    image: "/service-details/waste-management.jpg",
    body:
      "Waste to Wealth- We offer our state-of-the-art Energy Recovery Technology (ERT) to simplify processes, requiring no segregation while delivering efficiency and environmental sustainability.",
    href: `/services/waste-management`,
    icon: "M4 7h4l2-3m0 0l2 3h4M7 7l-3 5 3 5m10-10l3 5-3 5M8 17h8",
  },
  {
    title: "Agro Value Chain",
    image: "/service-details/horticulture.jpg",
    body:
      "We assist in developing advanced agricultural systems, sustainable horticultural ventures, and eco-tourism destinations that create wealth, preserve the environment, and empower communities.",
    href: `/services/agro-value-chain`,
    icon: "M5 19c8 0 14-6 14-14-8 0-14 6-14 14zm7-7c-3 1-5 3-6 6",
  },
  {
    title: "Talent Management Services",
    image: "/service-details/teammeeting.jpg",
    body:
      "We empower industries by building organisational framework, managing human resources, workforce training & development, aligning with the goals of organisation.",
    href: `/services/talent-management`,
    icon: "M12 12a4 4 0 100-8 4 4 0 000 8zm-7 9a7 7 0 0114 0M18 8h3m-1.5-1.5v3",
  },
  {
    title: "Supply-Chain Management",
    image: "/service-details/trading-sourcing.jpg",
    body:
      "We manage the entire supply chain, including trade financing, vendor management, and logistics, to ensure quality, compliance, time management, and cost-efficiency.",
    href: `/services/supply-chain`,
    icon: "M3 7h11v8H3V7zm11 3h4l3 3v2h-7v-5zM7 18a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4z",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f7f7f7] py-16 sm:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-[#ff8c00]/10 blur-3xl" aria-hidden />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Our Services" title="End-to-End industrial solutions" id="services-heading" />
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service, index) => (
            <HoverTiltCard3D key={service.title} className={index === 0 ? "md:col-span-2" : ""} maxTilt={5}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-orange-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-2xl">
                <div className={index === 0 ? "grid h-full lg:grid-cols-[0.9fr_1.1fr]" : ""}>
                  <div className={`relative overflow-hidden ${index === 0 ? "min-h-64 lg:min-h-full" : "aspect-[16/9]"}`}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes={index === 0 ? "(max-width: 1024px) 100vw, 45vw" : "(max-width: 1024px) 100vw, 50vw"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101827]/65 via-[#101827]/10 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-[#f0571f] shadow">
                      Service
                    </div>
                  </div>
                  <div className="relative flex flex-1 flex-col border-t-4 border-[#f0571f] bg-gradient-to-br from-white to-orange-50/45 p-5 sm:p-6 lg:border-l-4 lg:border-t-0">
                    <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#273339] text-white shadow-md transition group-hover:bg-[#f0571f]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={service.icon} />
                      </svg>
                    </div>
                    <h3 className="mb-3 pr-14 text-lg font-extrabold leading-tight text-[#1a1a1a] sm:text-xl">{service.title}</h3>
                    <p className="mb-5 flex-1 text-sm leading-6 text-[#444]">{service.body}</p>
                    <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-3">
                      <a href={service.href} className="text-sm font-bold text-[#1a1a1a] transition hover:text-[#f0571f]">
                        Read more
                      </a>
                      <a
                        href={service.href}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] text-white shadow-md transition hover:scale-105"
                        aria-label={`Read more about ${service.title}`}
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </HoverTiltCard3D>
          ))}
        </div>
      </div>
    </section>
  );
}
