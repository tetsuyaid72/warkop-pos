import { Flame } from "lucide-react";

export function BestSellerList({
  items,
}: {
  items: { id: string; name: string; sold: number; revenue: number }[];
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold sm:text-base">Menu Terlaris</h3>
          <p className="text-xs text-muted-foreground">Periode ini</p>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
          <Flame className="h-4 w-4" />
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {items.length === 0 && (
          <p className="py-6 text-center text-sm text-muted-foreground">Belum ada data</p>
        )}
        {items.map((item, idx) => (
          <div
            key={item.id}
            className="flex items-center gap-3 rounded-lg border border-border p-2.5"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">
              {idx + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.sold} terjual</p>
            </div>
            <p className="shrink-0 text-sm font-semibold tabular-nums">
              Rp {item.revenue.toLocaleString("id-ID")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}