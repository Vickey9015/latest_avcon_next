"use client";

import { FormEvent, useState } from "react";

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

type ContactFormProps = {
  title?: string;
  className?: string;
};

export default function ContactForm({ title = "Get in Touch", className = "" }: ContactFormProps) {
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
    <div className={`rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-zinc-200 sm:p-8 ${className}`}>
      <h3 className="mb-6 text-2xl font-extrabold text-[#1a1a1a]">{title}</h3>
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
  );
}
