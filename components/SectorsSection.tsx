"use client";

import Image from "next/image";
import { HoverTiltCard3D } from "@/components/motion";
import { useEffect, useMemo, useState } from "react";

const sectors = [
  {
    title: "Agro Processing",
    image: "/sectors/Agro_Processing.jpg",
    body:
      "We provide consulting across the agricultural value chain: grain milling, oilseed crushing, fruits, vegetables, pulses, and spices. Our expertise covers post-harvest handling, cold storage, drying, and packaging systems that preserve quality and reduce waste.",
  },
  {
    title: "FMCG",
    image: "/sectors/segment-fmcg.jpg",
    body:
      "We consult for a broad range of FMCG manufacturing units, from food and beverages to personal care and home products. Our team assists in turnkey project execution, scaling production, improving packaging lines, and introducing automation to meet market demand and maintain quality at high volumes.",
  },
  {
    title: "Packaging Industry",
    image: "/sectors/packaging-industry.jpg",
    body:
      "From plastic moulding to box making and print finishing, our consulting spans machine selection, production flow optimisation, and automation.",
  },
  {
    title: "Paper Industry",
    image: "/sectors/paper-and-pulp-industry.jpg",
    body:
      "From pulp preparation to paper finishing, our expertise includes recycled paper plants, kraft process design, deinking lines, and effluent treatment.",
  },
  {
    title: "Sugar & Distillery",
    image: "/sectors/sugar-sector.jpg",
    body:
      "We support sugar and distillery plants with complete turnkey solutions from process design to commissioning. Our expertise spans raw sugar production, refined sugar plants, ethanol and biofuel distilleries, and cogeneration systems.",
  },
  {
    title: "Cement Industry",
    image: "/sectors/cement-industry.jpg",
    body:
      "We provide engineering and project consulting for cement plants — greenfield and brownfield. From raw material handling to clinker production and grinding systems, our services help you build plants that are robust, scalable, and energy-efficient.",
  },
  {
    title: "Utilities & Infrastructure",
    image: "/sectors/utilities.jpg",
    body:
      "We assist industrial clients with designing and implementing of utility infrastructure that supports sustainable, uninterrupted operations, including boilers, chillers, air compressors, HVAC, steam systems, and electrical distribution.",
  },
  {
    title: "Water & Wastewater Treatment",
    image: "/sectors/waste-and-wastewater.webp",
    body:
      "From ETPs and STPs to Zero Liquid Discharge (ZLD) systems and water recycling plants, we ensure compliance, water conservation, and operational efficiency for your facility.",
  },
  {
    title: "Power Plant",
    image: "/sectors/power-plant.jpg",
    body:
      "We specialize in biomass, waste-to-energy, and cogeneration solutions that improve energy self-reliance and reduce carbon footprint.",
  },
];

export default function SectorsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => setVisibleCount(window.innerWidth < 1024 ? 1 : 3);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    const t = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % sectors.length);
    }, 3500);
    return () => window.clearInterval(t);
  }, []);

  const visibleSectors = useMemo(
    () => Array.from({ length: visibleCount }, (_, i) => sectors[(index + i) % sectors.length]),
    [index, visibleCount]
  );

  return (
    <section id="sectors" className="bg-white py-16 sm:py-20 lg:py-24" aria-labelledby="sectors-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[32px] border border-orange-100 bg-orange-50/45 shadow-2xl">
          <div className="bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-8 text-center sm:px-10">
            <div className="mx-auto max-w-3xl">
              <p className="mb-2 inline-flex items-center justify-center gap-2 text-sm font-extrabold uppercase tracking-wide text-white">
                <span className="h-2 w-8 rounded-full bg-white/80" />
                Our Sectors
                <span className="h-2 w-8 rounded-full bg-white/80" />
              </p>
              <h2 id="sectors-heading" className="text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                Sectors We Specialize In
              </h2>
            </div>
          </div>

        <div className="relative px-5 pb-6 pt-8 sm:px-8 sm:pb-8 lg:px-10">
          <div className={`grid gap-6 ${visibleCount === 1 ? "grid-cols-1" : "grid-cols-3"}`}>
          {visibleSectors.map((item, idx) => (
            <HoverTiltCard3D
              key={`${item.title}-${idx}-${index}`}
              className="h-full min-h-0 min-w-0"
              maxTilt={7}
              hoverScale={1.015}
            >
            <article
              style={{ animationDelay: `${idx * 80}ms` }}
              className={`group h-full overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-[#f0571f]/60 hover:shadow-xl ${
                direction === 1 ? "sector-enter-right" : "sector-enter-left"
              }`}
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent opacity-80" />
                <span className="absolute bottom-4 left-4 rounded-full bg-[#f0571f] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-lg">
                  Sector
                </span>
              </div>
              <div className="flex min-h-[13rem] flex-col border-t-4 border-[#f0571f] p-5">
                <h3 className="mb-3 min-h-[3rem] text-xl font-extrabold leading-snug text-[#1a1a1a] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-[#444] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:5] overflow-hidden">
                  {item.body}
                </p>
              </div>
            </article>
            </HoverTiltCard3D>
          ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 border-t border-orange-200/70 bg-white/70 px-5 py-5">
          <button
            type="button"
            aria-label="Previous sectors"
            onClick={() => {
              setDirection(-1);
              setIndex((i) => (i - 1 + sectors.length) % sectors.length);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f37021] text-white shadow-lg transition-colors hover:bg-[#d96516]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex items-center justify-center gap-2">
          {sectors.map((_, dot) => (
            <button
              key={dot}
              type="button"
              aria-label={`Go to sector ${dot + 1}`}
              onClick={() => {
                setDirection(dot >= index ? 1 : -1);
                setIndex(dot);
              }}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                dot === index ? "bg-[#1f2a44]" : "bg-zinc-400 hover:bg-zinc-500"
              }`}
            />
          ))}
          </div>
          <button
            type="button"
            aria-label="Next sectors"
            onClick={() => {
              setDirection(1);
              setIndex((i) => (i + 1) % sectors.length);
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#f37021] text-white shadow-lg transition-colors hover:bg-[#d96516]"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        </div>
      </div>
    </section>
  );
}
