"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  value: string;
  onChange: (v: string) => void;
} | null>(null);

function useSelect() {
  const ctx = React.useContext(SelectContext);
  if (!ctx) throw new Error("Select components must be used within Select");
  return ctx;
}

function Select({
  value,
  onValueChange,
  children,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(value ?? "");
  React.useEffect(() => {
    if (value !== undefined) setInternal(value);
  }, [value]);
  const handle = (v: string) => {
    setInternal(v);
    onValueChange?.(v);
  };
  return (
    <SelectContext.Provider value={{ value: internal, onChange: handle }}>
      {children}
    </SelectContext.Provider>
  );
}

function SelectTrigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1 focus-within:ring-offset-background",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SelectValue({ placeholder }: { placeholder?: string }) {
  const { value } = useSelect();
  return <span className={cn(value ? "" : "text-muted-foreground")}>{value || placeholder}</span>;
}

function SelectContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mt-1 max-h-60 overflow-auto rounded-lg border border-border bg-card p-1 shadow-md animate-fade-in",
        className,
      )}
    >
      {children}
    </div>
  );
}

function SelectItem({
  value,
  children,
  className,
}: {
  value: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { onChange } = useSelect();
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={cn(
        "flex w-full items-center rounded-md px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };