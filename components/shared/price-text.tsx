import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format-currency";

export function PriceText({
  value,
  currency = "IDR",
  className,
  size = "default",
}: {
  value: number;
  currency?: string;
  className?: string;
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizeClass = {
    sm: "text-sm",
    default: "text-base",
    lg: "text-lg",
    xl: "text-2xl",
  }[size];
  return (
    <span className={cn("font-semibold tabular-nums tracking-tight", sizeClass, className)}>
      {formatCurrency(value, currency)}
    </span>
  );
}