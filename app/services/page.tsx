import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ServicesConsultationForm from "@/components/ServicesConsultationForm";
import ServicesIndustriesSection from "@/components/ServicesIndustriesSection";
import TopBar from "@/components/TopBar";
import {
  servicesCatalog,
  servicesTrustPoints,
  servicesWorkProcess,
} from "@/lib/services-catalog";
import { seoForRoute } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return seoForRoute({
    pathname: "/services",
    title: "Industrial Engineering Services | AVCONEXPO",
    description:
      "Explore AVCONEXPO's end-to-end industrial services — business consultancy, project management, architecture, revival, startups, waste management, agro value chain, talent, and supply chain.",
    imageUrl: "/bg/heroBg3_3.jpg",
  });
}

const heroStats = [
  { label: "25+ Countries Served", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "30+ Years of Experience", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
  { label: "End-to-End Solutions", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
  { label: "On-Time Project Delivery", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
];

function HexIcon({ path }: { path: string }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-[#1e3a5f] text-white [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]">
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={path} />
      </svg>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <TopBar />
      <div className="relative">
        <section className="relative min-h-[88vh] overflow-hidden lg:min-h-[92vh]">
          <Image
            src="/bg/heroBg3_3.jpg"
            alt="Industrial facility at night"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f1f3d]/95 via-[#0f1f3d]/85 to-[#0f1f3d]/55" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-4 pb-14 pt-32 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-12 lg:px-8 lg:pb-16 lg:pt-36">
            <div>
              <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
                Your Global Partner in Engineering, EPC &amp; Industrial Solutions
              </h1>
              <p className="mt-4 text-lg font-bold text-[#faa419] sm:text-xl">Concept to Consumer. Scratch to Shelf.</p>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
                AVCONEXPO delivers end-to-end industrial solutions — from feasibility and engineering to execution,
                operations, and growth — helping businesses build, revive, and scale with confidence.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-5">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#faa419]">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={stat.icon} />
                      </svg>
                    </span>
                    <p className="text-sm font-semibold leading-5 text-white sm:text-base">{stat.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-8 inline-flex rounded-full bg-[#1e3a5f]/90 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/20">
                Serving Industries Across Africa, GCC &amp; India
              </p>
            </div>

            <ServicesConsultationForm />
          </div>
        </section>
      </div>

      <section className="border-b border-zinc-100 bg-white py-6 sm:py-8" aria-label="Why trust AVCONEXPO">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {servicesTrustPoints.map((point) => (
              <div key={point.title} className="flex flex-col items-center text-center">
                <span className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-[#f0571f] ring-1 ring-orange-100">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={point.icon} />
                  </svg>
                </span>
                <p className="text-sm font-bold leading-5 text-[#1e3a5f]">{point.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">Our Core Services</p>
            <h2 className="text-3xl font-extrabold text-[#1e3a5f] sm:text-4xl">
              End-to-End Industrial Solutions Under One Roof
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {servicesCatalog.map((service) => (
              <article
                key={service.href}
                className="group flex overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative w-[38%] min-w-[120px] shrink-0 sm:min-w-[140px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="140px"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <div className="mb-3 flex items-start gap-3">
                    <HexIcon path={service.icon} />
                    <h3 className="pt-1 text-base font-extrabold leading-snug text-[#1e3a5f] sm:text-lg">{service.title}</h3>
                  </div>
                  <p className="mb-4 flex-1 text-sm leading-6 text-[#555]">{service.shortDescription}</p>
                  <Link
                    href={service.href}
                    className="inline-flex w-fit items-center justify-center rounded-md bg-gradient-to-r from-[#f0571f] to-[#faa419] px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-white shadow transition hover:brightness-105"
                  >
                    Know More!
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#1e3a5f] py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <Image src="/world_map_white_on_black.png" alt="" fill className="object-cover object-center" sizes="100vw" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#faa419]">Our Work Process</p>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              A Proven Process for Successful Industrial Projects
            </h2>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {servicesWorkProcess.map((step, index) => (
              <div key={step.step} className="relative flex flex-col items-center text-center">
                {index < servicesWorkProcess.length - 1 ? (
                  <span
                    className="absolute left-[calc(50%+2.5rem)] top-8 hidden h-px w-[calc(100%-5rem)] border-t-2 border-dashed border-white/30 lg:block"
                    aria-hidden
                  />
                ) : null}
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#f0571f] text-sm font-extrabold text-white shadow-lg">
                  {step.step}
                </span>
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#1e3a5f] shadow-lg">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={step.icon} />
                  </svg>
                </span>
                <h3 className="text-base font-extrabold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-r from-[#f0571f] to-[#faa419] py-14 text-white sm:py-16">
        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold sm:text-4xl">Your Trusted Partner for Industrial Excellence</h2>
          <p className="mt-5 text-base leading-8 text-white/90 sm:text-lg">
            At AVCONEXPO, we combine engineering expertise, project management excellence, and global sourcing
            capabilities to deliver reliable industrial solutions that keep your business operating efficiently and
            growing sustainably.
          </p>
        </div>
      </section>

      <ServicesIndustriesSection />

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <div>
              <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">Contact Us</p>
              <h2 className="text-3xl font-extrabold text-[#1e3a5f] sm:text-4xl">
                Ready to Start Your Next Industrial Project?
              </h2>
              <p className="mt-5 text-base leading-7 text-[#555]">
                Tell us about your requirements and our team will get back to you with a tailored consultation. Whether
                you need consultancy, project execution, or supply chain support — we are here to help.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Free initial consultation for qualified projects",
                  "Dedicated experts across engineering and operations",
                  "Support across Africa, GCC, India, and beyond",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm font-medium text-[#444]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0571f] text-white">
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-100 bg-zinc-50">
                <div className="relative aspect-[16/10]">
                  <Image
                    src="/contact_img.jpg"
                    alt="AVCONEXPO industrial consulting team"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 via-zinc-900/15 to-transparent" aria-hidden />
                </div>
                <div className="p-5">
                  <p className="text-sm font-bold uppercase tracking-wide text-[#f0571f]">
                    Serving Clients Worldwide
                  </p>
                  <p className="mt-2 text-base font-extrabold text-[#1e3a5f]">Talk to our consultants today</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
