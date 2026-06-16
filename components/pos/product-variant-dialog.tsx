"use client";

import { useState } from "react";
import { Coffee } from "lucide-react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PriceText } from "@/components/shared/price-text";
import type { Product, Variant, SugarLevel, Addon } from "@/types/product";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

type Props = {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: {
    product: Product;
    quantity: number;
    variant?: Variant;
    sugar?: SugarLevel;
    addons?: Addon[];
    note?: string;
  }) => void;
};

export function ProductVariantDialog({ product, open, onOpenChange, onAdd }: Props) {
  if (!product) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={product.name}
        description={product.description}
        className="max-w-md"
      >
        <ProductVariantForm
          key={product.id}
          product={product}
          onCancel={() => onOpenChange(false)}
          onAdd={(data) => {
            onAdd({ ...data, product });
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

function ProductVariantForm({
  product,
  onAdd,
  onCancel,
}: {
  product: Product;
  onAdd: (data: {
    quantity: number;
    variant?: Variant;
    sugar?: SugarLevel;
    addons?: Addon[];
    note?: string;
  }) => void;
  onCancel: () => void;
}) {
  const [quantity, setQuantity] = useState(1);
  const initialVariant = product.variants?.[0];
  const [variant, setVariant] = useState<Variant | undefined>(initialVariant);
  const [sugar, setSugar] = useState<SugarLevel>("normal");
  const [addons, setAddons] = useState<Addon[]>([]);
  const [note, setNote] = useState("");

  const addonsTotal = addons.reduce((sum, a) => sum + a.price, 0);
  const total = (product.price + addonsTotal) * quantity;

  const toggleAddon = (a: Addon) => {
    setAddons((prev) =>
      prev.find((x) => x.id === a.id) ? prev.filter((x) => x.id !== a.id) : [...prev, a],
    );
  };

  const handleAdd = () => {
    onAdd({
      quantity,
      variant,
      sugar: product.variants ? sugar : undefined,
      addons: addons.length > 0 ? addons : undefined,
      note: note.trim() || undefined,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex h-32 w-full items-center justify-center rounded-xl bg-gradient-to-br from-muted to-secondary">
        <Coffee className="h-10 w-10 text-muted-foreground/50" />
      </div>

      {product.variants && product.variants.length > 0 && (
        <div>
          <Label className="text-xs">Sajian</Label>
          <div className="mt-1.5 flex gap-2">
            {product.variants.map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                  variant === v
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
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
          <div className="mt-1.5 flex gap-2">
            {([
              { v: "normal" as SugarLevel, l: "Normal" },
              { v: "less" as SugarLevel, l: "Less" },
              { v: "none" as SugarLevel, l: "No Sugar" },
            ]).map((s) => (
              <button
                key={s.v}
                type="button"
                onClick={() => setSugar(s.v)}
                className={cn(
                  "flex-1 rounded-xl border px-3 py-2 text-sm font-medium transition-all",
                  sugar === s.v
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:text-foreground",
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
                    "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition-all",
                    selected ? "border-primary bg-primary/5" : "border-border hover:bg-muted",
                  )}
                >
                  <span className="font-medium">{a.name}</span>
                  <span className="text-muted-foreground">+{formatRupiah(a.price)}</span>
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
          className="mt-1.5 min-h-[60px] text-sm"
        />
      </div>

      <div className="flex items-center justify-between rounded-xl bg-muted/50 p-3">
        <div className="flex items-center gap-1.5">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="h-3.5 w-3.5" />
          </Button>
          <span className="w-8 text-center text-sm font-semibold tabular-nums">{quantity}</span>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Total</p>
          <PriceText value={total} className="text-primary" />
        </div>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={onCancel}>
          Batal
        </Button>
        <Button onClick={handleAdd}>Tambah ke Cart</Button>
      </DialogFooter>
    </div>
  );
}

function formatRupiah(v: number) {
  return `Rp ${v.toLocaleString("id-ID")}`;
}