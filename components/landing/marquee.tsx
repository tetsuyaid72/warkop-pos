"use client";

const items = [
  { label: "QRIS" },
  { label: "GoPay" },
  { label: "OVO" },
  { label: "DANA" },
  { label: "ShopeePay" },
  { label: "Tunai" },
  { label: "Debit" },
  { label: "Kredit" },
  { label: "Thermal 58mm" },
  { label: "Thermal 80mm" },
  { label: "JSON Backup" },
  { label: "Offline-first" },
];

const row = [...items, ...items, ...items];

export function LandingMarquee() {
  return (
    <section
      aria-label="Didukung oleh"
      className="relative overflow-hidden border-y border-border/60 bg-foreground py-5 text-background"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-foreground to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-foreground to-transparent"
        aria-hidden
      />
      <div className="flex w-max items-center gap-12 animate-marquee will-change-transform">
        {row.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              aria-hidden
              className="inline-block h-1.5 w-1.5 rounded-full bg-amber-400/90"
            />
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-background/80">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
