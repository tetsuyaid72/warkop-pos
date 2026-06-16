import type { CartItem } from "@/types/transaction";

export type OrderTotals = {
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  serviceChargeAmount: number;
  grandTotal: number;
};

export function calculateItemTotal(item: CartItem): number {
  const addonsTotal =
    item.addons?.reduce((sum, a) => sum + a.price, 0) ?? 0;
  return (item.price + addonsTotal) * item.quantity;
}

export function calculateOrder(
  items: CartItem[],
  taxPercentage: number,
  serviceChargePercentage: number,
  discountPercentage: number = 0,
): OrderTotals {
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const discountAmount = (subtotal * discountPercentage) / 100;
  const taxable = subtotal - discountAmount;
  const taxAmount = (taxable * taxPercentage) / 100;
  const serviceChargeAmount = (taxable * serviceChargePercentage) / 100;
  const grandTotal = taxable + taxAmount + serviceChargeAmount;

  return {
    subtotal,
    discountAmount,
    taxAmount,
    serviceChargeAmount,
    grandTotal: Math.max(0, grandTotal),
  };
}

