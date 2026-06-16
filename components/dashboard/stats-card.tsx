import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendUp = true,
  className,
  accent,
}: {
  title: string;
  value: string;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  trendUp?: boolean;
  className?: string;
  accent?: string;
}) {
  return (
    <Card className={cn("p-4 sm:p-5", className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-muted-foreground sm:text-sm">{title}</p>
          <p className="mt-1.5 text-xl font-semibold tabular-nums tracking-tight sm:text-2xl">
            {value}
          </p>
          {(description || trend) && (
            <div className="mt-1.5 flex items-center gap-2 text-xs">
              {trend && (
                <span className={cn("font-medium", trendUp ? "text-success" : "text-destructive")}>
                  {trend}
                </span>
              )}
              {description && <span className="text-muted-foreground">{description}</span>}
            </div>
          )}
        </div>
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: accent ? `${accent}1a` : "var(--muted)",
            color: accent ?? "var(--muted-foreground)",
          }}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </Card>
  );
}