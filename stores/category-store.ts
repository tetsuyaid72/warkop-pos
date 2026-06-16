"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Category } from "@/types/category";
import { mockCategories } from "@/data/mock-categories";

type CategoryState = {
  categories: Category[];
  addCategory: (category: Omit<Category, "id">) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleActive: (id: string) => void;
  resetCategories: () => void;
};

export const useCategoryStore = create<CategoryState>()(
  persist(
    (set) => ({
      categories: mockCategories,
      addCategory: (category) =>
        set((state) => ({
          categories: [...state.categories, { ...category, id: `c${Date.now()}` }],
        })),
      updateCategory: (id, category) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, ...category } : c,
          ),
        })),
      deleteCategory: (id) =>
        set((state) => ({
          categories: state.categories.filter((c) => c.id !== id),
        })),
      toggleActive: (id) =>
        set((state) => ({
          categories: state.categories.map((c) =>
            c.id === id ? { ...c, isActive: !c.isActive } : c,
          ),
        })),
      resetCategories: () => set({ categories: mockCategories }),
    }),
    { name: "warkop-categories" },
  ),
);

