"use client";

import { useState, useMemo } from "react";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SearchInput } from "@/components/pos/search-input";
import { EmptyState } from "@/components/shared/empty-state";
import { StatusBadge } from "@/components/shared/status-badge";
import { PriceText } from "@/components/shared/price-text";
import { ReceiptPreview } from "@/components/shared/receipt-preview";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { useTransactionStore } from "@/stores/transaction-store";
import { useToast } from "@/components/ui/toast";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { Receipt, Printer, Ban, RefreshCcw, X } from "lucide-react";
import type { OrderType, PaymentMethod, Transaction, TransactionStatus } from "@/types/transaction";
import { cn } from "@/lib/utils";


export const dynamic = "force-dynamic";
const paymentLabel: Record<PaymentMethod, string> = {
  cash: "Tunai",
  qris: "QRIS",
  debit: "Debit",
  ewallet: "E-Wallet",
};

const orderTypeLabel: Record<OrderType, string> = {
  "dine-in": "Dine In",
  "take-away": "Take Away",
  delivery: "Delivery",
};

export default function TransactionsPage() {
  const transactions = useTransactionStore((s) => s.transactions);
  const cancelTransaction = useTransactionStore((s) => s.cancelTransaction);
  const refundTransaction = useTransactionStore((s) => s.refundTransaction);
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [paymentFilter, setPaymentFilter] = useState<PaymentMethod | "all">("all");
  const [orderTypeFilter, setOrderTypeFilter] = useState<OrderType | "all">("all");
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "all">("all");
  const [previewTx, setPreviewTx] = useState<Transaction | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState<Transaction | null>(null);
  const [confirmRefund, setConfirmRefund] = useState<Transaction | null>(null);

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (search) {
        const q = search.toLowerCase();
        const matchInv = t.invoiceNumber.toLowerCase().includes(q);
        const matchCust = (t.customerName ?? "").toLowerCase().includes(q);
        if (!matchInv && !matchCust) return false;
      }
      if (date) {
        const txDate = format(new Date(t.createdAt), "yyyy-MM-dd");
        if (txDate !== date) return false;
      }
      if (paymentFilter !== "all" && t.paymentMethod !== paymentFilter) return false;
      if (orderTypeFilter !== "all" && t.orderType !== orderTypeFilter) return false;
      if (statusFilter !== "all" && t.status !== statusFilter) return false;
      return true;
    });
  }, [transactions, search, date, paymentFilter, orderTypeFilter, statusFilter]);

  const handleCancel = () => {
    if (!confirmCancel) return;
    cancelTransaction(confirmCancel.id);
    toast({ type: "warning", title: "Transaksi dibatalkan", description: confirmCancel.invoiceNumber });
    setConfirmCancel(null);
  };

  const handleRefund = () => {
    if (!confirmRefund) return;
    refundTransaction(confirmRefund.id);
    toast({ type: "info", title: "Transaksi direfund", description: confirmRefund.invoiceNumber });
    setConfirmRefund(null);
  };

  const resetFilters = () => {
    setSearch("");
    setDate("");
    setPaymentFilter("all");
    setOrderTypeFilter("all");
    setStatusFilter("all");
  };

  const filterCount =
    (search ? 1 : 0) + (date ? 1 : 0) + (paymentFilter !== "all" ? 1 : 0) + (orderTypeFilter !== "all" ? 1 : 0) + (statusFilter !== "all" ? 1 : 0);

  return (
    <ContentContainer>
      <PageHeader
        title="Riwayat Transaksi"
        description={`${filtered.length} dari ${transactions.length} transaksi`}
        actions={
          filterCount > 0 ? (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <X className="h-3.5 w-3.5" />
              Reset Filter
            </Button>
          ) : null
        }
      />

      <Card className="mt-5 p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <SearchInput value={search} onChange={setSearch} placeholder="Cari invoice / nama..." />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 text-sm"
          />
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value as PaymentMethod | "all")}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">Semua Pembayaran</option>
            <option value="cash">Tunai</option>
            <option value="qris">QRIS</option>
            <option value="debit">Debit</option>
            <option value="ewallet">E-Wallet</option>
          </select>
          <select
            value={orderTypeFilter}
            onChange={(e) => setOrderTypeFilter(e.target.value as OrderType | "all")}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">Semua Tipe</option>
            <option value="dine-in">Dine In</option>
            <option value="take-away">Take Away</option>
            <option value="delivery">Delivery</option>
          </select>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {(["all", "paid", "cancelled", "refunded"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s as TransactionStatus | "all")}
              className={cn(
                "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                statusFilter === s
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {s === "all" ? "Semua Status" : s === "paid" ? "Lunas" : s === "cancelled" ? "Batal" : "Refund"}
            </button>
          ))}
        </div>
      </Card>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState
            title="Tidak ada transaksi"
            description="Coba ubah filter atau buat transaksi baru"
            icon={Receipt}
            className="rounded-xl border border-dashed border-border py-12"
          />
        ) : (
          <Card className="overflow-hidden p-0">
            <div className="divide-y divide-border">
              {filtered.map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:gap-3 sm:p-4"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-sm font-semibold">{t.invoiceNumber}</p>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {format(new Date(t.createdAt), "dd MMM yyyy · HH:mm", { locale: idLocale })} ·{" "}
                      {t.customerName || "Pelanggan"} · {orderTypeLabel[t.orderType]} ·{" "}
                      {paymentLabel[t.paymentMethod]} · {t.items.length} item
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-2 sm:justify-end">
                    <PriceText value={t.total} size="sm" className="sm:hidden" />
                    <div className="flex items-center gap-1">
                      <PriceText value={t.total} size="sm" className="hidden sm:inline" />
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => {
                          setPreviewTx(t);
                          setPreviewOpen(true);
                        }}
                      >
                        <Printer className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Struk</span>
                      </Button>
                      {t.status === "paid" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => setConfirmRefund(t)}
                            title="Refund"
                          >
                            <RefreshCcw className="h-3.5 w-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-destructive hover:text-destructive"
                            onClick={() => setConfirmCancel(t)}
                            title="Batal"
                          >
                            <Ban className="h-3.5 w-3.5" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      <ReceiptPreview
        transaction={previewTx}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />

      <ConfirmDialog
        open={!!confirmCancel}
        onOpenChange={(v) => !v && setConfirmCancel(null)}
        title="Batalkan transaksi?"
        description={`Transaksi ${confirmCancel?.invoiceNumber} akan dibatalkan.`}
        confirmText="Batalkan"
        onConfirm={handleCancel}
      />
      <ConfirmDialog
        open={!!confirmRefund}
        onOpenChange={(v) => !v && setConfirmRefund(null)}
        title="Refund transaksi?"
        description={`Transaksi ${confirmRefund?.invoiceNumber} akan di-refund.`}
        confirmText="Refund"
        onConfirm={handleRefund}
        variant="default"
      />
    </ContentContainer>
  );
}