"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import type { EquipmentProduct } from "@/lib/industrial-equipment";
import { getCategoryLabel, productHref } from "@/lib/industrial-equipment";

type ProductCardProps = {
  product: EquipmentProduct;
  onContact: (product: EquipmentProduct) => void;
  compact?: boolean;
};

export default function ProductCard({ product, onContact, compact = false }: ProductCardProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const images = product.images.length > 0 ? product.images : ["/equipments-spares/hero-compressors.png"];
  const current = images[index % images.length];

  useEffect(() => {
    if (images.length < 2 || paused) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % images.length);
    }, 3200);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  function prev(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((value) => (value - 1 + images.length) % images.length);
  }

  function next(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    setIndex((value) => (value + 1) % images.length);
  }

  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg sm:rounded-2xl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative aspect-[16/10] bg-zinc-50 sm:aspect-[5/3] lg:aspect-[4/3]">
        <Link href={productHref(product.slug)} className="absolute inset-0 block">
          <Image
            src={current}
            alt={product.title}
            fill
            className="object-cover transition duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
        </Link>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow hover:bg-white sm:left-2 sm:h-8 sm:w-8"
              aria-label="Previous image"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-1.5 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1a1a1a] shadow hover:bg-white sm:right-2 sm:h-8 sm:w-8"
              aria-label="Next image"
            >
              <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 gap-1.5 sm:flex">
              {images.map((image, imageIndex) => (
                <button
                  key={`${product.slug}-${image}-${imageIndex}`}
                  type="button"
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    setIndex(imageIndex);
                  }}
                  className={`h-1.5 rounded-full transition ${
                    imageIndex === index % images.length ? "w-4 bg-[#f0571f]" : "w-1.5 bg-white/80"
                  }`}
                  aria-label={`Show image ${imageIndex + 1}`}
                />
              ))}
            </div>
            <span className="absolute bottom-1.5 right-1.5 z-10 rounded-md bg-black/65 px-1.5 py-0.5 text-[10px] font-semibold text-white sm:bottom-2 sm:right-2">
              {index + 1}/{images.length}
            </span>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#f0571f] sm:text-[11px]">
          {getCategoryLabel(product.categoryId)}
        </p>
        <Link
          href={productHref(product.slug)}
          className="mt-1 line-clamp-2 text-sm font-bold leading-snug text-[#1e3a5f] hover:text-[#f0571f] sm:text-base"
        >
          {product.title}
        </Link>

        <button
          type="button"
          onClick={() => onContact(product)}
          className="mt-2.5 flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#f0571f] text-xs font-bold text-white transition hover:bg-[#d94818] sm:mt-3 sm:h-10 sm:text-sm"
        >
          <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          Contact Us
        </button>

        {!compact && product.specs.length > 0 ? (
          <dl className="mt-2.5 hidden overflow-hidden rounded-lg border border-zinc-100 text-xs sm:mt-3 sm:block">
            {product.specs.slice(0, 3).map((spec) => (
              <div key={spec.label} className="grid grid-cols-2 border-b border-zinc-100 last:border-b-0">
                <dt className="bg-zinc-50 px-2.5 py-1.5 font-semibold text-[#555]">{spec.label}</dt>
                <dd className="px-2.5 py-1.5 text-[#333]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        <p className={`mt-2.5 text-xs leading-5 text-[#555] sm:mt-3 sm:text-sm sm:leading-6 ${compact ? "line-clamp-2" : "line-clamp-2 sm:line-clamp-3"}`}>
          {product.shortDescription}
        </p>
      </div>
    </article>
  );
}
