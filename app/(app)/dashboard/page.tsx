"use client";

import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { RecentTransactions } from "@/components/dashboard/recent-transactions";
import { BestSellerList } from "@/components/dashboard/best-seller-list";
import { useTransactionStore } from "@/stores/transaction-store";
import { useProductStore } from "@/stores/product-store";
import { formatCurrency } from "@/lib/format-currency";
import { DollarSign, ShoppingBag, Coffee, TrendingUp, Plus, FileBarChart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { isToday, parseISO } from "date-fns";


export const dynamic = "force-dynamic";
export default function DashboardPage() {
  const transactions = useTransactionStore((s) => s.transactions);
  const products = useProductStore((s) => s.products);

  const todayTx = transactions.filter((t) => isToday(parseISO(t.createdAt)) && t.status === "paid");
  const totalSalesToday = todayTx.reduce((sum, t) => sum + t.total, 0);
  const transactionCount = todayTx.length;
  const avgTransaction = transactionCount > 0 ? totalSalesToday / transactionCount : 0;

  const paidTx = transactions.filter((t) => t.status === "paid");
  const productSales = new Map<string, { name: string; sold: number; revenue: number }>();
  paidTx.forEach((t) => {
    t.items.forEach((item) => {
      const existing = productSales.get(item.productId);
      const product = products.find((p) => p.id === item.productId);
      const name = product?.name ?? item.name;
      if (existing) {
        existing.sold += item.quantity;
        existing.revenue += item.quantity * item.price;
      } else {
        productSales.set(item.productId, {
          name,
          sold: item.quantity,
          revenue: item.quantity * item.price,
        });
      }
    });
  });
  const bestSellers = Array.from(productSales.entries())
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  const hourlyMap = new Map<number, number>();
  for (let h = 8; h <= 21; h++) hourlyMap.set(h, 0);
  todayTx.forEach((t) => {
    const h = parseISO(t.createdAt).getHours();
    hourlyMap.set(h, (hourlyMap.get(h) ?? 0) + t.total);
  });
  const hourlyData = Array.from(hourlyMap.entries()).map(([hour, value]) => ({
    hour: `${String(hour).padStart(2, "0")}:00`,
    value,
  }));

  const recent = transactions.slice(0, 5);

  return (
    <ContentContainer>
      <PageHeader
        title="Dashboard"
        description="Ringkasan performa Warung Coffee hari ini"
        actions={
          <>
            <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
              <Link href="/reports">
                <FileBarChart className="h-4 w-4" />
                Laporan
              </Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/pos">
                <ShoppingCart className="h-4 w-4" />
                Buka Kasir
              </Link>
            </Button>
          </>
        }
      />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatsCard
          title="Penjualan Hari Ini"
          value={formatCurrency(totalSalesToday)}
          icon={DollarSign}
          description={`${transactionCount} transaksi`}
          trend="+12%"
          trendUp
        />
        <StatsCard
          title="Jumlah Transaksi"
          value={String(transactionCount)}
          icon={ShoppingBag}
          description="hari ini"
        />
        <StatsCard
          title="Rata-rata Transaksi"
          value={formatCurrency(avgTransaction)}
          icon={TrendingUp}
          description="per struk"
        />
        <StatsCard
          title="Menu Terlaris"
          value={bestSellers[0]?.name ?? "-"}
          icon={Coffee}
          description={bestSellers[0] ? `${bestSellers[0].sold} terjual` : undefined}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-4">
        <div className="lg:col-span-2">
          <SalesChart data={hourlyData} />
        </div>
        <BestSellerList items={bestSellers} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RecentTransactions transactions={recent} />
        </div>
        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Aksi Cepat</h3>
          <p className="text-xs text-muted-foreground">Pintasan harian</p>
          <div className="mt-3 grid grid-cols-1 gap-2">
            <Button asChild variant="outline" className="justify-start">
              <Link href="/pos">
                <ShoppingCart className="h-4 w-4" />
                Buka Kasir / POS
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/products">
                <Plus className="h-4 w-4" />
                Tambah Menu
              </Link>
            </Button>
            <Button asChild variant="outline" className="justify-start">
              <Link href="/reports">
                <FileBarChart className="h-4 w-4" />
                Lihat Laporan
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </ContentContainer>
  );
}