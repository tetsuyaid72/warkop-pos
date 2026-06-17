"use client";

const items = [
  { label: "Specialty Coffee" },
  { label: "Sunset Vibes" },
  { label: "Dine-in" },
  { label: "Takeaway" },
  { label: "Free WiFi" },
  { label: "Sunset View" },
  { label: "Single Origin" },
  { label: "Cozy Space" },
  { label: "Pet Friendly" },
  { label: "Open Late" },
  { label: "Outdoor Area" },
  { label: "Acoustic Session" },
];

const row = [...items, ...items, ...items];

export function LandingMarquee() {
  return (
    <section
      aria-label="Sunset Caffe"
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
