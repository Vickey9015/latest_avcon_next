"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type Slide = {
  /** Single-line title (centered) */
  title?: string;
  /** Multi-line stack, left-weighted (reference layout) */
  lines?: string[];
  image: string;
  alt: string;
};

const slides: Slide[] = [
  {
    lines: ["EPC - Engineering", "Procurement &", "Construction"],
    image: "/slider1.jpg",
    alt: "Industrial piping and plant — engineering and EPC",
  },
  {
    lines: ["Greenfield And", "Brownfield", "Project", "Development"],
    image: "/slider2.jpg",
    alt: "Industrial facility at dusk — greenfield and brownfield development",
  },
  {
    lines: ["Project Feasibility &", "Market Research"],
    image: "/slider3.jpg",
    alt: "Manufacturing and industrial solutions",
  },
  {
    lines: ["Global Business &", "Technical Consultancy"],
    image: "/slider4.jpg",
    alt: "Construction and consultancy project",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);

  const go = useCallback((dir: -1 | 1) => {
    setIndex((i) => (i + dir + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [go]);

  const slide = slides[index];

  return (
    <section className="relative min-h-[min(88vh,860px)] w-full overflow-hidden">
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative z-10 flex min-h-[min(88vh,860px)] flex-col justify-center px-6 pb-24 pt-24 sm:px-8 md:pt-28 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl md:pl-4 lg:pl-8">
          {slide.lines ? (
            <h1 className="max-w-xl text-left text-3xl font-bold leading-[1.15] tracking-tight text-white sm:max-w-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
              {slide.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
          ) : (
            <h1 className="max-w-4xl text-left text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl lg:text-[2.65rem]">
              {slide.title}
            </h1>
          )}
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 z-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous slide"
          className="rounded-full border border-white/60 p-2 text-white transition-colors hover:bg-white/10"
          onClick={() => go(-1)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === index ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next slide"
          className="rounded-full border border-white/60 p-2 text-white transition-colors hover:bg-white/10"
          onClick={() => go(1)}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
}
