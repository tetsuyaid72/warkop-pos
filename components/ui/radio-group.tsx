"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const RadioGroupContext = React.createContext<{
  value: string;
  onChange: (v: string) => void;
} | null>(null);

function useRadioGroup() {
  const ctx = React.useContext(RadioGroupContext);
  if (!ctx) throw new Error("RadioGroup must be used within RadioGroup");
  return ctx;
}

function RadioGroup({
  value,
  onValueChange,
  children,
  className,
}: {
  value?: string;
  onValueChange?: (v: string) => void;
  children: React.ReactNode;
  className?: string;
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
    <RadioGroupContext.Provider value={{ value: internal, onChange: handle }}>
      <div className={cn("grid gap-2", className)}>{children}</div>
    </RadioGroupContext.Provider>
  );
}

function RadioGroupItem({
  value,
  id,
  label,
  description,
  icon,
  className,
}: {
  value: string;
  id?: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
}) {
  const { value: active, onChange } = useRadioGroup();
  const isActive = active === value;
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all",
        isActive
          ? "border-primary bg-primary/5 ring-1 ring-primary"
          : "border-border hover:border-primary/40 hover:bg-muted",
        className,
      )}
    >
      <input
        type="radio"
        id={id}
        name={id}
        value={value}
        checked={isActive}
        onChange={() => onChange(value)}
        className="sr-only"
      />
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          isActive ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background",
        )}
      >
        {isActive && <Check className="h-3 w-3" />}
      </span>
      {icon && <span className="text-muted-foreground">{icon}</span>}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium leading-tight">{label}</div>
        {description && (
          <div className="text-xs text-muted-foreground">{description}</div>
        )}
      </div>
    </label>
  );
}

export { RadioGroup, RadioGroupItem };