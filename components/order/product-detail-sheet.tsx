"use client";

import { useState } from "react";
import { Coffee, Plus, Minus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PriceText } from "@/components/shared/price-text";
import type {
  Product,
  Variant,
  SugarLevel,
  Addon,
} from "@/types/product";
import type { OrderItem } from "@/types/order";
import { calculateItemTotal } from "@/lib/order-totals";
import { cn } from "@/lib/utils";

const SUGAR_OPTIONS: { v: SugarLevel; l: string }[] = [
  { v: "normal", l: "Normal" },
  { v: "less", l: "Less" },
  { v: "none", l: "Tanpa" },
];

function formatRupiah(v: number) {
  return `Rp ${v.toLocaleString("id-ID")}`;
}

export function ProductDetailSheet({
  product,
  open,
  onOpenChange,
  onAdd,
}: {
  product: Product | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onAdd: (item: OrderItem) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl p-0 sm:max-w-md sm:self-center sm:rounded-3xl"
      >
        {product ? (
          <ProductDetailForm
            key={product.id}
            product={product}
            onAdd={(item) => {
              onAdd(item);
              onOpenChange(false);
            }}
          />
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

function ProductDetailForm({
  product,
  onAdd,
}: {
  product: Product;
  onAdd: (item: OrderItem) => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const initialVariant = product.variants?.[0];
  const [variant, setVariant] = useState<Variant | undefined>(initialVariant);
  const [sugar, setSugar] = useState<SugarLevel>("normal");
  const [addons, setAddons] = useState<Addon[]>([]);
  const [note, setNote] = useState("");

  const item: OrderItem = {
    productId: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity,
    variant: variant ?? undefined,
    sugar: product.variants ? sugar : undefined,
    addons: addons.length > 0 ? addons : undefined,
    note: note.trim() || undefined,
  };
  const total = calculateItemTotal(item);

  const toggleAddon = (a: Addon) => {
    setAddons((prev) =>
      prev.find((x) => x.id === a.id)
        ? prev.filter((x) => x.id !== a.id)
        : [...prev, a],
    );
  };

  const handleAdd = () => onAdd(item);

  return (
    <div className="flex max-h-[90vh] flex-col">
      <div className="border-b border-border px-5 pb-3 pt-5 pr-12 text-left">
        <h2
          className="font-display text-[20px] font-medium leading-tight tracking-[-0.01em]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
        >
          {product.name}
        </h2>
        {product.description && (
          <p className="mt-1 text-[13px] text-muted-foreground">
            {product.description}
          </p>
        )}
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
        <div className="flex h-28 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100/60 to-orange-50/40 dark:from-amber-900/20 dark:to-orange-900/10">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <Coffee
              className="h-10 w-10 text-amber-700/40 dark:text-amber-300/40"
              strokeWidth={1.4}
            />
          )}
        </div>

        {product.variants && product.variants.length > 0 && (
          <div>
            <Label className="text-xs">Sajian</Label>
            <div className="mt-1.5 flex gap-1.5">
              {product.variants.map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setVariant(v)}
                  className={cn(
                    "flex-1 rounded-xl border px-3 py-2 text-[13px] font-medium transition-all",
                    variant === v
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {v === "hot" ? "Hot" : "Iced"}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div>
            <Label className="text-xs">Gula</Label>
            <div className="mt-1.5 flex gap-1.5">
              {SUGAR_OPTIONS.map((s) => (
                <button
                  key={s.v}
                  type="button"
                  onClick={() => setSugar(s.v)}
                  className={cn(
                    "flex-1 rounded-xl border px-3 py-2 text-[13px] font-medium transition-all",
                    sugar === s.v
                      ? "border-foreground bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground",
                  )}
                >
                  {s.l}
                </button>
              ))}
            </div>
          </div>
        )}

        {product.addons && product.addons.length > 0 && (
          <div>
            <Label className="text-xs">Add-on</Label>
            <div className="mt-1.5 space-y-1.5">
              {product.addons.map((a) => {
                const selected = addons.find((x) => x.id === a.id);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => toggleAddon(a)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-[13px] transition-all",
                      selected
                        ? "border-foreground bg-foreground/5"
                        : "border-border bg-card",
                    )}
                  >
                    <span className="font-medium">{a.name}</span>
                    <span className="text-muted-foreground">
                      +{formatRupiah(a.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <Label className="text-xs">Catatan (opsional)</Label>
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="cth: less ice, extra hot..."
            className="mt-1.5 min-h-[56px] text-sm"
          />
        </div>
      </div>

      <div className="border-t border-border bg-background px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3.5 w-3.5" />
            </Button>
            <span className="w-8 text-center text-sm font-semibold tabular-nums">
              {quantity}
            </span>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3.5 w-3.5" />
            </Button>
          </div>
          <Button
            onClick={handleAdd}
            className="gap-2 px-5"
            size="lg"
          >
            <span className="hidden sm:inline">Tambah</span>
            <PriceText value={total} size="sm" className="text-background" />
          </Button>
        </div>
      </div>
    </div>
  );
}
