import Image from "next/image";
import { TiltOnScroll } from "@/components/motion";

const bullets = [
  "Greenfield & Brownfield Projects.",
  "Turnkey Project Execution.",
  "EPC & Technical Consultancy.",
  "Process Optimization & Energy Audits.",
  "Global Supply Chain Management.",
];

const highlights = ["Engineering", "EPC", "Supply Chain", "Architecture"];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-white via-orange-50/30 to-white py-16 sm:py-20 lg:py-24"
      aria-labelledby="about-heading"
    >
      <div className="absolute -left-20 top-16 h-64 w-64 rounded-full bg-[#ff8c00]/10 blur-3xl" aria-hidden />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-[#030f80]/10 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8">
        <TiltOnScroll className="relative mx-auto min-h-[470px] w-full max-w-lg lg:mx-0">
          <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full border-[18px] border-[#ff8c00]/20" aria-hidden />
          <div className="relative h-[400px] w-[82%] overflow-hidden rounded-[32px] border-[8px] border-white shadow-2xl sm:h-[470px]">
            <Image
              src="/slider2.jpg"
              alt="AVCONEXPO industrial factory — engineering and EPC solutions"
              fill
              className="object-cover transition duration-700 hover:scale-105"
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
            <p className="text-sm font-bold text-[#1a1a1a]">Concept to Consumer</p>
            <p className="mt-1 text-xs font-semibold text-[#ff8c00]">Scratch to Shelf Solutions</p>
          </div>
        </TiltOnScroll>

        <div className="flex overflow-hidden rounded-[32px] border border-orange-100 bg-orange-50/45 text-center shadow-2xl lg:min-h-[470px] lg:flex-col lg:text-left">
          <div className="bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-4 text-white sm:px-6">
            <p className="mb-2 flex items-center justify-center gap-2 text-xs font-extrabold uppercase tracking-wide lg:justify-start">
              <span className="h-2 w-8 rounded-full bg-white/80" />
              About Us
            </p>
            <h2
              id="about-heading"
              className="text-2xl font-extrabold leading-tight text-white sm:text-3xl"
            >
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
                AVCONEXPO is an Engineering-Technology, Supply-Chain Management, Architecture-Design,
                and industrial solution company, delivering comprehensive services across industries.
              </p>
              <p>
                We take pride in offering Business and Technical solutions through a professional team
                of Consultants, Technologists, Engineers, Architects, Energy Conservators,
                System/Process Engineers, and other Professionals.
              </p>
            </div>
            <ul className="mt-3 grid gap-2 text-left text-[#333] sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item} className="flex min-w-0 items-center gap-2 rounded-xl border border-orange-100 bg-white px-3 py-2 shadow-sm">
                  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#ff8c00] text-white" aria-hidden>
                    <svg className="h-2.5 w-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="min-w-0 text-xs font-semibold leading-4">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 border-t border-orange-200/70 bg-white/80 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm font-medium leading-5 text-[#333]">
              End-to-end solutions from <span className="font-bold text-[#f0571f]">Concept to Consumer</span> &amp;{" "}
              <span className="font-bold text-[#f0571f]">Scratch to Shelf</span>.
            </p>
            <a
              href="/overview"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#ff8c00] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#e67e00]"
            >
              Read more
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
