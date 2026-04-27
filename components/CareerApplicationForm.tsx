"use client";

import { FormEvent, useState } from "react";

export default function CareerApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setError("");
    setSent(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/career", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to submit your application right now.");
      }

      form.reset();
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      className="h-full overflow-hidden rounded-[30px] border border-orange-100 bg-white shadow-2xl"
      onSubmit={onSubmit}
    >
      <div className="bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-5 text-white sm:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/80">Join Our Team</p>
        <h3 className="mt-1 text-2xl font-extrabold text-white">Application Form</h3>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-2 sm:p-8">
        {sent ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-green-800 sm:col-span-2">
            <p className="font-semibold">Thank you! Your application has been submitted successfully.</p>
            <p className="mt-1 text-sm">Our team can now review it from the admin panel.</p>
          </div>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}

        <div className="sm:col-span-2">
          <label htmlFor="fullName" className="mb-1.5 block text-sm font-bold text-[#273339]">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-bold text-[#273339]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-bold text-[#273339]">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="position" className="mb-1.5 block text-sm font-bold text-[#273339]">
            Job Position
          </label>
          <input
            id="position"
            name="position"
            type="text"
            defaultValue="Business Development Executive"
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="resume" className="mb-1.5 block text-sm font-bold text-[#273339]">
            CV/Resume
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[#f37021]/10 file:px-3 file:py-2 file:font-bold file:text-[#f37021] focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021]"
            accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.webp"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Only DOCX, PDF, and image files are allowed. Maximum file size: 500KB.
          </p>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </div>
    </form>
  );
}
