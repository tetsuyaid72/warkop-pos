"use client";

import { Moon, Sun, Monitor } from "lucide-react";
import { useThemeToggle } from "@/hooks/use-theme-toggle";
import { Button } from "@/components/ui/button";
import { useSettingStore } from "@/stores/setting-store";

export function Topbar() {
  const { theme, setTheme, mounted } = useThemeToggle();
  const outletName = useSettingStore((s) => s.settings.outletName);
  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const themeIcon = !mounted ? (
    <Sun className="h-4 w-4" />
  ) : theme === "dark" ? (
    <Moon className="h-4 w-4" />
  ) : theme === "system" ? (
    <Monitor className="h-4 w-4" />
  ) : (
    <Sun className="h-4 w-4" />
  );

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-card/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-card/80 sm:px-6">
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold sm:text-base">{outletName}</h1>
        <p className="hidden text-xs text-muted-foreground sm:block">{today}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={cycle}
        aria-label="Toggle theme"
        className="shrink-0"
      >
        {themeIcon}
      </Button>
    </header>
  );
}