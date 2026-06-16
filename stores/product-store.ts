"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Product } from "@/types/product";
import { mockProducts } from "@/data/mock-products";

type ProductState = {
  products: Product[];
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  toggleAvailability: (id: string) => void;
  resetProducts: () => void;
  importProducts: (products: Product[]) => void;
};

/**
 * Strip large base64 images from products before persisting to localStorage.
 * This keeps storage usage low. Images stay in memory for the current session.
 */
const stripImages = (products: Product[]): Product[] =>
  products.map((p) => ({ ...p, image: p.image && p.image.startsWith("data:") && p.image.length > 50000 ? "" : p.image }));

/**
 * Custom storage wrapper that catches QuotaExceededError and falls back
 * to a stripped version (no embedded images) on retry.
 */
const safeStorage = createJSONStorage<ProductState>(() => {
  const baseStorage = {
    getItem: (name: string) => {
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name: string, value: string) => {
      try {
        localStorage.setItem(name, value);
      } catch (err) {
        if (err instanceof DOMException && err.name === "QuotaExceededError") {
          // Strip images and retry once
          try {
            const parsed = JSON.parse(value);
            if (parsed?.state?.products) {
              parsed.state.products = stripImages(parsed.state.products);
              localStorage.setItem(name, JSON.stringify(parsed));
              return;
            }
          } catch {
            // give up
          }
          // last resort: clear this key
          try {
            localStorage.removeItem(name);
          } catch {
            // ignore
          }
        }
      }
    },
    removeItem: (name: string) => {
      try {
        localStorage.removeItem(name);
      } catch {
        // ignore
      }
    },
  };
  return baseStorage;
});

export const useProductStore = create<ProductState>()(
  persist(
    (set) => ({
      products: mockProducts,
      addProduct: (product) =>
        set((state) => ({
          products: [
            ...state.products,
            { ...product, id: `p${Date.now()}` },
          ],
        })),
      updateProduct: (id, product) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...product } : p,
          ),
        })),
      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),
      toggleAvailability: (id) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, isAvailable: !p.isAvailable } : p,
          ),
        })),
      resetProducts: () => set({ products: mockProducts }),
      importProducts: (products) => set({ products }),
    }),
    {
      name: "warkop-products",
      storage: safeStorage as unknown as import("zustand/middleware").PersistStorage<{ products: import("@/types/product").Product[]; }>,
      partialize: (state) => ({ products: stripImages(state.products) }),
    },
  ),
);