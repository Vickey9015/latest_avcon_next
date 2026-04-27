import Link from 'next/link';

const statsCards = [
  { title: 'Total Banner', count: 5, listLabel: 'Banner List', href: '/admin/dashboard/banner', color: 'bg-blue-700' },
  { title: 'Total Projects', count: 3, listLabel: 'Project List', href: '/admin/dashboard/project', color: 'bg-blue-700' },
  { title: 'Total Blogs', count: 5, listLabel: 'Blog List', href: '/admin/dashboard/blog', color: 'bg-blue-700' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statsCards.map((card) => (
          <div key={card.title} className={`${card.color} rounded-xl overflow-hidden text-white`}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-gray-800 text-xl font-bold">{card.count}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-white/20">
              <Link
                href={card.href}
                className="block py-3 text-center text-sm font-medium hover:bg-white/10 transition-colors"
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
