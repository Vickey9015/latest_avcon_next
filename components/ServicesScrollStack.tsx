"use client";

import Image from "next/image";
import { HoverTiltCard3D } from "@/components/motion";

export type ServiceItem = {
  title: string;
  image: string;
  body: string;
  href: string;
};

function chunk<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

/** Gradient + accent per stack layer (Shiprocket-style coloured decks). */
const LAYER_SKINS = [
  {
    gradient:
      "from-[#e8f4fc] via-[#f0e8ff] to-[#fce8f3]",
    iconBg: "bg-[#3b82f6]/15",
    iconColor: "text-[#2563eb]",
    chipBg: "bg-white/70 text-[#1e40af]",
  },
  {
    gradient:
      "from-[#dff7f0] via-[#e8faf3] to-[#ecfdf5]",
    iconBg: "bg-[#059669]/15",
    iconColor: "text-[#047857]",
    chipBg: "bg-white/70 text-[#065f46]",
  },
  {
    gradient:
      "from-[#fff4e6] via-[#ffedd5] to-[#fef3c7]",
    iconBg: "bg-[#ea580c]/15",
    iconColor: "text-[#c2410c]",
    chipBg: "bg-white/70 text-[#9a3412]",
  },
] as const;

const LAYER_HEADLINES = [
  "Unified consulting & delivery",
  "Revival, ventures & sustainability",
  "Value chain, talent & supply",
] as const;

export default function ServicesScrollStack({ items }: { items: ServiceItem[] }) {
  const groups = chunk(items, 3);
  const total = groups.length;

  return (
    <div className="services-stack-root">
      {groups.map((group, gi) => {
        const skin = LAYER_SKINS[gi] ?? LAYER_SKINS[0];
        const isLast = gi === total - 1;
        /* Scroll runway + overlap spacing handled by CSS so next deck overrides the previous deck. */
        return (
          <div
            key={gi}
            className="services-stack-segment relative"
            style={{
              minHeight: isLast ? "min(108svh, 1200px)" : "min(142svh, 1600px)",
            }}
          >
            <div
              className={`services-stack-sticky sticky top-20 mx-auto flex w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] border border-white/60 bg-gradient-to-br px-4 pb-8 pt-7 shadow-[0_24px_60px_-12px_rgba(15,23,42,0.22)] sm:top-24 sm:rounded-[2rem] sm:px-7 sm:pb-10 sm:pt-9 md:px-9 lg:top-[5.5rem] ${skin.gradient}`}
              style={{ zIndex: 10 + gi * 10 }}
            >
              <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3 sm:gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14 ${skin.iconBg}`}
                  >
                    <svg
                      className={`h-5 w-5 sm:h-6 sm:w-6 ${skin.iconColor}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </span>
                  <div className="text-left">
                    <p
                      className={`mb-1 inline-flex rounded-full px-3 py-1 text-[0.65rem] font-bold uppercase tracking-widest sm:text-xs ${skin.chipBg}`}
                    >
                      <span className="tabular-nums">{gi + 1}</span>
                      <span className="mx-1 font-normal opacity-60">/</span>
                      <span className="tabular-nums">{total}</span>
                    </p>
                    <h3 className="text-xl font-bold leading-snug text-[#0f172a] sm:text-2xl lg:text-[1.65rem]">
                      {LAYER_HEADLINES[gi] ?? `Capabilities ${gi + 1}`}
                    </h3>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3" data-reveal-group="">
                {group.map((s) => (
                  <HoverTiltCard3D key={s.title} className="h-full min-w-0" maxTilt={6}>
                    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white/95 shadow-md ring-1 ring-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f37021]/35 hover:shadow-lg">
                      <div className="relative aspect-[16/9] w-full overflow-hidden">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4 sm:p-5">
                        <h4 className="mb-2 text-base font-bold leading-snug text-[#1a1a1a] sm:text-[1.05rem]">
                          {s.title}
                        </h4>
                        <p className="mb-4 flex-1 text-sm leading-6 text-[#4b5563] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4] overflow-hidden">
                          {s.body}
                        </p>
                        <a
                          href={s.href}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#f37021] transition-colors hover:text-[#d96516]"
                        >
                          Read more
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </a>
                      </div>
                    </article>
                  </HoverTiltCard3D>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
