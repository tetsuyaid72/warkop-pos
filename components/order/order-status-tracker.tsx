"use client";

import {
  ORDER_STATUS_FLOW,
  ORDER_STATUS_META,
} from "@/constants/order-status";
import { formatCurrency } from "@/lib/format-currency";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { CustomerOrder } from "@/types/order";

function detailLine(item: { variant?: string; sugar?: string }) {
  const parts: string[] = [];
  if (item.variant) parts.push(item.variant === "hot" ? "Hot" : "Iced");
  if (item.sugar) {
    parts.push(
      item.sugar === "normal"
        ? "Normal Sugar"
        : item.sugar === "less"
          ? "Less Sugar"
          : "Tanpa Gula",
    );
  }
  return parts.join(" · ");
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return "baru saja";
  if (m === 1) return "1 menit lalu";
  return `${m} menit lalu`;
}

export function OrderStatusTracker({ order }: { order: CustomerOrder }) {
  const meta = ORDER_STATUS_META[order.status];
  const isRejected = order.status === "rejected";

  // Index of current status in the flow
  const currentIdx = isRejected
    ? -1
    : ORDER_STATUS_FLOW.indexOf(order.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
          <span className="mr-1.5 text-muted-foreground/60">/</span>{" "}
          {order.order_number}
        </p>
        <h1
          className="mt-2 font-display text-[1.9rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
        >
          {isRejected ? (
            <>
              Pesanan{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                ditolak
              </span>
            </>
          ) : (
            <>
              Pesanan kamu{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                lagi diproses
              </span>
            </>
          )}
        </h1>
        <p className="mt-3 text-pretty text-sm text-muted-foreground">
          {meta.description}
        </p>
      </div>

      {/* Progress tracker */}
      {!isRejected ? (
        <ol className="space-y-0 rounded-2xl border border-border bg-card p-1.5">
          {ORDER_STATUS_FLOW.map((status, i) => {
            const isDone = i < currentIdx || order.status === "served";
            const isCurrent = i === currentIdx;
            const sMeta = ORDER_STATUS_META[status];
            const Icon = sMeta.icon;
            return (
              <li
                key={status}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 transition-colors",
                  isCurrent && "bg-amber-50/70 dark:bg-amber-950/20",
                )}
              >
                <div
                  className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                    isDone
                      ? "border-amber-600 bg-amber-600 text-white"
                      : isCurrent
                        ? "border-amber-600 bg-background text-amber-700 dark:text-amber-300"
                        : "border-border bg-background text-muted-foreground/50",
                  )}
                >
                  {isDone ? (
                    <Check className="h-4 w-4" strokeWidth={2.5} />
                  ) : (
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-[13.5px] font-semibold leading-tight",
                      !isDone && !isCurrent && "text-muted-foreground",
                    )}
                  >
                    {sMeta.label}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    {isCurrent
                      ? isCurrent && order.estimated_minutes
                        ? `Estimasi ~${order.estimated_minutes} menit`
                        : "Sekarang"
                      : isDone
                        ? "Selesai"
                        : "Menunggu"}
                  </p>
                </div>
                {isCurrent && (
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-600" />
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="rounded-2xl border border-destructive/40 bg-destructive/5 p-5 text-center">
          <p className="text-sm font-medium text-destructive">
            Maaf, pesanan tidak dapat diproses.
          </p>
          {order.rejection_reason && (
            <p className="mt-2 text-[12.5px] text-muted-foreground">
              {order.rejection_reason}
            </p>
          )}
        </div>
      )}

      {/* Order details */}
      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Detail pesanan
            </p>
            <p className="mt-0.5 text-[13px] font-semibold">
              {order.customer_name ? `${order.customer_name} · ` : ""}
              Meja {order.table_number}
            </p>
          </div>
          <p className="text-[11.5px] text-muted-foreground">
            {timeAgo(order.created_at)}
          </p>
        </div>

        <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
          {order.items.map((item, idx) => (
            <li
              key={`${item.productId}-${idx}`}
              className="flex items-start justify-between gap-2 text-[13px]"
            >
              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {item.quantity}× {item.name}
                </p>
                {detailLine(item) && (
                  <p className="text-[11px] text-muted-foreground">
                    {detailLine(item)}
                  </p>
                )}
                {item.note && (
                  <p className="text-[11px] italic text-muted-foreground">
                    &ldquo;{item.note}&rdquo;
                  </p>
                )}
              </div>
              <span className="font-mono text-[12px] text-muted-foreground">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
          <span className="text-sm font-semibold">Total</span>
          <span
            className="font-display text-[1.3rem] font-medium tracking-tight"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
          >
            {formatCurrency(order.subtotal)}
          </span>
        </div>
        <p className="mt-1 text-[11px] text-muted-foreground">
          *Sudah termasuk pajak & service. Bayar di kasir.
        </p>
      </div>
    </div>
  );
}
