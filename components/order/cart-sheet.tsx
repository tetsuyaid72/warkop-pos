"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Trash2, ChevronRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PriceText } from "@/components/shared/price-text";
import { EmptyState } from "@/components/shared/empty-state";
import { formatCurrency } from "@/lib/format-currency";
import type { OrderItem } from "@/types/order";
import type { OrderTotals } from "@/lib/order-totals";

function detailLine(i: OrderItem) {
  const parts: string[] = [];
  if (i.variant) parts.push(i.variant === "hot" ? "Hot" : "Iced");
  if (i.sugar) {
    parts.push(
      i.sugar === "normal"
        ? "Normal Sugar"
        : i.sugar === "less"
          ? "Less Sugar"
          : "Tanpa Gula",
    );
  }
  return parts.join(" · ");
}

export function CartSheet({
  open,
  onOpenChange,
  items,
  taxPct,
  servicePct,
  onRemove,
  onUpdateQty,
  totals,
  onSubmit,
  submitting,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  items: OrderItem[];
  taxPct: number;
  servicePct: number;
  onRemove: (idx: number) => void;
  onUpdateQty: (idx: number, delta: number) => void;
  totals: OrderTotals;
  onSubmit: (form: {
    customerName: string;
    tableNumber: string;
    customerPhone?: string;
    customerNote?: string;
  }) => void;
  submitting: boolean;
}) {
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = () => {
    if (items.length === 0) return;
    if (!customerName.trim()) {
      setFormError("Nama wajib diisi");
      return;
    }
    if (!tableNumber.trim()) {
      setFormError("Nomor meja wajib diisi");
      return;
    }
    setFormError(null);
    onSubmit({
      customerName: customerName.trim(),
      tableNumber: tableNumber.trim(),
      customerPhone: customerPhone.trim() || undefined,
      customerNote: customerNote.trim() || undefined,
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl p-0 sm:max-w-md sm:self-center sm:rounded-3xl"
      >
        <div className="flex max-h-[92vh] flex-col">
          <div className="border-b border-border px-5 pb-3 pt-5 pr-12 text-left">
            <h2
              className="font-display text-[20px] font-medium leading-tight tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
            >
              Pesanan kamu
            </h2>
            <p className="mt-1 text-[13px] text-muted-foreground">
              Isi nama & nomor meja, lalu kirim ke kasir.
            </p>
          </div>

          <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
            {/* Items */}
            {items.length === 0 ? (
              <EmptyState
                title="Belum ada pesanan"
                description="Pilih menu favoritmu dulu"
                icon={ShoppingBag}
                className="rounded-2xl border border-dashed border-border py-10"
              />
            ) : (
              <ul className="space-y-2">
                {items.map((item, idx) => (
                  <li
                    key={`${item.productId}-${idx}`}
                    className="rounded-xl border border-border bg-card p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <p className="text-[13.5px] font-semibold leading-tight">
                          {item.name}
                        </p>
                        {detailLine(item) && (
                          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                            {detailLine(item)}
                          </p>
                        )}
                        {item.addons && item.addons.length > 0 && (
                          <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                            + {item.addons.map((a) => a.name).join(", ")}
                          </p>
                        )}
                        {item.note && (
                          <p className="mt-0.5 text-[11.5px] italic text-muted-foreground">
                            &ldquo;{item.note}&rdquo;
                          </p>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemove(idx)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        aria-label="Hapus"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQty(idx, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-6 text-center text-[13px] font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => onUpdateQty(idx, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <PriceText
                        value={item.price * item.quantity}
                        size="sm"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {/* Form */}
            <div className="space-y-3 rounded-2xl border border-border bg-muted/30 p-3">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <Label className="text-xs">Nama *</Label>
                  <Input
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="cth: Budi"
                    className="mt-1 h-9 text-sm"
                    maxLength={40}
                  />
                </div>
                <div>
                  <Label className="text-xs">No. Meja *</Label>
                  <Input
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="cth: 3"
                    className="mt-1 h-9 text-sm"
                    maxLength={10}
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs">No. HP (opsional)</Label>
                <Input
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="08xxx"
                  className="mt-1 h-9 text-sm"
                  inputMode="tel"
                  maxLength={20}
                />
              </div>
              <div>
                <Label className="text-xs">Catatan (opsional)</Label>
                <Textarea
                  value={customerNote}
                  onChange={(e) => setCustomerNote(e.target.value)}
                  placeholder="cth: tolong dibungkus ya"
                  className="mt-1 min-h-[56px] text-sm"
                />
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Pajak ({taxPct}%)</span>
                <span className="tabular-nums">{formatCurrency(totals.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service ({servicePct}%)</span>
                <span className="tabular-nums">
                  {formatCurrency(totals.serviceChargeAmount)}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                <span className="text-sm font-semibold">Total</span>
                <PriceText
                  value={totals.grandTotal}
                  size="lg"
                  className="text-foreground"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border bg-background px-5 py-4">
            {formError && (
              <p className="mb-2 text-center text-[12px] text-destructive">
                {formError}
              </p>
            )}
            <Button
              className="w-full"
              size="lg"
              onClick={handleSubmit}
              disabled={items.length === 0 || submitting}
            >
              {submitting ? "Mengirim…" : "Kirim pesanan"}
              {!submitting && <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
