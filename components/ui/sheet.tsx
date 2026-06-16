"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type SheetContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const SheetContext = React.createContext<SheetContextType | null>(null);

function useSheet() {
  const ctx = React.useContext(SheetContext);
  if (!ctx) throw new Error("Sheet components must be used within Sheet");
  return ctx;
}

function Sheet({
  open: controlledOpen,
  onOpenChange,
  children,
}: {
  open?: boolean;
  onOpenChange?: (v: boolean) => void;
  children: React.ReactNode;
}) {
  const [internal, setInternal] = React.useState(false);
  const open = controlledOpen ?? internal;
  const setOpen = (v: boolean) => {
    setInternal(v);
    onOpenChange?.(v);
  };
  return <SheetContext.Provider value={{ open, setOpen }}>{children}</SheetContext.Provider>;
}

function SheetTrigger({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) {
  const { setOpen } = useSheet();
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>).props.onClick?.(e);
        setOpen(true);
      },
    });
  }
  return (
    <button onClick={() => setOpen(true)} type="button">
      {children}
    </button>
  );
}

function SheetContent({
  children,
  className,
  side = "right",
  title,
}: {
  children: React.ReactNode;
  className?: string;
  side?: "right" | "bottom";
  title?: string;
}) {
  const { open, setOpen } = useSheet();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          "absolute z-10 bg-card border-border shadow-xl flex flex-col",
          side === "right"
            ? "right-0 top-0 h-full w-full max-w-md border-l animate-fade-in"
            : "bottom-0 left-0 right-0 max-h-[90vh] rounded-t-2xl border-t animate-slide-up",
          className,
        )}
      >
        <div className="flex items-center justify-between border-b border-border p-4">
          {title && <h2 className="text-base font-semibold">{title}</h2>}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="ml-auto rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

export { Sheet, SheetTrigger, SheetContent };