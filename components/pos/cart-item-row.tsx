"use client";

import { Coffee, Plus, Minus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceText } from "@/components/shared/price-text";
import type { CartItem } from "@/types/transaction";
import { calculateItemTotal } from "@/lib/calculate-order";

export function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
  onEdit,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onEdit?: (item: CartItem) => void;
}) {
  const detail = [
    item.variant ? (item.variant === "hot" ? "Hot" : "Iced") : null,
    item.sugar
      ? item.sugar === "normal"
        ? "Normal Sugar"
        : item.sugar === "less"
          ? "Less Sugar"
          : "No Sugar"
      : null,
  ]
    .filter(Boolean)
    .join(" � ");

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
          <Coffee className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{item.name}</p>
              {detail && <p className="text-xs text-muted-foreground">{detail}</p>}
              {item.addons && item.addons.length > 0 && (
                <p className="text-xs text-muted-foreground">+ {item.addons.map((a) => a.name).join(", ")}</p>
              )}
              {item.note && <p className="text-xs italic text-muted-foreground">&quot;{item.note}&quot;</p>}
            </div>
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
              aria-label="Hapus"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, -1)}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-7 text-center text-sm font-semibold tabular-nums">{item.quantity}</span>
              <Button
                size="icon"
                variant="outline"
                className="h-7 w-7"
                onClick={() => onUpdateQuantity(item.id, 1)}
              >
                <Plus className="h-3 w-3" />
              </Button>
              {onEdit && (
                <Button
                  size="sm"
                  variant="ghost"
                  className="ml-1 h-7 px-2 text-xs"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </Button>
              )}
            </div>
            <PriceText value={calculateItemTotal(item)} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}