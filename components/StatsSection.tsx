import Image from "next/image";
import { TiltOnScroll } from "@/components/motion";

export default function StatsSection() {
  const stats = [
    {
      value: "25+",
      label: "Countries",
      icon: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 0c2.4 2.5 3.7 5.8 3.7 10S14.4 19.5 12 22m0-20C9.6 4.5 8.3 7.8 8.3 12S9.6 19.5 12 22M2 12h20M4.9 6.5h14.2M4.9 17.5h14.2",
    },
    {
      value: "30+",
      label: "Years of industry experience",
      icon: "M11.48 3.5a.6.6 0 011.04 0l2.15 3.78 4.27.88a.6.6 0 01.32 1l-2.94 3.2.49 4.33a.6.6 0 01-.84.62L12 15.5l-3.97 1.81a.6.6 0 01-.84-.62l.49-4.33-2.94-3.2a.6.6 0 01.32-1l4.27-.88 2.15-3.78z",
    },
    {
      value: "Expertise",
      label: "In industrial solutions",
      icon: "M14 9V5a3 3 0 00-6 0v4M5 9h14l-1 11H6L5 9zm9 4h.01M10 13h.01",
    },
  ];

  return (
    <section className="relative overflow-hidden py-16 text-white" aria-label="Company highlights">
      <Image src="/slider2.jpg" alt="" fill className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-[#0d1323]/85" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-1 bg-[#ff8c00]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 rounded-[28px] bg-white/10 p-5 backdrop-blur-sm sm:grid-cols-3 sm:p-7">
          {stats.map((s) => (
            <TiltOnScroll key={s.label} intensity={0.5} className="rounded-2xl border border-white/15 p-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={s.icon} />
                </svg>
              </div>
              <p className="text-4xl font-extrabold text-white sm:text-5xl">{s.value}</p>
              <p className="mt-2 text-base font-semibold capitalize text-white/90 sm:text-lg">{s.label}</p>
            </TiltOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
