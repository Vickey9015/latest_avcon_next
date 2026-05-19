"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

export type CareerJobOption = {
  id: number;
  title: string;
};

type CareerApplicationFormProps = {
  jobs?: CareerJobOption[];
  defaultJobId?: number | null;
};

export default function CareerApplicationForm({
  jobs = [],
  defaultJobId = null,
}: CareerApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const defaultPosition = useMemo(() => {
    if (jobs.length === 0) {
      return "";
    }
    if (defaultJobId) {
      const match = jobs.find((job) => job.id === defaultJobId);
      if (match) {
        return match.title;
      }
    }
    return jobs[0].title;
  }, [jobs, defaultJobId]);

  const [selectedPosition, setSelectedPosition] = useState(defaultPosition);

  useEffect(() => {
    setSelectedPosition(defaultPosition);
  }, [defaultPosition]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (jobs.length === 0) {
      setError("No job openings are available right now. Please check back later.");
      return;
    }

    if (!selectedPosition) {
      setError("Please select a job position.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.set("position", selectedPosition);

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
      setSelectedPosition(defaultPosition);
      setSent(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to submit your application right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const formDisabled = jobs.length === 0 || isSubmitting;

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
          </div>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700 sm:col-span-2">
            {error}
          </p>
        ) : null}

        {jobs.length === 0 ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 sm:col-span-2">
            There are no active job openings to apply for at the moment. Please check the listings above later.
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
            disabled={formDisabled}
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] disabled:opacity-60"
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
            disabled={formDisabled}
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] disabled:opacity-60"
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
            disabled={formDisabled}
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] disabled:opacity-60"
            required
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="position" className="mb-1.5 block text-sm font-bold text-[#273339]">
            Job Position
          </label>
          <select
            id="position"
            name="position"
            value={selectedPosition}
            onChange={(event) => setSelectedPosition(event.target.value)}
            disabled={formDisabled}
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 outline-none focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] disabled:opacity-60"
            required
          >
            <option value="" disabled>
              Select a position
            </option>
            {jobs.map((job) => (
              <option key={job.id} value={job.title}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="resume" className="mb-1.5 block text-sm font-bold text-[#273339]">
            CV/Resume
          </label>
          <input
            id="resume"
            name="resume"
            type="file"
            disabled={formDisabled}
            className="w-full rounded-xl border border-orange-100 bg-orange-50/30 px-3 py-2.5 text-sm outline-none file:mr-4 file:rounded-lg file:border-0 file:bg-[#f37021]/10 file:px-3 file:py-2 file:font-bold file:text-[#f37021] focus:border-[#f37021] focus:ring-1 focus:ring-[#f37021] disabled:opacity-60"
            accept=".doc,.docx,.pdf,.png,.jpg,.jpeg,.webp"
          />
          <p className="mt-1 text-xs text-zinc-500">
            Only DOC, DOCX, PDF, and image files are allowed. Maximum file size: 500KB.
          </p>
        </div>
        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={formDisabled}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#f0571f] to-[#faa419] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-65"
          >
            {isSubmitting ? "Submitting..." : "Submit Now"}
          </button>
        </div>
      </div>
    </form>
  );
}
