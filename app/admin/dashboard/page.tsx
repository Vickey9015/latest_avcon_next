import Link from "next/link";
import { getBannerCount } from "@/lib/banners";
import { getBlogCount } from "@/lib/blogs";
import { getContactCount } from "@/lib/contact-submissions";
import { getProjectCount } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [bannerCount, projectCount, blogCount, contactCount] = await Promise.all([
    getBannerCount(),
    getProjectCount(),
    getBlogCount(),
    getContactCount(),
  ]);

  const statsCards = [
    {
      title: "Total Banner",
      count: bannerCount,
      listLabel: "Banner List",
      href: "/admin/dashboard/banner",
      color: "bg-blue-700",
    },
    {
      title: "Total Projects",
      count: projectCount,
      listLabel: "Project List",
      href: "/admin/dashboard/project",
      color: "bg-blue-700",
    },
    {
      title: "Total Blogs",
      count: blogCount,
      listLabel: "Blog List",
      href: "/admin/dashboard/blog",
      color: "bg-blue-700",
    },
    {
      title: "Contact Enquiries",
      count: contactCount,
      listLabel: "Contact List",
      href: "/admin/dashboard/contact",
      color: "bg-orange-600",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card) => (
          <div key={card.title} className={`${card.color} overflow-hidden rounded-xl text-white`}>
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
                  <span className="text-xl font-bold text-gray-800">{card.count}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20">
              <Link
                href={card.href}
                className="block py-3 text-center text-sm font-medium transition-colors hover:bg-white/10"
              >
                {card.listLabel}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
