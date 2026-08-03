"use client";

import { FormEvent, useState } from "react";
import {
  countryDialCodes,
  DEFAULT_COUNTRY_ISO,
  getDialCodeByIso,
} from "@/lib/country-codes";

type ShortEnquiryFormProps = {
  title?: string;
  subtitle?: string;
  defaultCategory?: string;
  className?: string;
};

const inputClass =
  "h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20 sm:h-11";

export default function ShortEnquiryForm({
  title = "Request a Quick Quote",
  subtitle = "Share your requirement and our team will respond promptly.",
  defaultCategory = "Industrial Equipment & Spare Parts",
  className = "",
}: ShortEnquiryFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phoneNumber = String(formData.get("phone") ?? "").trim();
    const fullPhone = phoneNumber ? `${getDialCodeByIso(countryIso)} ${phoneNumber}` : "";
    const requirements = String(formData.get("requirements") ?? "").trim();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: fullPhone,
          service: "Industrial Equipment & Spare Parts",
          machinery: defaultCategory,
          message: requirements,
          source: "industrial-equipment-supplier",
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your enquiry right now.");
      }
      form.reset();
      setCountryIso(DEFAULT_COUNTRY_ISO);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your enquiry right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className={`rounded-xl border border-orange-100 bg-white p-4 shadow-sm sm:rounded-2xl sm:p-5 lg:p-6 ${className}`}>
      <h3 className="text-lg font-extrabold text-[#1a1a1a] sm:text-xl">{title}</h3>
      <p className="mt-1 text-xs text-[#555] sm:text-sm">{subtitle}</p>

      {sent ? (
        <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <p className="font-semibold">Thank you! Your enquiry has been submitted successfully.</p>
        </div>
      ) : null}

      {error ? (
        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p>
      ) : null}

      {!sent ? (
        <form onSubmit={onSubmit} className="mt-4 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
          <input name="name" required placeholder="Full Name *" className={inputClass} />
          <input name="email" type="email" required placeholder="Email *" className={inputClass} />

          <div className="flex gap-2 sm:col-span-2">
            <div className="relative min-w-[7.5rem] shrink-0 sm:min-w-[9rem]">
              <select
                value={countryIso}
                onChange={(event) => setCountryIso(event.target.value)}
                className="h-10 w-full appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-2 pr-7 text-xs text-[#333] outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20 sm:h-11 sm:text-sm"
                aria-label="Country code"
              >
                {countryDialCodes.map((item) => (
                  <option key={item.iso} value={item.iso}>
                    {item.flag} {item.iso} {item.code}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <input
              name="phone"
              type="tel"
              required
              placeholder="Phone Number *"
              className={`min-w-0 flex-1 ${inputClass}`}
            />
          </div>

          <textarea
            name="requirements"
            required
            rows={3}
            placeholder="Your Requirements *"
            className="rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20 sm:col-span-2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="h-10 rounded-lg bg-[#f0571f] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#d94818] disabled:opacity-60 sm:col-span-2 sm:h-11"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
          </button>
        </form>
      ) : null}
    </div>
  );
}
