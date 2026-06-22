"use client";

import { FormEvent, useState, type ReactNode } from "react";
import { servicesCatalog } from "@/lib/services-catalog";

const countryCodes = [
  { code: "+91", flag: "🇮🇳" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+966", flag: "🇸🇦" },
  { code: "+974", flag: "🇶🇦" },
  { code: "+973", flag: "🇧🇭" },
  { code: "+968", flag: "🇴🇲" },
  { code: "+965", flag: "🇰🇼" },
  { code: "+254", flag: "🇰🇪" },
  { code: "+234", flag: "🇳🇬" },
  { code: "+27", flag: "🇿🇦" },
  { code: "+20", flag: "🇪🇬" },
  { code: "+49", flag: "🇩🇪" },
];

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
      {children}
    </span>
  );
}

function TextAreaIcon({ children }: { children: ReactNode }) {
  return <span className="pointer-events-none absolute left-3 top-3 text-[#9ca3af]">{children}</span>;
}

const inputClass =
  "h-10 w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-3 text-sm text-[#333] outline-none transition focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20";

const selectClass =
  "h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-9 text-sm text-[#333] outline-none transition focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20";

export default function ServicesConsultationForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCode, setCountryCode] = useState("+91");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneNumber = String(formData.get("phone") ?? "").trim();
    const fullPhone = phoneNumber ? `${countryCode} ${phoneNumber}` : "";
    const company = String(formData.get("company") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const service = String(formData.get("service") ?? "").trim();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: fullPhone,
          company,
          service,
          message: message || `Services landing enquiry for ${service || "general consultation"}.`,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your enquiry right now.");
      }

      form.reset();
      setCountryCode("+91");
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="rounded-[20px] border border-white/20 bg-white p-5 shadow-2xl sm:p-6 lg:p-7">
      <h2 className="text-center text-xl font-extrabold text-[#1e3a5f] sm:text-2xl">
        Get Your <span className="text-[#f0571f]">Free</span> Industrial Consultation
      </h2>

      {sent ? (
        <div className="mt-5 rounded-xl border border-green-200 bg-green-50 p-4 text-center text-green-800">
          <p className="font-semibold">Thank you! Your consultation request has been submitted.</p>
          <p className="mt-1 text-sm">Our experts will contact you shortly.</p>
        </div>
      ) : null}

      {error ? (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">{error}</p>
      ) : null}

      {!sent ? (
        <form onSubmit={onSubmit} className="mt-5 space-y-3.5">
          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </FieldIcon>
            <input type="text" name="name" required placeholder="Full Name" className={inputClass} />
          </div>

          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </FieldIcon>
            <input type="email" name="email" required placeholder="Email Address" className={inputClass} />
          </div>

          <div className="flex gap-2">
            <select
              value={countryCode}
              onChange={(event) => setCountryCode(event.target.value)}
              className="h-10 w-[6.5rem] shrink-0 appearance-none rounded-lg border border-zinc-200 bg-white px-2 text-xs outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20 sm:w-28 sm:text-sm"
              aria-label="Country code"
            >
              {countryCodes.map((item) => (
                <option key={item.code} value={item.code}>
                  {item.flag} {item.code}
                </option>
              ))}
            </select>
            <div className="relative min-w-0 flex-1">
              <FieldIcon>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </FieldIcon>
              <input type="tel" name="phone" required placeholder="Phone Number" className={inputClass} />
            </div>
          </div>

          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </FieldIcon>
            <input type="text" name="company" placeholder="Company Name" className={inputClass} />
          </div>

          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </FieldIcon>
            <select name="service" required defaultValue="" className={selectClass}>
              <option value="" disabled>
                Select Your Service
              </option>
              {servicesCatalog.map((service) => (
                <option key={service.href} value={service.contactFormService}>
                  {service.title}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>

          <div className="relative">
            <TextAreaIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </TextAreaIcon>
            <textarea
              name="message"
              rows={4}
              placeholder="Project Details / Message"
              className="w-full resize-y rounded-lg border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm text-[#333] outline-none transition focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-12 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#f0571f] to-[#faa419] text-sm font-extrabold uppercase tracking-wide text-white shadow-lg transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Get Free Consultation Now"}
          </button>

          <p className="text-center text-xs text-zinc-500">Your information is secure and confidential.</p>
        </form>
      ) : null}
    </div>
  );
}
