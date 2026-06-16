"use client";

import { useState, useMemo } from "react";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/stats-card";
import { PeriodFilter } from "@/components/reports/period-filter";
import { useTransactionStore } from "@/stores/transaction-store";
import { useProductStore } from "@/stores/product-store";
import { formatCurrency } from "@/lib/format-currency";
import { chartCurrencyFormatter } from "@/lib/chart-formatters";
import { DollarSign, ShoppingBag, TrendingUp, Coffee } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { isToday, isThisWeek, isThisMonth, startOfDay, format, subDays } from "date-fns";
import { id as idLocale } from "date-fns/locale";


export const dynamic = "force-dynamic";
const PAYMENT_COLORS = ["#5B3924", "#C98A40", "#7BA05B", "#A0522D"];

export default function ReportsPage() {
  const transactions = useTransactionStore((s) => s.transactions);
  const products = useProductStore((s) => s.products);
  const [period, setPeriod] = useState("today");

  const filteredTx = useMemo(() => {
    return transactions.filter((t) => {
      if (t.status !== "paid") return false;
      const d = new Date(t.createdAt);
      if (period === "today") return isToday(d);
      if (period === "week") return isThisWeek(d, { weekStartsOn: 1 });
      if (period === "month") return isThisMonth(d);
      return true;
    });
  }, [transactions, period]);

  const totalRevenue = filteredTx.reduce((s, t) => s + t.total, 0);
  const txCount = filteredTx.length;
  const avgTx = txCount > 0 ? totalRevenue / txCount : 0;

  const productSales = new Map<string, { name: string; sold: number; revenue: number }>();
  filteredTx.forEach((t) => {
    t.items.forEach((item) => {
      const existing = productSales.get(item.productId);
      const product = products.find((p) => p.id === item.productId);
      const name = product?.name ?? item.name;
      if (existing) {
        existing.sold += item.quantity;
        existing.revenue += item.quantity * item.price;
      } else {
        productSales.set(item.productId, { name, sold: item.quantity, revenue: item.quantity * item.price });
      }
    });
  });
  const topProducts = Array.from(productSales.entries())
    .map(([id, v]) => ({ id, ...v }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const categorySales = new Map<string, number>();
  filteredTx.forEach((t) => {
    t.items.forEach((item) => {
      const product = products.find((p) => p.id === item.productId);
      const cat = product?.category ?? "Lainnya";
      categorySales.set(cat, (categorySales.get(cat) ?? 0) + item.quantity * item.price);
    });
  });
  const categoryData = Array.from(categorySales.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);

  const paymentSales = new Map<string, number>();
  filteredTx.forEach((t) => {
    paymentSales.set(t.paymentMethod, (paymentSales.get(t.paymentMethod) ?? 0) + t.total);
  });
  const paymentData = Array.from(paymentSales.entries())
    .map(([name, value]) => ({
      name:
        name === "cash" ? "Tunai" : name === "qris" ? "QRIS" : name === "debit" ? "Debit" : "E-Wallet",
      value,
    }))
    .sort((a, b) => b.value - a.value);

  const dailyData = useMemo(() => {
    const days: { day: string; value: number }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = subDays(new Date(), i);
      const start = startOfDay(d);
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      const total = transactions
        .filter((t) => t.status === "paid")
        .filter((t) => {
          const td = new Date(t.createdAt);
          return td >= start && td < end;
        })
        .reduce((s, t) => s + t.total, 0);
      days.push({
        day: format(d, "EEE", { locale: idLocale }),
        value: total,
      });
    }
    return days;
  }, [transactions]);

  return (
    <ContentContainer>
      <PageHeader
        title="Laporan"
        description="Analisa penjualan Warung Coffee"
        actions={
          <PeriodFilter value={period} onChange={setPeriod} />
        }
      />

      <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
        <StatsCard
          title="Total Omzet"
          value={formatCurrency(totalRevenue)}
          icon={DollarSign}
        />
        <StatsCard
          title="Jumlah Transaksi"
          value={String(txCount)}
          icon={ShoppingBag}
        />
        <StatsCard
          title="Rata-rata"
          value={formatCurrency(avgTx)}
          icon={TrendingUp}
        />
        <StatsCard
          title="Menu Terlaris"
          value={topProducts[0]?.name ?? "-"}
          icon={Coffee}
          description={topProducts[0] ? `${topProducts[0].sold} terjual` : undefined}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Penjualan 7 Hari Terakhir</h3>
          <p className="text-xs text-muted-foreground">Tren omzet harian</p>
          <div className="mt-4 h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={chartCurrencyFormatter}
                />
                <Line type="monotone" dataKey="value" stroke="#5B3924" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Menu Terlaris</h3>
          <p className="text-xs text-muted-foreground">Top 5 berdasarkan revenue</p>
          <div className="mt-4 h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical" margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis dataKey="name" type="category" stroke="var(--muted-foreground)" fontSize={11} tickLine={false} axisLine={false} width={80} />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={chartCurrencyFormatter}
                />
                <Bar dataKey="revenue" fill="#5B3924" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Penjualan per Kategori</h3>
          <p className="text-xs text-muted-foreground">Revenue dikelompokkan</p>
          <div className="mt-4 h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={chartCurrencyFormatter}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((_, idx) => (
                    <Cell key={idx} fill={PAYMENT_COLORS[idx % PAYMENT_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Metode Pembayaran</h3>
          <p className="text-xs text-muted-foreground">Distribusi cara bayar</p>
          <div className="mt-4 h-56 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {paymentData.map((_, idx) => (
                    <Cell key={idx} fill={PAYMENT_COLORS[idx % PAYMENT_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "var(--popover)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={chartCurrencyFormatter}
                />
                <Legend
                  verticalAlign="bottom"
                  height={30}
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </ContentContainer>
  );
}