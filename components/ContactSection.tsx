"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { TiltOnScroll } from "@/components/motion";

const serviceOptions = [
  "Business and Technical Consultancy",
  "Architecture & Design",
  "Blast free mining and rock excavation",
  "Engineering solutions",
  "Hotel, clubs, resorts, Golf course, Horticulture & landscaping",
  "Project Management (Greenfield & Brownfields)",
  "Startups",
  "Talent Management",
  "Trading and sourcing",
  "Reviving and Running the Sick industries",
  "Waste Management",
  "Wellness Equipment",
];

export default function ContactSection() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          service: formData.get("service"),
          message: formData.get("message"),
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your enquiry right now.");
      }

      form.reset();
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="bg-white pb-16 sm:pb-20 lg:pb-24" aria-labelledby="contact-heading">
      <div className="relative overflow-hidden bg-[#101827] py-16 text-white sm:py-20 lg:py-24">
        <Image src="/slider4.jpg" alt="" fill className="object-cover opacity-30" sizes="100vw" />
        <div className="absolute inset-0 bg-[#101827]/80" aria-hidden />
        <div className="relative mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:gap-8 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-white">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              Contact Us
            </p>
            <h2 id="contact-heading" className="text-3xl font-extrabold sm:text-4xl">
              Feel Free To Contact Us
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-white/80 lg:pt-10">
            Looking for expert engineering solutions? AVCONEXPO delivers excellence with innovative
            technology and unmatched expertise. Let&apos;s build something great together!
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-10 max-w-7xl px-4 sm:-mt-16 sm:px-6 lg:px-8">
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-zinc-200 sm:p-8">
            <h3 className="mb-6 text-2xl font-extrabold text-[#1a1a1a]">Get in Touch</h3>
            {sent ? (
              <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
                <p className="font-semibold">Thank you! Your enquiry has been submitted successfully.</p>
                <p className="mt-1 text-sm">Our team will review it from the admin panel and contact you soon.</p>
              </div>
            ) : null}
            {error ? (
              <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
                {error}
              </p>
            ) : null}
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                required
                placeholder="Full Name"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[#333] outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
              />
              <input
                type="email"
                name="email"
                required
                placeholder="Email Address"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[#333] outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
              />
              <input
                type="tel"
                name="phone"
                required
                placeholder="Phone Number"
                className="rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[#333] outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
              />
              <div>
                <select
                  id="service"
                  name="service"
                  required
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-[#333] outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
                  defaultValue=""
                >
                  <option value="" disabled>
                    --Select a Service--
                  </option>
                  {serviceOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  placeholder="Write your message here..."
                  className="w-full rounded-xl border border-zinc-300 px-4 py-3 text-[#333] outline-none focus:border-[#ff8c00] focus:ring-1 focus:ring-[#ff8c00]"
                />
              </div>
              <p className="text-sm text-[#444] sm:col-span-2">
                Have a query? Let&apos;s connect to find the best solution for your needs!
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-xl bg-[#ff8c00] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#e67e00] disabled:cursor-not-allowed disabled:bg-[#ff8c00]/60 sm:col-span-2"
              >
                {isSubmitting ? "Submitting..." : "Submit Now"}
              </button>
            </form>
          </div>

          <TiltOnScroll intensity={0.72} className="space-y-0 overflow-hidden rounded-[28px] bg-white shadow-2xl ring-1 ring-zinc-200">
            <div className="relative h-72 bg-zinc-200 sm:h-80">
              <Image
                src="/slider3.jpg"
                alt="AVCONEXPO contact"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="bg-[#101827] p-6 text-white sm:p-8">
              <h3 className="mb-5 text-2xl font-extrabold">Contact Info</h3>
              <address className="not-italic text-[#444]">
                <p className="mb-4 font-medium text-white/90">
                  1/6/55, Sector J, Pocket 6,
                  <br />
                  Sushant Golf City, Lucknow - 226030, UP, India
                </p>
                <p className="mb-3 text-white/75">
                  <a href="tel:+917007729873" className="hover:text-[#ff8c00]">
                    +91-7007729873
                  </a>
                  <br />
                  <a href="tel:+917860563231" className="hover:text-[#ff8c00]">
                    +91-7860563231
                  </a>
                </p>
                <p className="text-white/75">
                  <a href="mailto:solutions@avconexpo.com" className="hover:text-[#ff8c00]">
                    solutions@avconexpo.com
                  </a>
                </p>
              </address>
              <p className="mt-5 text-sm font-bold text-[#ff8c00]">Serving Clients Worldwide</p>
            </div>
          </TiltOnScroll>
        </div>
      </div>
    </section>
  );
}
