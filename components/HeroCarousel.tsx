"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Banner } from "@/lib/banner-types";

type HeroCarouselProps = {
  slides: Banner[];
};

export default function HeroCarousel({ slides: initialSlides }: HeroCarouselProps) {
  const [slides, setSlides] = useState(initialSlides);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setSlides(initialSlides);
    setIndex(0);
  }, [initialSlides]);

  const go = useCallback(
    (dir: -1 | 1) => {
      if (slides.length === 0) return;
      setIndex((i) => (i + dir + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => go(1), 4000);
    return () => clearInterval(timer);
  }, [go, slides.length]);

  if (slides.length === 0) {
    return (
      <section className="relative flex min-h-[min(70vh,640px)] w-full items-center justify-center bg-gray-900 sm:min-h-[min(88vh,860px)]">
        <p className="text-white/80">No banners available.</p>
      </section>
    );
  }

  const slide = slides[index];

  return (
    <section className="relative min-h-[min(70vh,640px)] w-full overflow-hidden sm:min-h-[min(88vh,860px)]">
      <Image
        src={slide.image}
        alt={slide.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden />
      <div className="relative z-10 flex min-h-[min(70vh,640px)] flex-col justify-center px-4 pb-20 pt-28 sm:min-h-[min(88vh,860px)] sm:px-8 sm:pb-24 sm:pt-32 md:pt-28 lg:pt-32">
        <div className="mx-auto w-full max-w-7xl md:pl-4 lg:pl-8">
          <h1 className="max-w-xl text-left text-2xl font-bold leading-[1.15] tracking-tight text-white sm:max-w-2xl sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {slide.lines.map((line) => (
              <span key={`${slide.id}-${line}`} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div className="absolute bottom-6 left-0 right-0 z-10 flex items-center justify-center gap-4 sm:bottom-8 sm:gap-6">
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
          {slides.map((item, i) => (
            <button
              key={item.id}
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
