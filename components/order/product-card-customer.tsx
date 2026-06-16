"use client";

import { Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceText } from "@/components/shared/price-text";
import type { Product } from "@/types/product";

export function ProductCardCustomer({
  product,
  onTap,
}: {
  product: Product;
  onTap: (p: Product) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onTap(product)}
      className="group flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md hover:shadow-amber-500/5"
    >
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-amber-100/50 to-orange-50/30 dark:from-amber-900/20 dark:to-orange-900/10">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Coffee className="h-10 w-10 text-amber-700/40 dark:text-amber-300/40" strokeWidth={1.4} />
          </div>
        )}
        {product.isBestSeller && (
          <Badge variant="accent" className="absolute right-1.5 top-1.5 shadow-sm">
            Best
          </Badge>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-3">
        <p className="line-clamp-1 text-[12.5px] font-semibold leading-tight sm:text-sm">
          {product.name}
        </p>
        {product.description && (
          <p className="line-clamp-1 text-[10.5px] text-muted-foreground">
            {product.description}
          </p>
        )}
        <div className="mt-1.5 flex items-center justify-between">
          <PriceText
            value={product.price}
            size="sm"
            className="text-foreground sm:text-[13px]"
          />
        </div>
      </div>
    </button>
  );
}
