"use client";

import Image from "next/image";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "AVCONEXPO exceeded our expectations with their turnkey project solutions. The team's technical expertise and attention to detail made our entire plant setup seamless and efficient.",
    name: "Nandita Rawat",
    image: "/slider1.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "Highly professional team with deep knowledge of industrial solutions. They delivered our boiler installation project before the deadline with outstanding quality.",
    name: "Tejasv Sahu",
    image: "/slider2.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "Their piping and utility services played a crucial role in our factory's expansion. The dedication and quality of work truly set them apart.",
    name: "Ellis William",
    image: "/slider3.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "I started with Avconexpo for a feasibility study, but the scope quickly grew into much more. They supported the project end-to-end - from concept and planning to technical decisions and execution support.",
    name: "Yahya Shakiru",
    image: "/slider4.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "Avconexpo's energy audit exposed exactly where profits were leaking and what needed to be fixed. It was a wake-up call that directly improved my operations.",
    name: "Willy Mekombo",
    image: "/slider1.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "For our 100 TPD edible oil project, Avconexpo delivered a true scratch-to-shelf solution. Their EPC expertise, combined with deep understanding of African markets, made a real difference.",
    name: "John Boscow",
    image: "/slider2.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "Avconexpo streamlined our entire supply chain - from sourcing and procurement to logistics. Their due diligence on quality and vendors saved us significant time and prevented costly mistakes.",
    name: "Abdul Ghani",
    image: "/slider3.jpg",
    imagePosition: "center top",
  },
  {
    quote:
      "When my industry was struggling, Avconexpo became my lifeline. They stepped in at a critical time and helped revive the plant - technically, operationally, and strategically.",
    name: "Ahmed Maalim",
    image: "/slider4.jpg",
    imagePosition: "25% 45%",
  },
];

export default function TestimonialsSection() {
  const [i, setI] = useState(0);
  const prev = () => setI((x) => (x - 1 + testimonials.length) % testimonials.length);
  const next = () => setI((x) => (x + 1) % testimonials.length);
  const visibleTestimonials = Array.from(
    { length: 2 },
    (_, offset) => testimonials[(i + offset) % testimonials.length],
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

        <div className="min-w-0 lg:col-span-7">
          <div className="grid gap-8 md:grid-cols-2">
            {visibleTestimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="relative"
              >
                <div className="relative min-h-[236px] bg-white px-7 pb-12 pt-8 shadow-sm">
                  <div className="mb-4 flex gap-1 text-[#f28a13]" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, star) => (
                      <svg key={star} className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.174 3.61a1 1 0 00.95.69h3.797c.969 0 1.371 1.24.588 1.81l-3.072 2.232a1 1 0 00-.364 1.118l1.174 3.61c.3.922-.755 1.688-1.539 1.118l-3.072-2.232a1 1 0 00-1.176 0l-3.072 2.232c-.784.57-1.838-.196-1.539-1.118l1.174-3.61a1 1 0 00-.364-1.118L2.538 9.037c-.783-.57-.38-1.81.588-1.81h3.797a1 1 0 00.95-.69l1.176-3.61z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="text-[15px] leading-7 text-[#171717]">{testimonial.quote}</blockquote>

                  <div className="absolute inset-x-0 bottom-0 h-1.5 bg-[#df7616]" />
                  <span className="absolute bottom-[-24px] left-10 h-0 w-0 border-x-[18px] border-t-[24px] border-x-transparent border-t-[#1f2937]" />
                </div>
                <figcaption className="mt-5 flex items-center gap-3 pl-7">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name} - client testimonial`}
                    width={64}
                    height={64}
                    style={{ objectPosition: testimonial.imagePosition }}
                    className="relative h-16 w-16 rounded-full border-[5px] border-[#0d1b69] object-cover shadow-md"
                  />
                  <span className="pt-4 text-sm font-bold text-[#df7616]">
                    {testimonial.name}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
