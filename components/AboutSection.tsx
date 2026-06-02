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
        <TiltOnScroll className="relative mx-auto min-h-[340px] w-full max-w-lg sm:min-h-[470px] lg:mx-0">
          <div className="absolute -left-2 -top-2 h-16 w-16 rounded-full border-[12px] border-[#ff8c00]/20 sm:-left-4 sm:-top-4 sm:h-24 sm:w-24 sm:border-[18px]" aria-hidden />
          <div className="relative h-[280px] w-full overflow-hidden rounded-[24px] border-[6px] border-white shadow-2xl sm:h-[440px] sm:w-[90%] sm:rounded-[32px] sm:border-[8px] lg:h-[520px]">
            <Image
              src="/slider2.jpg"
              alt="AVCONEXPO industrial factory — engineering and EPC solutions"
              fill
              className="object-cover transition duration-700 hover:scale-105"
              sizes="(max-width: 1024px) 82vw, 42vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
          <div className="absolute bottom-[-12px] right-0 h-48 w-[72%] overflow-hidden rounded-[20px] border-[6px] border-white shadow-2xl sm:bottom-[-20px] sm:h-64 sm:w-[65%] sm:rounded-[28px] sm:border-[10px] lg:h-80">
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
          <div className="absolute bottom-6 left-0 flex w-full max-w-[calc(100%-1rem)] flex-col gap-2 sm:bottom-10 sm:max-w-none">
            <a
              href="/overview"
              className="w-1/2 rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:shadow-xl"
            >
              Concept to Consumer
            </a>
            <a
              href="/overview"
              className="w-1/2 rounded-xl bg-gradient-to-r from-[#f0571f] to-[#faa419] px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:shadow-xl"
            >
              Scratch to Shelf Solutions
            </a>
          </div>
        </TiltOnScroll>

        <div className="flex flex-col overflow-hidden rounded-2xl border border-orange-200/50 bg-white text-center shadow-xl lg:min-h-[470px] lg:text-left">
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
            <div className="mb-4 flex flex-wrap justify-center gap-2 lg:justify-start">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-5 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-md"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="space-y-3 rounded-xl border border-orange-100 bg-orange-50/30 p-4 text-left text-sm leading-6 text-gray-700">
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
            <ul className="mt-4 grid gap-2 text-left text-gray-800 sm:grid-cols-2">
              {bullets.map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-lg border border-orange-100 bg-white px-3 py-2 shadow-sm">
                  <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#f0571f] text-white" aria-hidden>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col gap-3 border-t border-orange-200 bg-gray-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <p className="text-sm font-medium leading-5 text-gray-700">
              End-to-end solutions from <span className="font-bold text-[#f0571f]">Concept to Consumer</span> &amp;{" "}
              <span className="font-bold text-[#f0571f]">Scratch to Shelf</span>.
            </p>
            <a
              href="/overview"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:shadow-lg"
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
