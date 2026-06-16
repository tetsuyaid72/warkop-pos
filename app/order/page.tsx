import { OrderCatalog } from "@/components/order/order-catalog";
import { fetchOutletByParams } from "@/lib/supabase/outlet-queries";

type SearchParams = Promise<{
  o?: string;
  t?: string;
}>;

export default async function OrderPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const outlet = await fetchOutletByParams(params.o, params.t);

  return <OrderCatalog outlet={outlet} slug={params.o} token={params.t} />;
}
