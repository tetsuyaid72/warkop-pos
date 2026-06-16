"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Coffee, AlertCircle, Search } from "lucide-react";
import { useProductStore } from "@/stores/product-store";
import { useCategoryStore } from "@/stores/category-store";
import { useSettingStore } from "@/stores/setting-store";
import type { Outlet, OrderItem, CustomerOrder } from "@/types/order";
import type { Product } from "@/types/product";
import { CategoryChips } from "@/components/order/category-chips";
import { ProductGridCustomer } from "@/components/order/product-grid-customer";
import { ProductDetailSheet } from "@/components/order/product-detail-sheet";
import { FloatingCartBar } from "@/components/order/floating-cart-bar";
import { CartSheet } from "@/components/order/cart-sheet";
import { CatalogHero } from "@/components/order/catalog-hero";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EmptyState } from "@/components/shared/empty-state";
import { calculateOrderTotals } from "@/lib/order-totals";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  generateOrderNumber,
  orderNumberDatePrefix,
} from "@/lib/generate-order-number";
import { useToast } from "@/components/ui/toast";

export function OrderCatalog({
  outlet,
  slug,
  token,
}: {
  outlet: Outlet | null;
  slug?: string;
  token?: string;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories).filter(
    (c) => c.isActive,
  );
  const settings = useSettingStore((s) => s.settings);

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [cart, setCart] = useState<OrderItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Default tax/service from outlet config; fallback to local settings.
  const taxPct = outlet?.tax_percentage ?? settings.taxPercentage;
  const servicePct =
    outlet?.service_charge_percentage ?? settings.serviceChargePercentage;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (!p.isAvailable) return false;
      if (
        activeCategory !== "all" &&
        p.category !== activeCategory
      )
        return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [products, activeCategory, search]);

  const totals = useMemo(
    () => calculateOrderTotals(cart, taxPct, servicePct),
    [cart, taxPct, servicePct],
  );

  const handleProductTap = (p: Product) => {
    setSelected(p);
    setDetailOpen(true);
  };

  const handleAddToCart = (item: OrderItem) => {
    setCart((prev) => {
      // Try to merge with same product+variant+sugar+addons+note
      const key = (i: OrderItem) =>
        `${i.productId}|${i.variant ?? ""}|${i.sugar ?? ""}|${(i.addons ?? [])
          .map((a) => a.id)
          .join(",")}|${i.note ?? ""}`;
      const existingIdx = prev.findIndex((i) => key(i) === key(item));
      if (existingIdx >= 0) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + item.quantity,
        };
        return next;
      }
      return [...prev, item];
    });
    toast({
      type: "success",
      title: "Ditambahkan",
      description: item.name,
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCart((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleUpdateQty = (idx: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((i, k) => (k === idx ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0),
    );
  };

  const handleSubmit = async (form: {
    customerName: string;
    tableNumber: string;
    customerPhone?: string;
    customerNote?: string;
  }) => {
    if (!outlet) {
      toast({
        type: "error",
        title: "Outlet tidak valid",
        description: "QR yang kamu scan sepertinya sudah tidak aktif.",
      });
      return;
    }
    if (cart.length === 0) return;
    if (!isSupabaseConfigured()) {
      toast({
        type: "error",
        title: "Server belum siap",
        description: "Hubungi owner warung untuk setup Supabase.",
      });
      return;
    }
    setSubmitting(true);
    try {
      const supabase = getSupabase();
      // Find today's count for this outlet to generate a number
      const prefix = orderNumberDatePrefix();
      const { count, error: countErr } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("outlet_id", outlet.id)
        .like("order_number", `${prefix}%`);
      if (countErr) throw countErr;
      const orderNumber = generateOrderNumber(count ?? 0);

      const insertPayload = {
        outlet_id: outlet.id,
        order_number: orderNumber,
        table_number: form.tableNumber.trim() || null,
        customer_name: form.customerName.trim() || null,
        customer_phone: form.customerPhone?.trim() || null,
        customer_note: form.customerNote?.trim() || null,
        items: cart,
        subtotal: totals.grandTotal,
        status: "pending",
      } as never;

      const { data, error } = await supabase
        .from("orders")
        .insert(insertPayload)
        .select("id, order_number")
        .single();
      if (error) throw error;

      // Fire-and-forget event log
      void supabase.from("order_events").insert({
        order_id: (data as Pick<CustomerOrder, "id">).id,
        event_type: "created",
        payload: { source: "qr-catalog" },
      } as never);

      const order = data as Pick<CustomerOrder, "id" | "order_number">;
      router.push(
        `/order/${order.id}?n=${encodeURIComponent(order.order_number)}`,
      );
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        title: "Gagal mengirim pesanan",
        description: "Coba lagi, atau hubungi kasir.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Empty state — QR invalid
  if (!outlet) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-amber-50/40 via-background to-background p-6 text-center dark:from-amber-950/20">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-900/30">
          <AlertCircle className="h-8 w-8 text-amber-700 dark:text-amber-300" />
        </div>
        <h1
          className="mt-6 font-display text-[1.8rem] leading-tight tracking-[-0.02em]"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
        >
          QR tidak valid
        </h1>
        <p className="mt-3 max-w-sm text-pretty text-sm text-muted-foreground">
          QR yang kamu scan tidak dikenali. Pastikan kamu scan QR yang ada di
          meja warung, atau tanyakan ke kasir.
        </p>
        {slug && (
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground/60">
            slug: {slug} · token: {token?.slice(0, 6)}…
          </p>
        )}
        <Button asChild variant="outline" className="mt-8">
          <Link href="/">Kembali ke beranda</Link>
        </Button>
      </div>
    );
  }

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-amber-50/50 via-background to-background pb-32 dark:from-amber-950/15">
      {/* Sticky minimal header */}
      <header className="sticky top-0 z-30 border-b border-border/60 bg-background/90 backdrop-blur-xl">
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
                {outlet.name}
              </div>
              <div className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Pesan dari meja
              </div>
            </div>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 sm:px-5">
        <CatalogHero outletName={outlet.name} />

        {/* Search */}
        <div className="mt-6">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari kopi favoritmu…"
              className="h-11 pl-10"
            />
          </div>
        </div>

        {/* Category chips */}
        <div className="mt-4">
          <CategoryChips
            categories={categories}
            active={activeCategory}
            onChange={setActiveCategory}
          />
        </div>

        {/* Products */}
        <div className="mt-5">
          {filtered.length === 0 ? (
            <EmptyState
              title="Menu tidak ditemukan"
              description={
                search
                  ? "Coba kata kunci lain, atau hapus pencarian."
                  : "Belum ada menu di kategori ini."
              }
              icon={Search}
              className="rounded-2xl border border-dashed border-border py-12"
            />
          ) : (
            <ProductGridCustomer products={filtered} onTap={handleProductTap} />
          )}
        </div>

        {/* Tax/service note */}
        <div className="mt-6 rounded-xl border border-dashed border-border bg-muted/20 p-3 text-[11.5px] text-muted-foreground">
          <p>
            Harga sudah termasuk pajak ({taxPct}%) dan service charge (
            {servicePct}%). Bayar di kasir setelah pesanan selesai.
          </p>
        </div>
      </div>

      <FloatingCartBar
        count={cartCount}
        total={totals.grandTotal}
        onOpen={() => setCartOpen(true)}
        hidden={cart.length === 0}
      />

      <ProductDetailSheet
        product={selected}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onAdd={(item) => {
          handleAddToCart(item);
          setDetailOpen(false);
        }}
      />

      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart}
        taxPct={taxPct}
        servicePct={servicePct}
        onRemove={handleRemoveItem}
        onUpdateQty={handleUpdateQty}
        totals={totals}
        onSubmit={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
}
