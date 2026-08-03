"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  countryDialCodes,
  DEFAULT_COUNTRY_ISO,
  getDialCodeByIso,
} from "@/lib/country-codes";

type ProductContactModalProps = {
  open: boolean;
  onClose: () => void;
  categoryLabel?: string;
  productTitle?: string;
};

export default function ProductContactModal({
  open,
  onClose,
  categoryLabel = "",
  productTitle = "",
}: ProductContactModalProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setError("");
      setIsSubmitting(false);
      setCountryIso(DEFAULT_COUNTRY_ISO);
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phoneNumber = String(formData.get("phone") ?? "").trim();
    const fullPhone = phoneNumber ? `${getDialCodeByIso(countryIso)} ${phoneNumber}` : "";
    const requirements = String(formData.get("requirements") ?? "").trim();
    const category = String(formData.get("category") ?? "").trim();

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
          company: null,
          country: null,
          machinery: productTitle || category || "Industrial Equipment Enquiry",
          message: [
            productTitle ? `Product: ${productTitle}` : "",
            category ? `Category: ${category}` : "",
            requirements ? `Requirements: ${requirements}` : "",
          ]
            .filter(Boolean)
            .join("\n"),
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

  const fieldClass =
    "h-10 w-full rounded-lg border border-zinc-200 px-3 text-sm outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20 sm:h-11";

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-black/55 p-0 sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-contact-title"
        className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-zinc-100 px-4 py-3 sm:px-5 sm:py-4">
          <div className="min-w-0 pr-2">
            <p className="text-xs font-bold uppercase tracking-wide text-[#f0571f]">Get a Quote</p>
            <h3 id="product-contact-title" className="mt-1 text-lg font-extrabold text-[#1a1a1a] sm:text-xl">
              Contact Us
            </h3>
            {productTitle ? (
              <p className="mt-1 line-clamp-2 text-xs text-[#555] sm:text-sm">Interested in: {productTitle}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-lg p-2 text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 py-4 sm:px-5 sm:py-5">
          {sent ? (
            <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
              <p className="font-semibold">Thank you! Your enquiry has been submitted.</p>
              <p className="mt-1 text-sm">Our sourcing team will contact you shortly.</p>
              <button
                type="button"
                onClick={onClose}
                className="mt-4 rounded-lg bg-[#f0571f] px-4 py-2 text-sm font-bold text-white hover:bg-[#d94818]"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-2.5 sm:space-y-3">
              {error ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
              ) : null}

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1e3a5f]">Category</label>
                <input
                  name="category"
                  readOnly
                  defaultValue={categoryLabel}
                  className="h-10 w-full rounded-lg border border-zinc-200 bg-zinc-50 px-3 text-sm text-[#333] sm:h-11"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1e3a5f]">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input name="name" required placeholder="Your name" className={fieldClass} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1e3a5f]">
                  Email <span className="text-red-500">*</span>
                </label>
                <input name="email" type="email" required placeholder="you@company.com" className={fieldClass} />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1e3a5f]">
                  Country Code + Phone <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
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
                    placeholder="Phone number"
                    className={`min-w-0 flex-1 ${fieldClass}`}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-[#1e3a5f]">
                  Requirements <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="requirements"
                  required
                  rows={3}
                  placeholder="Tell us quantity, specs, or delivery needs"
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm outline-none focus:border-[#f0571f] focus:ring-2 focus:ring-[#f0571f]/20"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#f0571f] text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#d94818] disabled:opacity-60 sm:h-11"
              >
                {isSubmitting ? "Submitting..." : "Submit Enquiry"}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
