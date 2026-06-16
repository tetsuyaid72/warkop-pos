"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { Transaction } from "@/types/transaction";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { useSettingStore } from "@/stores/setting-store";

const paymentLabel: Record<string, string> = {
  cash: "Tunai",
  qris: "QRIS",
  debit: "Debit",
  ewallet: "E-Wallet",
};

const orderTypeLabel: Record<string, string> = {
  "dine-in": "Dine In",
  "take-away": "Take Away",
  delivery: "Delivery",
};

export function ReceiptPreview({
  transaction,
  open,
  onOpenChange,
}: {
  transaction: Transaction | null;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const outlet = useSettingStore((s) => s.settings);
  if (!transaction) return null;

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title="Struk Pembayaran"
        description={transaction.invoiceNumber}
        className="max-w-sm"
      >
        <div className="rounded-xl border border-border bg-background p-4 font-mono text-xs leading-relaxed">
          <div className="text-center">
            <p className="text-sm font-bold">{outlet.outletName}</p>
            <p className="text-[10px] text-muted-foreground">{outlet.outletAddress}</p>
            <p className="text-[10px] text-muted-foreground">{outlet.outletPhone}</p>
          </div>
          <Separator className="my-2 border-dashed" />
          <div className="space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>No</span>
              <span>{transaction.invoiceNumber}</span>
            </div>
            <div className="flex justify-between">
              <span>Tgl</span>
              <span>
                {format(new Date(transaction.createdAt), "dd/MM/yy HH:mm", { locale: idLocale })}
              </span>
            </div>
            {transaction.customerName && (
              <div className="flex justify-between">
                <span>Cust</span>
                <span>{transaction.customerName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tipe</span>
              <span>{orderTypeLabel[transaction.orderType]}</span>
            </div>
          </div>
          <Separator className="my-2 border-dashed" />
          <div className="space-y-1.5">
            {transaction.items.map((item) => (
              <div key={item.id}>
                <div className="flex justify-between">
                  <span className="flex-1">
                    {item.name}
                    {item.variant === "hot" ? " (H)" : item.variant === "iced" ? " (I)" : ""}
                  </span>
                  <span className="ml-2">{item.quantity}x</span>
                </div>
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span>@ {item.price.toLocaleString("id-ID")}</span>
                  <span>{(item.price * item.quantity).toLocaleString("id-ID")}</span>
                </div>
              </div>
            ))}
          </div>
          <Separator className="my-2 border-dashed" />
          <div className="space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{transaction.subtotal.toLocaleString("id-ID")}</span>
            </div>
            {transaction.discount > 0 && (
              <div className="flex justify-between">
                <span>Diskon</span>
                <span>-{transaction.discount.toLocaleString("id-ID")}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Pajak</span>
              <span>{transaction.tax.toLocaleString("id-ID")}</span>
            </div>
            <div className="flex justify-between">
              <span>Service</span>
              <span>{transaction.serviceCharge.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <Separator className="my-2 border-dashed" />
          <div className="flex justify-between text-sm font-bold">
            <span>TOTAL</span>
            <span>Rp {transaction.total.toLocaleString("id-ID")}</span>
          </div>
          <div className="mt-1 space-y-0.5 text-[10px]">
            <div className="flex justify-between">
              <span>Bayar ({paymentLabel[transaction.paymentMethod]})</span>
              <span>{(transaction.paidAmount ?? transaction.total).toLocaleString("id-ID")}</span>
            </div>
            {transaction.changeAmount !== undefined && (
              <div className="flex justify-between">
                <span>Kembali</span>
                <span>{transaction.changeAmount.toLocaleString("id-ID")}</span>
              </div>
            )}
          </div>
          <Separator className="my-2 border-dashed" />
          <div className="text-center text-[10px] text-muted-foreground">
            <p>Terima kasih atas kunjungannya!</p>
            <p>~ Warung Coffee ~</p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4" />
            Print
          </Button>
          <Button onClick={() => onOpenChange(false)}>Tutup</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}