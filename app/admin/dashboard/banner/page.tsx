import BannerManagement from "@/components/admin/BannerManagement";
import { getAllBanners } from "@/lib/banners";

export const dynamic = "force-dynamic";

export default async function BannerPage() {
  const banners = await getAllBanners();

  return <BannerManagement initialBanners={banners} />;
}
