import EquipmentManagement from "@/components/admin/EquipmentManagement";
import { getAllEquipmentProducts } from "@/lib/equipment";

export const dynamic = "force-dynamic";

export default async function EquipmentAdminPage() {
  const products = await getAllEquipmentProducts();

  return <EquipmentManagement initialProducts={products} />;
}
