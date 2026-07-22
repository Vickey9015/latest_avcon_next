"use client";

import { FormEvent, useState, type ReactNode } from "react";
import {
  countryDialCodes,
  countryNames,
  DEFAULT_COUNTRY_ISO,
  getDialCodeByIso,
} from "@/lib/country-codes";

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

function Label({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-[#1e3a5f]">
      {children}
      {required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}

const inputClass =
  "h-11 w-full rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-3 text-sm text-[#333] outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15";

const selectClass =
  "h-11 w-full appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-10 pr-9 text-sm text-[#333] outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15";

type ContactFormProps = {
  title?: string;
  subtitle?: string;
  className?: string;
  defaultService?: string;
};

export default function ContactForm({
  title = "Contact Us",
  subtitle = "We'd love to hear from you! Please fill out the form below and our team will get back to you soon.",
  className = "",
  defaultService = "",
}: ContactFormProps) {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryIso, setCountryIso] = useState(DEFAULT_COUNTRY_ISO);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const phoneNumber = String(formData.get("phone") ?? "").trim();
    const fullPhone = phoneNumber ? `${getDialCodeByIso(countryIso)} ${phoneNumber}` : "";

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
          phone: fullPhone,
          service: formData.get("service"),
          message: formData.get("message"),
          country: formData.get("country"),
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
    <div className={`rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#1e3a5f] sm:text-3xl">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500 sm:text-base">{subtitle}</p>
      </div>

      {sent ? (
        <div className="mb-5 rounded-xl border border-green-200 bg-green-50 p-4 text-green-800">
          <p className="font-semibold">Thank you! Your enquiry has been submitted successfully.</p>
          <p className="mt-1 text-sm">Our team will review it and contact you soon.</p>
        </div>
      ) : null}

      {error ? (
        <p className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {error}
        </p>
      ) : null}

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <Label required>Full Name</Label>
          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </FieldIcon>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <Label required>Email Address</Label>
          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </FieldIcon>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <Label required>Country Code + Phone Number</Label>
          <div className="flex gap-2">
            <div className="relative min-w-[8.5rem] shrink-0 sm:min-w-[9.5rem]">
              <select
                value={countryIso}
                onChange={(event) => setCountryIso(event.target.value)}
                className="h-11 w-full appearance-none rounded-lg border border-zinc-200 bg-white py-2 pl-2 pr-7 text-sm text-[#333] outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15"
                aria-label="Country code"
              >
                {countryDialCodes.map((item) => (
                  <option key={item.iso} value={item.iso}>
                    {item.flag} {item.iso} {item.code}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
            <div className="relative min-w-0 flex-1">
              <FieldIcon>
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </FieldIcon>
              <input
                type="tel"
                name="phone"
                required
                placeholder="Enter your phone number"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        <div>
          <Label required>Select Services</Label>
          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </FieldIcon>
            <select id="service" name="service" required defaultValue={defaultService} className={selectClass}>
              <option value="" disabled>
                Select a service
              </option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <Label>Country (Optional)</Label>
          <div className="relative">
            <FieldIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </FieldIcon>
            <select name="country" defaultValue="" className={selectClass}>
              <option value="">Select your country</option>
              {countryNames.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400" aria-hidden>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </div>
        </div>

        <div>
          <Label>Write Message (Optional)</Label>
          <div className="relative">
            <TextAreaIcon>
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </TextAreaIcon>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Write your message here..."
              className="w-full resize-y rounded-lg border border-zinc-200 bg-white py-3 pl-10 pr-3 text-sm text-[#333] outline-none transition focus:border-[#1e3a5f] focus:ring-2 focus:ring-[#1e3a5f]/15"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#1e3a5f] text-sm font-semibold text-white transition-colors hover:bg-[#162d4a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
