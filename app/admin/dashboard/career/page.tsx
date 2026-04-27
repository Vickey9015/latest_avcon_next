import { getCareerApplications } from "@/lib/career-applications";

export const dynamic = "force-dynamic";

function formatDate(value: Date) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function statusClass(status: string) {
  if (status === "New") return "bg-green-100 text-green-800";
  if (status === "Shortlisted") return "bg-blue-100 text-blue-800";
  if (status === "Rejected") return "bg-red-100 text-red-800";
  return "bg-yellow-100 text-yellow-800";
}

export default async function CareerPage() {
  const applications = await getCareerApplications();

  return (
    <div className="rounded-xl bg-white shadow-sm">
      <div className="border-b border-gray-200 p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Career Applications</h2>
            <p className="mt-1 text-sm text-gray-500">
              Applications submitted from the Career page job form.
            </p>
          </div>
          <span className="inline-flex w-fit rounded-full bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700">
            {applications.length} Total
          </span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px]">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                S.No
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Applicant Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Position Applied
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Resume
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Applied Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {applications.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-gray-500">
                  No career applications found.
                </td>
              </tr>
            ) : (
              applications.map((application, index) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{index + 1}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-semibold text-gray-900">
                    {application.full_name}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    <a className="text-orange-700 hover:underline" href={`mailto:${application.email}`}>
                      {application.email}
                    </a>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    <a className="text-orange-700 hover:underline" href={`tel:${application.phone}`}>
                      {application.phone}
                    </a>
                  </td>
                  <td className="max-w-[240px] px-6 py-4 text-sm text-gray-700">{application.position}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {application.resume_url ? (
                      <a
                        className="rounded-full bg-orange-50 px-3 py-1.5 font-semibold text-orange-700 hover:bg-orange-100"
                        href={application.resume_url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        View Resume
                      </a>
                    ) : (
                      <span className="text-gray-400">Not uploaded</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {formatDate(application.created_at)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm">
                    <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass(application.status)}`}>
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
