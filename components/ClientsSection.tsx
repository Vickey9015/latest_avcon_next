"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const partners = [
  { name: "ABB", image: "/brands/abb.jpeg" },
  { name: "Al Jaber", image: "/brands/al_jaber.jpeg" },
  { name: "Alfa", image: "/brands/alfa.jpeg" },
  { name: "Atlas", image: "/brands/atlas.jpeg" },
  { name: "Forbes", image: "/brands/forbes.jpeg" },
  { name: "Milindia", image: "/brands/milindia.jpeg" },
  { name: "Parivartan", image: "/brands/parivartan.jpeg" },
  { name: "PCS", image: "/brands/pcs.jpeg" },
  { name: "State of Qatar", image: "/brands/stateofquater.jpeg" },
  { name: "Tetra", image: "/brands/tetra.jpeg" },
  { name: "Thermax", image: "/brands/thermax.jpeg" },
];

export default function ClientsSection() {
  const [page, setPage] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleCount(1);
      } else if (width < 1024) {
        setVisibleCount(2);
      } else if (width < 1280) {
        setVisibleCount(3);
      } else {
        setVisibleCount(4);
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const pageCount = Math.ceil(partners.length / visibleCount);
  const activePage = Math.min(page, pageCount - 1);

  useEffect(() => {
    if (isPaused || pageCount <= 1) return;
    const timer = window.setInterval(() => {
      setPage((currentPage) => (currentPage + 1) % pageCount);
    }, 3500);
    return () => window.clearInterval(timer);
  }, [isPaused, pageCount]);

  const visiblePartners = useMemo(() => {
    const start = activePage * visibleCount;
    return partners.slice(start, start + visibleCount);
  }, [activePage, visibleCount]);

  const prev = () => setPage((currentPage) => (currentPage - 1 + pageCount) % pageCount);
  const next = () => setPage((currentPage) => (currentPage + 1) % pageCount);

  return (
    <section
      id="clients"
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50/30 py-12 sm:py-16"
      aria-labelledby="clients-heading"
    >
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgb(0 0 0 / 0.15) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-[#f0571f]">Clients And Partners</p>
          <h2
            id="clients-heading"
            className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl"
          >
            Trusted by Industry Leaders Worldwide
          </h2>
        </div>

        <div className="mb-6 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />

        <div
          className="relative py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            key={`${activePage}-${visibleCount}`}
            className={`grid gap-5 transition-all duration-500 ${
              visibleCount === 1
                ? "grid-cols-1"
                : visibleCount === 2
                  ? "grid-cols-2"
                  : visibleCount === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"
            }`}
          >
            {visiblePartners.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex h-28 items-center justify-center overflow-hidden rounded-2xl border-b-4 border-t-4 border-orange-500 border-b-blue-500 bg-white/90 p-5 shadow-sm backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-105 hover:shadow-xl sm:h-32"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-orange-100/40 via-blue-50/40 to-orange-50/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <Image
                  src={partner.image}
                  alt={partner.name}
                  width={180}
                  height={90}
                  className="relative z-10 h-auto w-auto max-h-20 max-w-full object-contain transition-all duration-500 group-hover:scale-105"
                />
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-lg ring-1 ring-zinc-200 transition hover:bg-[#f0571f] hover:text-white"
              aria-label="Previous clients"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div className="flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, dot) => (
              <button
                key={dot}
                type="button"
                onClick={() => setPage(dot)}
                className={`h-2.5 rounded-full transition-all ${
                  dot === activePage ? "w-8 bg-[#f0571f]" : "w-2.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
                aria-label={`Go to clients page ${dot + 1}`}
                aria-current={dot === activePage}
              />
            ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#1a1a1a] shadow-lg ring-1 ring-zinc-200 transition hover:bg-[#f0571f] hover:text-white"
              aria-label="Next clients"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 h-0.5 w-full bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60" />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-1/2 h-32 w-96 -translate-x-1/2 rounded-full bg-orange-400/10 blur-3xl" />
    </section>
  );
}
