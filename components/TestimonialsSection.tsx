"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { Testimonial } from "@/lib/testimonial-types";

type TestimonialsSectionProps = {
  testimonials: Testimonial[];
};

export default function TestimonialsSection({ testimonials: initialTestimonials = [] }: TestimonialsSectionProps) {
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setTestimonials(initialTestimonials ?? []);
    setIndex(0);
  }, [initialTestimonials]);

  if (testimonials.length === 0) {
    return (
      <section
        id="testimonials"
        className="overflow-hidden bg-[#edf2f5] py-16 sm:py-20 lg:py-24"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-7xl px-4 text-center text-gray-600 sm:px-6 lg:px-8">
          <h2 id="testimonials-heading" className="text-3xl font-extrabold text-[#df7616]">
            Delivering Excellence, Reflected by Our Clients
          </h2>
          <p className="mt-4">No client testimonials available at the moment.</p>
        </div>
      </section>
    );
  }

  const prev = () => setIndex((x) => (x - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((x) => (x + 1) % testimonials.length);
  const visibleTestimonials = Array.from(
    { length: Math.min(3, testimonials.length) },
    (_, offset) => testimonials[(index + offset) % testimonials.length],
  );

  return (
    <section
      id="testimonials"
      className="overflow-hidden bg-[#edf2f5] py-16 pb-10 sm:py-20 sm:pb-12 lg:py-24 lg:pb-16"
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <div className="lg:col-span-5 lg:pt-2">
          <p className="mb-3 flex items-center gap-2 text-sm font-extrabold text-[#dd7000]">
            <span className="inline-flex h-4 w-4 items-center justify-center text-[#1f2937]">
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
              </svg>
            </span>
            Clients Feedback
          </p>
          <h2
            id="testimonials-heading"
            className="max-w-md text-3xl font-extrabold leading-tight text-[#df7616] sm:text-4xl lg:text-[42px]"
          >
            Delivering Excellence, Reflected by Our Clients
          </h2>

          <div className="mt-8 flex items-center gap-4 lg:justify-end lg:pr-8">
            <button
              type="button"
              onClick={prev}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-sm transition hover:bg-[#ff8c00] hover:text-white"
              aria-label="Previous testimonial"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={next}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-[#1f2937] shadow-sm transition hover:bg-[#ff8c00] hover:text-white"
              aria-label="Next testimonial"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="min-w-0 overflow-visible lg:col-span-7">
          <div
            className={`grid gap-4 overflow-visible ${
              visibleTestimonials.length === 1
                ? "grid-cols-1"
                : visibleTestimonials.length === 2
                  ? "grid-cols-2"
                  : "grid-cols-[1fr_1fr_0.5fr]"
            }`}
          >
            {visibleTestimonials.map((testimonial, cardIndex) => (
              <figure
                key={testimonial.id}
                className={`relative flex flex-col ${cardIndex === 2 ? "opacity-50" : ""}`}
              >
                <div className="relative flex h-[180px] flex-col bg-white px-5 pb-8 pt-5 shadow-sm">
                  <div
                    className="mb-2 flex gap-1 text-[#f28a13]"
                    aria-label={`${testimonial.rating} star rating`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, star) => (
                      <svg key={star} className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.174 3.61a1 1 0 00.95.69h3.797c.969 0 1.371 1.24.588 1.81l-3.072 2.232a1 1 0 00-.364 1.118l1.174 3.61c.3.922-.755 1.688-1.539 1.118l-3.072-2.232a1 1 0 00-1.176 0l-3.072 2.232c-.784.57-1.838-.196-1.539-1.118l1.174-3.61a1 1 0 00-.364-1.118L2.538 9.037c-.783-.57-.38-1.81.588-1.81h3.797a1 1 0 00.95-.69l1.176-3.61z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="flex-1 overflow-y-auto pr-1 text-sm leading-5 text-[#171717]">
                    {testimonial.quote}
                  </blockquote>

                  <div className="absolute inset-x-0 bottom-0 h-1 bg-[#df7616]" />
                  <span className="absolute bottom-[-16px] left-6 h-0 w-0 border-x-[12px] border-t-[16px] border-x-transparent border-t-[#1f2937]" />
                </div>
                <figcaption className="mt-5 flex items-center gap-2 pl-5">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} - client testimonial`}
                    width={48}
                    height={48}
                    className="relative h-12 w-12 rounded-full border-[3px] border-[#f0571f] object-cover shadow-md"
                  />
                  <div className={cardIndex === 2 ? "hidden" : ""}>
                    <p className="text-sm font-bold text-[#f0571f]">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
