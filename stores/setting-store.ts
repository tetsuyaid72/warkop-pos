"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Settings } from "@/types/settings";

const defaultSettings: Settings = {
  outletName: "Warung Coffee",
  outletAddress: "Jl. Kopi No. 88, Jakarta",
  outletPhone: "+62 812-3456-7890",
  taxPercentage: 10,
  serviceChargePercentage: 5,
  theme: "system",
  currency: "IDR",
};

type SettingState = {
  settings: Settings;
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
};

export const useSettingStore = create<SettingState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({ settings: { ...state.settings, ...newSettings } })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    { name: "warkop-settings" },
  ),
);

