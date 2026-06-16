"use client";

import { useEffect, useState } from "react";
import { use } from "react";
import { OrderStatusTracker } from "@/components/order/order-status-tracker";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { AlertCircle, Coffee } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { CustomerOrder } from "@/types/order";

export default function OrderStatusPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<CustomerOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setError("Server belum dikonfigurasi.");
      setLoading(false);
      return;
    }
    let cancelled = false;
    const supabase = getSupabase();

    (async () => {
      const { data, error: fetchErr } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();
      if (cancelled) return;
      if (fetchErr) {
        setError("Pesanan tidak ditemukan");
      } else {
        setOrder((data as CustomerOrder | null) ?? null);
      }
      setLoading(false);
    })();

    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "orders",
          filter: `id=eq.${orderId}`,
        },
        (payload) => {
          if (cancelled) return;
          setOrder((payload.new as CustomerOrder) ?? null);
        },
      )
      .subscribe();

    return () => {
      cancelled = true;
      supabase.removeChannel(channel);
    };
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/40 via-background to-background dark:from-amber-950/15">
      <header className="border-b border-border/60 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground">
              <Coffee className="h-4 w-4 text-background" strokeWidth={1.8} />
            </span>
            <div className="leading-none">
              <div
                className="font-display text-[15px] font-medium tracking-tight"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                Status pesanan
              </div>
            </div>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
        {loading ? (
          <div className="text-center text-sm text-muted-foreground">
            Memuat…
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-dashed border-border bg-card p-8 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
            <h2
              className="mt-4 font-display text-[1.4rem] tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
            >
              {error}
            </h2>
            <Button asChild variant="outline" className="mt-6">
              <Link href="/">Kembali ke beranda</Link>
            </Button>
          </div>
        ) : order ? (
          <OrderStatusTracker order={order} />
        ) : null}
      </div>
    </div>
  );
}
