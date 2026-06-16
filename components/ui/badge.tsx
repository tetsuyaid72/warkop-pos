import * as React from "react";
import { cn } from "@/lib/utils";

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "outline" | "success" | "warning" | "destructive" | "accent";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClass = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "border border-border bg-transparent text-foreground",
    success: "bg-success/15 text-success border border-success/20",
    warning: "bg-warning/15 text-warning border border-warning/20",
    destructive: "bg-destructive/15 text-destructive border border-destructive/20",
    accent: "bg-accent/15 text-accent border border-accent/20",
  }[variant];

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        variantClass,
        className,
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

export { Badge };