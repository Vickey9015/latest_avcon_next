"use client";

import { FormEvent, useState, type ReactNode } from "react";

const countries = [
  "India",
  "United Arab Emirates",
  "Qatar",
  "Bahrain",
  "Oman",
  "Kuwait",
  "Kenya",
  "Nigeria",
  "Ghana",
  "Egypt",
  "Ethiopia",
  "Tanzania",
  "Uganda",
  "Rwanda",
  "Guinea",
  "Sierra Leone",
  "Burundi",
  "South Sudan",
  "Somalia",
  "United States",
  "United Kingdom",
  "Germany",
  "Other",
];

function FieldIcon({ children }: { children: ReactNode }) {
  return (
    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
      {children}
    </span>
  );
}

function TextAreaIcon({ children }: { children: ReactNode }) {
  return <span className="pointer-events-none absolute left-3 top-2.5 text-[#9ca3af]">{children}</span>;
}

const inputClass =
  "h-9 w-full rounded-lg border-0 bg-white py-2 pl-9 pr-3 text-xs text-[#333] shadow-sm outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-[#f0571f]/50 sm:text-sm";

const textareaClass =
  "w-full resize-none rounded-lg border-0 bg-white py-2 pl-9 pr-3 text-xs text-[#333] shadow-sm outline-none ring-1 ring-transparent transition focus:ring-2 focus:ring-[#f0571f]/50 sm:text-sm";

export default function EquipmentSparesEnquiryForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "").trim();
    const company = String(formData.get("company") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const country = String(formData.get("country") ?? "").trim();
    const machinery = String(formData.get("machinery") ?? "").trim();
    const expectedDelivery = String(formData.get("expectedDelivery") ?? "").trim();
    const additionalMessage = String(formData.get("additionalMessage") ?? "").trim();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          country,
          machinery,
          expectedDelivery,
          additionalMessage,
          service: "Industrial Equipment & Spare Parts",
          message: additionalMessage || machinery,
          source: "equipment-spares",
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
    <div className="flex h-full flex-col rounded-[24px] bg-[#0c1a3a] p-4 shadow-2xl sm:p-5">
      <div className="mb-3">
        <h3 className="text-xl font-extrabold uppercase tracking-wide text-white sm:text-2xl">
          Get a <span className="text-[#f0571f]">Free Quote</span>
        </h3>
        <p className="mt-1 text-xs text-white/75 sm:text-sm">
          Tell us your requirement. We&apos;ll take care of the rest.
        </p>
      </div>

      {sent ? (
        <div className="mb-3 rounded-lg border border-green-400/30 bg-green-500/10 p-3 text-sm text-green-100">
          <p className="font-semibold">Thank you! Your enquiry has been submitted successfully.</p>
        </div>
      ) : null}

      {error ? (
        <p className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-xs font-medium text-red-100">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="flex flex-1 flex-col gap-2">
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </FieldIcon>
            <input type="text" name="name" required placeholder="Full Name *" className={inputClass} />
          </div>
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </FieldIcon>
            <input type="text" name="company" placeholder="Company Name" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </FieldIcon>
            <input type="email" name="email" required placeholder="Email Address *" className={inputClass} />
          </div>
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </FieldIcon>
            <input type="tel" name="phone" required placeholder="Phone Number *" className={inputClass} />
          </div>
        </div>

        <div className="grid gap-2 sm:grid-cols-2">
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </FieldIcon>
            <select name="country" required defaultValue="" className={`${inputClass} appearance-none`}>
              <option value="" disabled>
                Country *
              </option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <FieldIcon>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </FieldIcon>
            <input type="text" name="expectedDelivery" placeholder="Expected Delivery" className={inputClass} />
          </div>
        </div>

        <div className="relative">
          <TextAreaIcon>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </TextAreaIcon>
          <textarea
            name="machinery"
            required
            rows={2}
            placeholder="Machinery / Spare Part Required *"
            className={textareaClass}
          />
        </div>

        <div className="relative">
          <TextAreaIcon>
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </TextAreaIcon>
          <textarea
            name="additionalMessage"
            rows={1}
            placeholder="Additional Message (Optional)"
            className={textareaClass}
          />
        </div>

        <div className="mt-auto space-y-2 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#f0571f] text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#d94818] disabled:cursor-not-allowed disabled:opacity-60 sm:text-sm"
          >
            {isSubmitting ? "Submitting..." : "Submit Enquiry"}
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>

          <p className="flex items-center justify-center gap-1.5 text-center text-[10px] text-white/60 sm:text-xs">
            <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Your information is secure and confidential.
          </p>
        </div>
      </form>
    </div>
  );
}
