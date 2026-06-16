"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function useThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const toggle = () => {
    const current = theme === "system" ? resolvedTheme : theme;
    setTheme(current === "dark" ? "light" : "dark");
  };

  return { theme, setTheme, resolvedTheme, mounted, toggle };
}