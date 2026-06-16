"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Transaction } from "@/types/transaction";
import { mockTransactions } from "@/data/mock-transactions";

type TransactionState = {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  cancelTransaction: (id: string) => void;
  refundTransaction: (id: string) => void;
  resetTransactions: () => void;
  importTransactions: (transactions: Transaction[]) => void;
};

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set) => ({
      transactions: mockTransactions,
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),
      cancelTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, status: "cancelled" } : t,
          ),
        })),
      refundTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, status: "refunded" } : t,
          ),
        })),
      resetTransactions: () => set({ transactions: mockTransactions }),
      importTransactions: (transactions) => set({ transactions }),
    }),
    {
      name: "warkop-transactions",
      storage: createJSONStorage(() => {
        return {
          getItem: (name) => { try { return localStorage.getItem(name); } catch { return null; } },
          setItem: (name, value) => {
            try { localStorage.setItem(name, value); }
            catch (err) {
              if (err instanceof DOMException && err.name === "QuotaExceededError") {
                // keep only most recent 100 transactions
                try {
                  const parsed = JSON.parse(value);
                  if (parsed?.state?.transactions) {
                    parsed.state.transactions = parsed.state.transactions.slice(0, 100);
                    localStorage.setItem(name, JSON.stringify(parsed));
                  }
                } catch {}
              }
            }
          },
          removeItem: (name) => { try { localStorage.removeItem(name); } catch {} },
        };
      }),
      partialize: (state) => ({ transactions: state.transactions.slice(0, 200) }),
    },
  ),
);

