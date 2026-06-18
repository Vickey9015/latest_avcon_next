import CareerApplicationsTable from "@/components/admin/CareerApplicationsTable";
import { getCareerApplications } from "@/lib/career-applications";

export const dynamic = "force-dynamic";

export default async function CareerPage() {
  const applications = await getCareerApplications();

  const rows = applications.map((application) => ({
    id: application.id,
    full_name: application.full_name,
    email: application.email,
    phone: application.phone,
    position: application.position,
    resume_name: application.resume_name,
    status: application.status,
    created_at: application.created_at.toISOString(),
  }));

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

      <CareerApplicationsTable applications={rows} />
    </div>
  );
}
