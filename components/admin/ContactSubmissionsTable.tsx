"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { ContactSubmissionRow, ContactSubmissionStatus } from "@/lib/contact-types";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: ContactSubmissionStatus) {
  if (status === "Replied") return "bg-green-100 text-green-800";
  return "bg-yellow-100 text-yellow-800";
}

interface ContactSubmissionsTableProps {
  submissions: ContactSubmissionRow[];
}

export default function ContactSubmissionsTable({ submissions }: ContactSubmissionsTableProps) {
  const router = useRouter();
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  async function onStatusChange(id: number, status: ContactSubmissionStatus) {
    setError("");
    setUpdatingId(id);

    try {
      const response = await fetch(`/api/admin/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Unable to update status.");
      }

      router.refresh();
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Unable to update status.");
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <>
      {error ? (
        <p className="mx-6 mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                  No contact submissions found. Submissions from the website contact form
                  will appear here.
                </td>
              </tr>
            ) : (
              submissions.map((submission, index) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                    {submission.name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    <a className="text-orange-700 hover:underline" href={`mailto:${submission.email}`}>
                      {submission.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    <a className="text-orange-700 hover:underline" href={`tel:${submission.phone}`}>
                      {submission.phone}
                    </a>
                  </td>
                  <td className="max-w-[220px] px-6 py-4 text-sm text-gray-700">{submission.service}</td>
                  <td className="max-w-[320px] px-6 py-4 text-sm leading-6 text-gray-700">
                    {submission.message}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {formatDate(submission.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <select
                      value={submission.status}
                      disabled={updatingId === submission.id}
                      onChange={(event) =>
                        onStatusChange(submission.id, event.target.value as ContactSubmissionStatus)
                      }
                      className={`rounded-full border-0 px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-orange-500 ${statusClass(submission.status)}`}
                    >
                      <option value="Unread">Unread</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
