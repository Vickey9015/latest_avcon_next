import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import TopBar from "@/components/TopBar";

export const metadata: Metadata = {
  title: "Overview | AVCONEXPO",
  description:
    "AVCONEXPO overview: engineering-technology, architecture-design, supply-chain management, and EPC consultancy services.",
};

const points = [
  "Greenfield & Brownfield Projects",
  "Turnkey Project Execution",
  "EPC & Technical Consultancy",
  "Process Optimisation & Energy Audits",
  "Global Supply Chain Management",
];

const highlights = ["Engineering", "EPC", "Supply Chain", "Architecture"];

const principles = [
  {
    title: "VISION",
    text: "AVCONEXPO envisions a world where engineering and technology empower people and communities to thrive. We strive to be a global force for positive change, fostering sustainability, inclusivity, and compassion in industries and markets.",
    icon: "M2.25 12s3.75-6.75 9.75-6.75S21.75 12 21.75 12 18 18.75 12 18.75 2.25 12 2.25 12zm9.75 3.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z",
  },
  {
    title: "MISSION",
    text: "Our mission is to provide expert consultancy services in Engineering & Technology, Architecture, and supply-chain management solutions. We partner with clients across their value chain to create transformative outcomes that uplift businesses and enrich lives.",
    icon: "M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11zm0-7a4 4 0 100-8 4 4 0 000 8zm0-2l2-2",
  },
  {
    title: "VALUES",
    text: "The core of our solution revolves around caring. Caring is the essence of our commitment to excellence, integrity, and long-term partnerships.",
    icon: "M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z",
  },
  {
    title: "BELIEF",
    text: "Positive Energy: We strongly believe in the power of positive energy. This belief drives our journey and turns every effort into a step closer to success.",
    icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  },
];

export default function OverviewPage() {
  return (
    <>
      <TopBar />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80"
            alt="Overview hero backdrop"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" aria-hidden />
          <Navbar />
          <div className="relative z-10 mx-auto flex min-h-[62vh] w-full max-w-7xl flex-col justify-center px-4 pb-12 pt-36 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Overview</h1>
            <nav aria-label="Breadcrumb" className="mt-5 text-sm font-semibold text-white/85">
              <Link href="/" className="hover:text-white">
                Home
              </Link>{" "}
              / <span className="text-white">Overview</span>
            </nav>
          </div>
        </section>
      </div>

      <section className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-white py-16 sm:py-20">
        <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#ff8c00]/10 blur-3xl" aria-hidden />
        <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#030f80]/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
          <div className="relative mx-auto min-h-[470px] w-full max-w-lg lg:mx-0">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border-[18px] border-[#ff8c00]/20" aria-hidden />
            <div className="relative h-[400px] w-[82%] overflow-hidden rounded-[32px] border-[8px] border-white shadow-2xl sm:h-[470px]">
              <Image
                src="/slider2.jpg"
                alt="AVCONEXPO overview industrial visual"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 82vw, 42vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>
            <div className="absolute bottom-2 right-0 h-56 w-[58%] overflow-hidden rounded-[28px] border-[10px] border-white shadow-2xl sm:h-72">
              <Image
                src="/slider1.jpg"
                alt="AVCONEXPO power plant engineering services"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 58vw, 30vw"
              />
            </div>
            <div className="absolute left-5 top-8 z-10 w-32 rounded-2xl bg-gradient-to-br from-[#f0571f] to-[#faa419] px-3 py-5 text-center shadow-xl sm:w-40 sm:px-4 sm:py-6">
              <p className="text-3xl font-extrabold text-white sm:text-4xl">25+</p>
              <p className="text-xs font-bold uppercase leading-tight text-white/95 sm:text-sm">
                Years
                <br />
                Experience
              </p>
            </div>
            <div className="absolute bottom-10 left-0 hidden rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-orange-100 sm:block">
              <p className="text-sm font-bold text-[#1a1a1a]">Global Consultancy</p>
              <p className="mt-1 text-xs font-semibold text-[#ff8c00]">Concept to Consumer</p>
            </div>
          </div>

          <div className="flex overflow-hidden rounded-[32px] border border-orange-100 bg-orange-50/45 text-center shadow-2xl lg:min-h-[470px] lg:flex-col lg:text-left">
            <div className="bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-4 text-white sm:px-6">
              <p className="mb-2 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wide lg:justify-start">
                <span className="h-2 w-8 rounded-full bg-white/80" />
                About Our Company
              </p>
              <h2 className="text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                A Global Business and Technical Consultancy Firm
              </h2>
            </div>

            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="mb-3 flex flex-wrap justify-center gap-2 lg:justify-start">
                {highlights.map((item) => (
                  <span key={item} className="rounded-full border border-[#ff8c00]/20 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-[#f0571f] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-2 rounded-2xl border border-orange-100 bg-white p-3 text-justify text-[13px] leading-5 text-[#333] shadow-sm sm:text-sm">
                <p>
                  AVCONEXPO is a global Engineering-Technology, Supply-Chain Management, and
                  Architecture-Design Solution Company.
                </p>
                <p>
                  We engage with customers across their value chain, helping to design, build, operate,
                  and maintain the products and services that make them leaders and respected brands.
                </p>
                <p>
                  We provide Business and Technical solutions through a multidisciplinary pool of
                  Consultants, Technologists, Engineers, Architects, Energy Conservators, and System/Process Engineers.
                </p>
              </div>
              <ul className="mt-3 grid gap-2 text-left text-[#333] sm:grid-cols-2">
                {points.map((point) => (
                  <li key={point} className="flex min-w-0 items-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2 shadow-sm">
                    <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ff8c00] text-white" aria-hidden>
                      <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="min-w-0 text-xs font-semibold leading-4">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-orange-200/70 bg-white/80 px-5 py-4 sm:px-6">
              <p className="text-sm font-medium leading-5 text-[#333]">
                Track your industry&apos;s success with measurable outcomes at{" "}
                <span className="font-bold text-[#f0571f]">AVCONEXPO</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 via-white to-orange-50/40 py-16 sm:py-20">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#f0571f]/10 blur-3xl" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <p className="mb-2 text-sm font-extrabold uppercase tracking-wide text-[#f0571f]">
              Our Foundation
            </p>
            <h2 className="text-3xl font-extrabold leading-tight text-[#1a1a1a] sm:text-4xl">
              Vision, Mission, Values & Belief
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {principles.map((item, index) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-[28px] border border-orange-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center justify-between bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-5 text-white">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/30">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                      </svg>
                    </span>
                    <h3 className="text-xl font-extrabold tracking-wide text-white">{item.title}</h3>
                  </div>
                  <span className="text-4xl font-black text-white/20">{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="p-6">
                  <p className="text-sm leading-7 text-[#444] sm:text-base">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <FloatingActions />
    </>
  );
}
