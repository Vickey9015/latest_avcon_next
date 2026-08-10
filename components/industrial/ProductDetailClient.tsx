"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import ProductContactModal from "@/components/industrial/ProductContactModal";
import type { EquipmentProduct } from "@/lib/industrial-equipment";
import { getCategoryLabel } from "@/lib/industrial-equipment";

type ProductDetailClientProps = {
  product: EquipmentProduct;
};

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [open, setOpen] = useState(false);
  const images = product.images;

  useEffect(() => {
    if (images.length < 2 || paused) return;

    const timer = window.setInterval(() => {
      setIndex((value) => (value + 1) % images.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  return (
    <>
      <div
        className="min-w-0 w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative aspect-[4/3] w-full bg-zinc-50 sm:aspect-[5/3]">
          <Image
            src={images[index % images.length]}
            alt={product.title}
            fill
            className="object-cover transition duration-500"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
          {images.length > 1 ? (
            <>
              <button
                type="button"
                onClick={() => setIndex((value) => (value - 1 + images.length) % images.length)}
                className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow touch-manipulation sm:left-3 sm:h-10 sm:w-10"
                aria-label="Previous image"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => setIndex((value) => (value + 1) % images.length)}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow touch-manipulation sm:right-3 sm:h-10 sm:w-10"
                aria-label="Next image"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              <div className="absolute bottom-2.5 left-1/2 flex max-w-[calc(100%-3rem)] -translate-x-1/2 gap-1 overflow-x-auto sm:bottom-3 sm:gap-1.5">
                {images.map((image, imageIndex) => (
                  <button
                    key={`${product.slug}-dot-${imageIndex}`}
                    type="button"
                    onClick={() => setIndex(imageIndex)}
                    className={`h-1.5 shrink-0 rounded-full transition ${
                      imageIndex === index % images.length ? "w-5 bg-[#f0571f]" : "w-1.5 bg-white/80"
                    }`}
                    aria-label={`Show image ${imageIndex + 1}`}
                  />
                ))}
              </div>
            </>
          ) : null}
        </div>

        {images.length > 1 ? (
          <div className="flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain p-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:p-3 [&::-webkit-scrollbar]:hidden">
            {images.map((image, imageIndex) => (
              <button
                key={`${product.slug}-thumb-${imageIndex}`}
                type="button"
                onClick={() => setIndex(imageIndex)}
                className={`relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-lg border-2 touch-manipulation sm:h-16 sm:w-20 ${
                  index === imageIndex ? "border-[#f0571f]" : "border-transparent"
                }`}
              >
                <Image src={image} alt="" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        ) : null}

        <div className="border-t border-zinc-100 p-3.5 sm:p-5">
          <p className="text-sm leading-6 text-[#555]">{product.shortDescription}</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#f0571f] text-sm font-bold text-white touch-manipulation hover:bg-[#d94818] sm:mt-4"
          >
            Contact Us
          </button>
        </div>
      </div>

      <ProductContactModal
        open={open}
        onClose={() => setOpen(false)}
        productTitle={product.title}
        categoryLabel={getCategoryLabel(product.categoryId)}
      />
    </>
  );
}
