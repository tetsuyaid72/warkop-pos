import type { OrderItem } from "@/types/order";

export type OrderTotals = {
  subtotal: number;
  taxAmount: number;
  serviceChargeAmount: number;
  grandTotal: number;
};

export function calculateItemTotal(item: OrderItem): number {
  const addonsTotal = item.addons?.reduce((s, a) => s + a.price, 0) ?? 0;
  return (item.price + addonsTotal) * item.quantity;
}

export function calculateOrderTotals(
  items: OrderItem[],
  taxPercentage: number,
  serviceChargePercentage: number,
): OrderTotals {
  const subtotal = items.reduce((s, i) => s + calculateItemTotal(i), 0);
  const taxAmount = (subtotal * taxPercentage) / 100;
  const serviceChargeAmount = (subtotal * serviceChargePercentage) / 100;
  const grandTotal = subtotal + taxAmount + serviceChargeAmount;
  return { subtotal, taxAmount, serviceChargeAmount, grandTotal };
}
