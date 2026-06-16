"use client";

import type { Product } from "@/types/product";
import { ProductCardCustomer } from "./product-card-customer";

export function ProductGridCustomer({
  products,
  onTap,
}: {
  products: Product[];
  onTap: (p: Product) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
      {products.map((p) => (
        <ProductCardCustomer key={p.id} product={p} onTap={onTap} />
      ))}
    </div>
  );
}
