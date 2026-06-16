"use client";

import { create } from "zustand";
import type { CartItem, OrderType, PaymentMethod } from "@/types/transaction";

type CartState = {
  items: CartItem[];
  customerName: string;
  orderType: OrderType;
  paymentMethod: PaymentMethod;
  paidAmount: number;
  discountPercentage: number;
  note: string;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  setQuantity: (id: string, qty: number) => void;
  updateItem: (id: string, partial: Partial<CartItem>) => void;
  setCustomerName: (name: string) => void;
  setOrderType: (type: OrderType) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPaidAmount: (amount: number) => void;
  setDiscountPercentage: (value: number) => void;
  setNote: (note: string) => void;
  clearCart: () => void;
};

let itemCounter = 0;

export const useCartStore = create<CartState>()((set) => ({
  items: [],
  customerName: "",
  orderType: "dine-in",
  paymentMethod: "qris",
  paidAmount: 0,
  discountPercentage: 0,
  note: "",
  addItem: (item) =>
    set((state) => {
      itemCounter += 1;
      const id = `ci${itemCounter}-${Math.random().toString(36).slice(2, 7)}`;
      return { items: [...state.items, { ...item, id }] };
    }),
  removeItem: (id) =>
    set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, delta) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i))
        .filter((i) => i.quantity > 0),
    })),
  setQuantity: (id, qty) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.id === id ? { ...i, quantity: Math.max(0, qty) } : i))
        .filter((i) => i.quantity > 0),
    })),
  updateItem: (id, partial) =>
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, ...partial } : i)),
    })),
  setCustomerName: (name) => set({ customerName: name }),
  setOrderType: (orderType) => set({ orderType }),
  setPaymentMethod: (paymentMethod) => set({ paymentMethod }),
  setPaidAmount: (paidAmount) => set({ paidAmount }),
  setDiscountPercentage: (discountPercentage) => set({ discountPercentage }),
  setNote: (note) => set({ note }),
  clearCart: () =>
    set({
      items: [],
      customerName: "",
      orderType: "dine-in",
      paymentMethod: "qris",
      paidAmount: 0,
      discountPercentage: 0,
      note: "",
    }),
}));