import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { TransactionStatus } from "@/types/transaction";

const variants: Record<TransactionStatus, "success" | "destructive" | "warning"> = {
  paid: "success",
  cancelled: "destructive",
  refunded: "warning",
};

const labels: Record<TransactionStatus, string> = {
  paid: "Lunas",
  cancelled: "Batal",
  refunded: "Refund",
};

export function StatusBadge({
  status,
  className,
}: {
  status: TransactionStatus;
  className?: string;
}) {
  return (
    <Badge variant={variants[status]} className={cn("capitalize", className)}>
      {labels[status]}
    </Badge>
  );
}