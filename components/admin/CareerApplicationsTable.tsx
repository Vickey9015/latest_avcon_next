"use client";

import AdminPagination from "@/components/admin/AdminPagination";
import ScrollableCell from "@/components/admin/ScrollableCell";
import { useAdminPagination } from "@/hooks/useAdminPagination";

export type CareerApplicationRow = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  resume_name: string | null;
  status: string;
  created_at: string;
};

function formatDate(value: string) {
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

type CareerApplicationsTableProps = {
  applications: CareerApplicationRow[];
};

export default function CareerApplicationsTable({ applications }: CareerApplicationsTableProps) {
  const {
    page,
    setPage,
    pageSize,
    setPageSize,
    paginatedItems: paginatedApplications,
    totalItems,
    totalPages,
    startIndex,
  } = useAdminPagination(applications);

  return (
    <>
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
              paginatedApplications.map((application, index) => (
                <tr key={application.id} className="align-top hover:bg-gray-50">
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {startIndex + index + 1}
                  </td>
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
                  <td className="max-w-[240px] px-6 py-4 text-sm text-gray-700">
                    <ScrollableCell>{application.position}</ScrollableCell>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-700">
                    {application.resume_name ? (
                      <a
                        className="rounded-full bg-orange-50 px-3 py-1.5 font-semibold text-orange-700 hover:bg-orange-100"
                        href={`/api/career/resume/${application.id}`}
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
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-medium ${statusClass(application.status)}`}
                    >
                      {application.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AdminPagination
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </>
  );
}
