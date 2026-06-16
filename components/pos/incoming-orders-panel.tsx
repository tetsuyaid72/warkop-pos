"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, Bell, BellOff } from "lucide-react";
import { IncomingOrderCard } from "./incoming-order-card";
import { useIncomingOrdersStore } from "@/stores/incoming-orders-store";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { playNewOrderBeep } from "./order-notification-sound";
import { cn } from "@/lib/utils";
import type { CustomerOrder, Outlet } from "@/types/order";

export function IncomingOrdersPanel() {
  const outlet = useIncomingOrdersStore((s) => s.outlet);
  const orders = useIncomingOrdersStore((s) => s.orders);
  const setOutlet = useIncomingOrdersStore((s) => s.setOutlet);
  const setOrders = useIncomingOrdersStore((s) => s.setOrders);
  const upsertOrder = useIncomingOrdersStore((s) => s.upsertOrder);
  const [expanded, setExpanded] = useState(true);
  const [muted, setMuted] = useState(false);
  const [ready, setReady] = useState(false);

  // Fetch outlet + today's orders, then subscribe to realtime.
  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setReady(true);
      return;
    }
    let cancelled = false;
    const supabase = getSupabase();

    (async () => {
      const { data: outletData, error: outletErr } = await supabase
        .from("outlets")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: true })
        .limit(1)
        .maybeSingle();
      if (cancelled) return;
      if (outletErr) {
        setReady(true);
        return;
      }
      if (!outletData) {
        setReady(true);
        return;
      }
      const outletRow = outletData as unknown as Outlet;
      setOutlet(outletRow);

      // Fetch existing pending/accepted/preparing orders for today
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const { data: orderData, error: orderErr } = await supabase
        .from("orders")
        .select("*")
        .eq("outlet_id", outletRow.id)
        .in("status", ["pending", "accepted", "preparing"])
        .gte("created_at", startOfDay.toISOString())
        .order("created_at", { ascending: false });
      if (cancelled) return;
      if (!orderErr && orderData) {
        setOrders(orderData as unknown as CustomerOrder[]);
      }
      setReady(true);
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Realtime subscription
  useEffect(() => {
    if (!outlet) return;
    if (!isSupabaseConfigured()) return;
    const supabase = getSupabase();
    const channel = supabase
      .channel(`outlet-${outlet.id}-orders`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "orders",
          filter: `outlet_id=eq.${outlet.id}`,
        },
        (payload) => {
          const order = payload.new as CustomerOrder;
          if (order.status === "pending") {
            upsertOrder(order);
            if (!muted) playNewOrderBeep();
          }
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `outlet_id=eq.${outlet.id}`,
        },
        (payload) => {
          const order = payload.new as CustomerOrder;
          // Hide from panel when served/rejected
          if (order.status === "served" || order.status === "rejected") {
            useIncomingOrdersStore
              .getState()
              .removeOrder(order.id);
            return;
          }
          upsertOrder(order);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [outlet, muted, upsertOrder]);

  if (!ready) return null;
  if (!isSupabaseConfigured()) return null;
  if (!outlet) return null;

  const pendingCount = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="border-b border-border bg-background">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3"
      >
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "relative flex h-7 w-7 items-center justify-center rounded-full",
              pendingCount > 0
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                : "bg-muted text-muted-foreground",
            )}
          >
            <Bell className="h-3.5 w-3.5" strokeWidth={2} />
            {pendingCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-mono text-[9px] font-bold text-white">
                {pendingCount}
              </span>
            )}
          </span>
          <div className="text-left">
            <p className="text-[12.5px] font-semibold leading-tight">
              Pesanan QR masuk
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {orders.length === 0
                ? "Belum ada"
                : `${orders.length} aktif · ${pendingCount} menunggu`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setMuted((v) => !v);
            }}
            className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={muted ? "Aktifkan suara" : "Matikan suara"}
          >
            {muted ? (
              <BellOff className="h-3.5 w-3.5" />
            ) : (
              <Bell className="h-3.5 w-3.5" />
            )}
          </button>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {expanded && orders.length > 0 && (
        <div className="space-y-2 border-t border-border px-3 pb-3 pt-3 sm:px-4">
          {orders.map((order) => (
            <IncomingOrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
}
