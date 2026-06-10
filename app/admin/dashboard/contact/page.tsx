import ContactSubmissionsTable from "@/components/admin/ContactSubmissionsTable";
import { getContactSubmissions } from "@/lib/contact-submissions";
import type { ContactSubmissionRow } from "@/lib/contact-types";

export const dynamic = "force-dynamic";

function serializeSubmissions(
  submissions: Awaited<ReturnType<typeof getContactSubmissions>>,
): ContactSubmissionRow[] {
  return submissions.map((submission) => ({
    id: submission.id,
    name: submission.name,
    email: submission.email,
    phone: submission.phone,
    service: submission.service,
    message: submission.message,
    status: submission.status,
    created_at: new Date(submission.created_at).toISOString(),
  }));
}

export default async function ContactPage() {
  const submissions = serializeSubmissions(await getContactSubmissions());

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Contact List</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enquiries from the website contact form.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            {submissions.length} Total
          </span>
        </div>
      </div>

      <ContactSubmissionsTable submissions={submissions} />
    </div>
  );
}
