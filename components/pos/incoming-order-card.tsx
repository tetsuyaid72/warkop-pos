"use client";

import { useState } from "react";
import { Check, X, Coffee, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { PriceText } from "@/components/shared/price-text";
import { useIncomingOrdersStore } from "@/stores/incoming-orders-store";
import { useCartStore } from "@/stores/cart-store";
import { useToast } from "@/components/ui/toast";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import type { CustomerOrder, OrderItem } from "@/types/order";

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru";
  if (m === 1) return "1 mnt";
  return `${m} mnt`;
}

function detailLine(i: { variant?: string; sugar?: string }) {
  const parts: string[] = [];
  if (i.variant) parts.push(i.variant === "hot" ? "Hot" : "Iced");
  if (i.sugar) {
    parts.push(
      i.sugar === "normal"
        ? "Normal"
        : i.sugar === "less"
          ? "Less"
          : "Tanpa",
    );
  }
  return parts.join(" · ");
}

const STATUS_BADGE: Record<CustomerOrder["status"], { label: string; tone: string }> = {
  pending: { label: "Masuk", tone: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  accepted: { label: "Diterima", tone: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  preparing: { label: "Disiapkan", tone: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300" },
  served: { label: "Selesai", tone: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" },
  rejected: { label: "Ditolak", tone: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" },
};

export function IncomingOrderCard({ order }: { order: CustomerOrder }) {
  const { toast } = useToast();
  const removeOrder = useIncomingOrdersStore((s) => s.removeOrder);
  const upsertOrder = useIncomingOrdersStore((s) => s.upsertOrder);
  const [busy, setBusy] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [expanded, setExpanded] = useState(false);

  const setCustomerName = useCartStore((s) => s.setCustomerName);
  const setNote = useCartStore((s) => s.setNote);
  const clearCart = useCartStore((s) => s.clearCart);
  const addItem = useCartStore((s) => s.addItem);

  const badge = STATUS_BADGE[order.status];

  const updateStatus = async (
    status: CustomerOrder["status"],
    extra?: { estimated_minutes?: number; rejection_reason?: string },
  ) => {
    if (!isSupabaseConfigured()) return;
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase
        .from("orders")
        .update({
          status,
          ...(extra ?? {}),
          updated_at: new Date().toISOString(),
        } as never)
        .eq("id", order.id);
      if (error) throw error;
      // Log event
      void supabase.from("order_events").insert({
        order_id: order.id,
        event_type: status,
        payload: extra ?? {},
      } as never);
      // Optimistic local update — the realtime subscription will also sync
      upsertOrder({ ...order, status, ...extra });
    } catch (err) {
      console.error(err);
      toast({ type: "error", title: "Gagal update pesanan" });
    } finally {
      setBusy(false);
    }
  };

  const handleAccept = async () => {
    // Move items to active cart
    clearCart();
    if (order.customer_name) setCustomerName(order.customer_name);
    if (order.customer_note) setNote(order.customer_note);
    order.items.forEach((item: OrderItem) => {
      addItem({
        productId: item.productId,
        name: item.name,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
        variant: item.variant,
        sugar: item.sugar,
        addons: item.addons,
        note: item.note,
      });
    });
    await updateStatus("accepted", { estimated_minutes: 5 });
    removeOrder(order.id);
    toast({
      type: "success",
      title: "Pesanan diterima",
      description: `${order.order_number} · masuk ke keranjang`,
    });
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({ type: "error", title: "Alasan wajib diisi" });
      return;
    }
    await updateStatus("rejected", { rejection_reason: rejectionReason.trim() });
    setRejectOpen(false);
    removeOrder(order.id);
    toast({ type: "info", title: "Pesanan ditolak" });
  };

  const handleAdvance = async () => {
    if (order.status === "accepted") {
      await updateStatus("preparing");
    } else if (order.status === "preparing") {
      await updateStatus("served");
    }
  };

  return (
    <div
      className={cn(
        "rounded-xl border bg-card p-3 transition-colors",
        order.status === "pending"
          ? "border-amber-300/60 bg-amber-50/30 dark:border-amber-700/40 dark:bg-amber-950/10"
          : "border-border",
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="min-w-0 flex-1 text-left"
        >
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "rounded-full px-2 py-0.5 font-mono text-[9.5px] font-bold uppercase tracking-[0.14em]",
                badge.tone,
              )}
            >
              {badge.label}
            </span>
            <span className="font-mono text-[10px] text-muted-foreground">
              {order.order_number}
            </span>
          </div>
          <p className="mt-1.5 text-[13.5px] font-semibold leading-tight">
            Meja {order.table_number}
            {order.customer_name && (
              <span className="ml-1.5 font-normal text-muted-foreground">
                · {order.customer_name}
              </span>
            )}
          </p>
          <p className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            {order.items.length} item · {timeAgo(order.created_at)}
          </p>
        </button>
        <div className="text-right">
          <PriceText
            value={order.subtotal}
            size="sm"
            className="text-foreground"
          />
        </div>
      </div>

      {expanded && (
        <ul className="mt-2.5 space-y-1.5 border-t border-border pt-2.5">
          {order.items.map((item, idx) => (
            <li
              key={`${item.productId}-${idx}`}
              className="flex items-start gap-2 text-[12.5px]"
            >
              <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400">
                ×{item.quantity}
              </span>
              <span className="flex-1">
                {item.name}
                {detailLine(item) && (
                  <span className="text-muted-foreground">
                    {" "}
                    · {detailLine(item)}
                  </span>
                )}
                {item.note && (
                  <span className="block text-[11px] italic text-muted-foreground">
                    &ldquo;{item.note}&rdquo;
                  </span>
                )}
              </span>
            </li>
          ))}
          {order.customer_note && (
            <li className="rounded-lg bg-muted/40 px-2.5 py-1.5 text-[11.5px] italic text-muted-foreground">
              Catatan: {order.customer_note}
            </li>
          )}
        </ul>
      )}

      <div className="mt-2.5 flex flex-wrap items-center gap-2">
        {order.status === "pending" && (
          <>
            <Button
              size="sm"
              onClick={handleAccept}
              disabled={busy}
              className="flex-1"
            >
              <Check className="h-3.5 w-3.5" />
              Terima
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setRejectOpen(true)}
              disabled={busy}
              className="text-destructive hover:bg-destructive/10"
            >
              <X className="h-3.5 w-3.5" />
              Tolak
            </Button>
          </>
        )}
        {order.status === "accepted" && (
          <Button
            size="sm"
            variant="outline"
            onClick={handleAdvance}
            disabled={busy}
            className="flex-1"
          >
            <Coffee className="h-3.5 w-3.5" />
            Mulai siapkan
            <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        )}
        {order.status === "preparing" && (
          <Button
            size="sm"
            onClick={handleAdvance}
            disabled={busy}
            className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700"
          >
            <Check className="h-3.5 w-3.5" />
            Selesai & antar
          </Button>
        )}
      </div>

      <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
        <DialogContent
          title="Tolak pesanan"
          description={`${order.order_number} · Meja ${order.table_number}`}
          className="max-w-sm"
        >
          <div>
            <Label className="text-xs">Alasan penolakan</Label>
            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="cth: stok habis, akan diinfokan oleh kasir"
              className="mt-1.5 min-h-[80px] text-sm"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectOpen(false)}>
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={busy}
            >
              Tolak pesanan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Keep Input import for potential future use
void Input;
