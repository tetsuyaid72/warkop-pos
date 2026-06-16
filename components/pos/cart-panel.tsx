"use client";

import { useState } from "react";
import { ShoppingCart, Receipt, CreditCard, Banknote, Smartphone, Wallet, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { EmptyState } from "@/components/shared/empty-state";
import { PriceText } from "@/components/shared/price-text";
import { CartItemRow } from "./cart-item-row";
import { useCartStore } from "@/stores/cart-store";
import { useSettingStore } from "@/stores/setting-store";
import { useTransactionStore } from "@/stores/transaction-store";
import { calculateOrder } from "@/lib/calculate-order";
import { generateInvoiceNumber } from "@/lib/generate-invoice";
import { formatCurrency } from "@/lib/format-currency";
import { useToast } from "@/components/ui/toast";
import type { CartItem, OrderType, PaymentMethod } from "@/types/transaction";
import type { Product } from "@/types/product";
import { cn } from "@/lib/utils";

const orderTypeOptions = [
  { value: "dine-in" as OrderType, label: "Dine In", icon: <Receipt className="h-4 w-4" /> },
  { value: "take-away" as OrderType, label: "Take Away", icon: <ShoppingCart className="h-4 w-4" /> },
  { value: "delivery" as OrderType, label: "Delivery", icon: <Smartphone className="h-4 w-4" /> },
];

const paymentOptions = [
  { value: "cash" as PaymentMethod, label: "Cash", icon: <Banknote className="h-4 w-4" /> },
  { value: "qris" as PaymentMethod, label: "QRIS", icon: <Smartphone className="h-4 w-4" /> },
  { value: "debit" as PaymentMethod, label: "Debit", icon: <CreditCard className="h-4 w-4" /> },
  { value: "ewallet" as PaymentMethod, label: "E-Wallet", icon: <Wallet className="h-4 w-4" /> },
];

export function CartPanel({
  onEditItem,
}: {
  onEditItem: (item: CartItem, product?: Product) => void;
}) {
  const {
    items,
    customerName,
    orderType,
    paymentMethod,
    paidAmount,
    discountPercentage,
    note,
    setCustomerName,
    setOrderType,
    setPaymentMethod,
    setPaidAmount,
    setDiscountPercentage,
    setNote,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCartStore();
  const settings = useSettingStore((s) => s.settings);
  const addTransaction = useTransactionStore((s) => s.addTransaction);
  const { toast } = useToast();
  const [step, setStep] = useState<"cart" | "payment">("cart");

  const totals = calculateOrder(items, settings.taxPercentage, settings.serviceChargePercentage, discountPercentage);
  const change = paymentMethod === "cash" && paidAmount > 0 ? paidAmount - totals.grandTotal : 0;

  const handleCheckout = () => {
    if (items.length === 0) return;
    if (paymentMethod === "cash" && paidAmount < totals.grandTotal) {
      toast({ type: "error", title: "Pembayaran kurang", description: "Nominal cash tidak mencukupi." });
      return;
    }
    const txId = `t${crypto.randomUUID()}`;
    const tx = {
      id: txId,
      invoiceNumber: generateInvoiceNumber(),
      customerName: customerName || undefined,
      orderType,
      items,
      subtotal: totals.subtotal,
      discount: totals.discountAmount,
      tax: totals.taxAmount,
      serviceCharge: totals.serviceChargeAmount,
      total: totals.grandTotal,
      paymentMethod,
      paidAmount: paymentMethod === "cash" ? paidAmount : undefined,
      changeAmount: paymentMethod === "cash" ? change : undefined,
      status: "paid" as const,
      createdAt: new Date().toISOString(),
    };
    addTransaction(tx);
    toast({
      type: "success",
      title: "Transaksi berhasil",
      description: `${tx.invoiceNumber} · ${formatCurrency(tx.total)}`,
    });
    clearCart();
    setStep("cart");
    setPaidAmount(0);
  };

  return (
    <div className="flex h-full flex-col bg-card">
      <div className="border-b border-border p-3 sm:p-4">
        <Tabs value={step} onValueChange={(v) => setStep(v as typeof step)}>
          <TabsList className="w-full">
            <TabsTrigger value="cart" className="flex-1">Keranjang</TabsTrigger>
            <TabsTrigger value="payment" className="flex-1">Bayar</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {step === "cart" ? (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
            <div className="space-y-2">
              <Label className="text-xs">Nama Pelanggan (opsional)</Label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="cth: Budi"
                className="h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Tipe Pesanan</Label>
              <div className="mt-1.5 grid grid-cols-3 gap-1.5">
                {orderTypeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setOrderType(opt.value)}
                    className={cn(
                      "flex flex-col items-center gap-1 rounded-xl border px-2 py-2 text-[10px] font-medium transition-all sm:text-xs",
                      orderType === opt.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {opt.icon}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label className="text-xs">Pesanan ({items.length})</Label>
                {items.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="h-7 px-2 text-xs text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                    Clear
                  </Button>
                )}
              </div>
              {items.length === 0 ? (
                <EmptyState
                  title="Keranjang kosong"
                  description="Pilih menu untuk mulai transaksi"
                  icon={ShoppingCart}
                  className="rounded-xl border border-dashed border-border py-8"
                />
              ) : (
                <div className="space-y-2">
                  {items.map((item) => (
                    <CartItemRow
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      onEdit={(i) => onEditItem(i)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-border p-3 sm:p-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.discountAmount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Diskon ({discountPercentage}%)</span>
                  <span className="tabular-nums">-{formatCurrency(totals.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground">
                <span>Pajak ({settings.taxPercentage}%)</span>
                <span className="tabular-nums">{formatCurrency(totals.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service ({settings.serviceChargePercentage}%)</span>
                <span className="tabular-nums">{formatCurrency(totals.serviceChargeAmount)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Total</span>
                <PriceText value={totals.grandTotal} size="lg" className="text-primary" />
              </div>
            </div>
            <Button
              className="mt-3 w-full"
              size="lg"
              onClick={() => setStep("payment")}
              disabled={items.length === 0}
            >
              Lanjut Bayar
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 space-y-3 overflow-y-auto p-3 sm:p-4">
            <Card className="p-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Total Bayar</p>
                <PriceText value={totals.grandTotal} size="lg" className="text-primary" />
              </div>
            </Card>
            <div>
              <Label className="text-xs">Metode Pembayaran</Label>
              <RadioGroup
                value={paymentMethod}
                onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
                className="mt-1.5 grid grid-cols-2 gap-1.5"
              >
                {paymentOptions.map((opt) => (
                  <RadioGroupItem
                    key={opt.value}
                    value={opt.value}
                    label={opt.label}
                    icon={opt.icon}
                  />
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label className="text-xs">Diskon (%)</Label>
              <Input
                type="number"
                min={0}
                max={100}
                value={discountPercentage}
                onChange={(e) => setDiscountPercentage(Math.max(0, Math.min(100, Number(e.target.value) || 0)))}
                className="mt-1.5 h-9 text-sm"
                placeholder="0"
              />
            </div>
            {paymentMethod === "cash" && (
              <>
                <div>
                  <Label className="text-xs">Tunai Diterima</Label>
                  <Input
                    type="number"
                    min={0}
                    value={paidAmount || ""}
                    onChange={(e) => setPaidAmount(Number(e.target.value) || 0)}
                    className="mt-1.5 h-9 text-sm"
                    placeholder={totals.grandTotal.toString()}
                  />
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {[50000, 100000, 200000].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setPaidAmount(v)}
                        className="rounded-md border border-border px-2 py-0.5 text-[10px] hover:bg-muted"
                      >
                        {formatCurrency(v)}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setPaidAmount(totals.grandTotal)}
                      className="rounded-md border border-border px-2 py-0.5 text-[10px] hover:bg-muted"
                    >
                      Pas
                    </button>
                  </div>
                </div>
                {paidAmount > 0 && change >= 0 && (
                  <Card className="p-3 bg-success/5 border-success/30">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Kembalian</span>
                      <PriceText value={change} className="text-success" />
                    </div>
                  </Card>
                )}
              </>
            )}
            <div>
              <Label className="text-xs">Catatan (opsional)</Label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Catatan tambahan..."
                className="mt-1.5 min-h-[60px] text-sm"
              />
            </div>
          </div>
          <div className="border-t border-border p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => setStep("cart")}>
                Kembali
              </Button>
              <Button onClick={handleCheckout} size="lg">
                Bayar Sekarang
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}