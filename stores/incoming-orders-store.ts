"use client";

import { create } from "zustand";
import type { CustomerOrder, Outlet } from "@/types/order";

type IncomingState = {
  outlet: Outlet | null;
  orders: CustomerOrder[];
  setOutlet: (outlet: Outlet | null) => void;
  setOrders: (orders: CustomerOrder[]) => void;
  upsertOrder: (order: CustomerOrder) => void;
  removeOrder: (id: string) => void;
  clear: () => void;
};

export const useIncomingOrdersStore = create<IncomingState>()((set) => ({
  outlet: null,
  orders: [],
  setOutlet: (outlet) => set({ outlet }),
  setOrders: (orders) => set({ orders }),
  upsertOrder: (order) =>
    set((state) => {
      const idx = state.orders.findIndex((o) => o.id === order.id);
      if (idx === -1) return { orders: [order, ...state.orders] };
      const next = [...state.orders];
      next[idx] = order;
      return { orders: next };
    }),
  removeOrder: (id) =>
    set((state) => ({ orders: state.orders.filter((o) => o.id !== id) })),
  clear: () => set({ orders: [] }),
}));
