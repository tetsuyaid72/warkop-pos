"use client";

import Link from "next/link";
import { Receipt } from "lucide-react";

export function RecentTransactions({
  transactions,
}: {
  transactions: {
    id: string;
    invoiceNumber: string;
    customerName?: string;
    total: number;
    status: string;
    createdAt: string;
  }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold sm:text-base">Transaksi Terbaru</h3>
          <p className="text-xs text-muted-foreground">Aktivitas kasir terkini</p>
        </div>
        <Link
          href="/transactions"
          className="text-xs font-medium text-primary hover:underline"
        >
          Lihat semua
        </Link>
      </div>
      <div className="mt-3 space-y-2">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-lg border border-dashed border-border py-8">
            <Receipt className="h-6 w-6 text-muted-foreground" />
            <p className="text-xs text-muted-foreground">Belum ada transaksi</p>
          </div>
        ) : (
          transactions.map((t) => (
            <div
              key={t.id}
              className="flex items-center justify-between gap-3 rounded-lg border border-border p-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{t.invoiceNumber}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {t.customerName || "Pelanggan"}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums text-primary">
                Rp {t.total.toLocaleString("id-ID")}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}