"use client";

import { Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PriceText } from "@/components/shared/price-text";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

export function ProductCard({
  product,
  onClick,
  className,
}: {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(product)}
      className={cn(
        "group flex w-full flex-col items-stretch overflow-hidden rounded-2xl border border-border bg-card text-left transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0",
        className,
      )}
      disabled={!product.isAvailable}
    >
      <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-muted to-secondary">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Coffee className="h-10 w-10 text-muted-foreground/50" />
          </div>
        )}
        {product.isBestSeller && (
          <Badge variant="accent" className="absolute right-2 top-2 shadow-sm">
            Best Seller
          </Badge>
        )}
        {!product.isAvailable && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <Badge variant="destructive">Habis</Badge>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 p-2.5 sm:p-3">
        <p className="line-clamp-1 text-xs font-semibold sm:text-sm">{product.name}</p>
        {product.description && (
          <p className="line-clamp-1 text-[10px] text-muted-foreground sm:text-xs">
            {product.description}
          </p>
        )}
        <div className="mt-1.5 flex items-center justify-between">
          <PriceText value={product.price} size="sm" className="text-primary sm:text-base" />
        </div>
      </div>
    </button>
  );
}