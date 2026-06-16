"use client";

import { ShoppingBag } from "lucide-react";
import { formatCurrency } from "@/lib/format-currency";

export function FloatingCartBar({
  count,
  total,
  onOpen,
  hidden,
}: {
  count: number;
  total: number;
  onOpen: () => void;
  hidden: boolean;
}) {
  if (hidden) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border/60 bg-background/95 px-4 pb-[max(env(safe-area-inset-bottom),1rem)] pt-3 backdrop-blur-xl">
      <div className="mx-auto flex max-w-3xl items-center gap-3">
        <button
          type="button"
          onClick={onOpen}
          className="flex w-full items-center justify-between gap-3 rounded-2xl bg-foreground px-4 py-3.5 text-background shadow-lg shadow-foreground/20 transition-transform active:scale-[0.99]"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-background/15">
              <ShoppingBag className="h-4 w-4" strokeWidth={1.8} />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 font-mono text-[10px] font-bold text-amber-950">
                {count}
              </span>
            </span>
            <span className="text-sm font-medium">Lihat pesanan</span>
          </span>
          <span className="font-display text-[15px] font-medium tracking-tight">
            {formatCurrency(total)}
          </span>
        </button>
      </div>
    </div>
  );
}
