"use client";

import { cn } from "@/lib/utils";

export function CategoryChips({
  categories,
  active,
  onChange,
}: {
  categories: { id: string; name: string }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button
        type="button"
        onClick={() => onChange("all")}
        className={cn(
          "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
          active === "all"
            ? "border-foreground bg-foreground text-background"
            : "border-border bg-card text-muted-foreground hover:text-foreground",
        )}
      >
        Semua
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          type="button"
          onClick={() => onChange(c.name)}
          className={cn(
            "shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm",
            active === c.name
              ? "border-foreground bg-foreground text-background"
              : "border-border bg-card text-muted-foreground hover:text-foreground",
          )}
        >
          {c.name}
        </button>
      ))}
    </div>
  );
}
