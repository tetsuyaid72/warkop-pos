import Link from "next/link";

const columns = [
  {
    title: "Produk",
    links: [
      { label: "Fitur", href: "#fitur" },
      { label: "Harga", href: "#harga" },
      { label: "Demo", href: "/dashboard" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Cerita",
    links: [
      { label: "Cara mulai", href: "#cerita" },
      { label: "Testimoni", href: "#testimoni" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Dukungan",
    links: [
      { label: "WhatsApp", href: "https://wa.me/6281234567890" },
      { label: "Email", href: "mailto:halo@warkop.app" },
      { label: "Komunitas", href: "#" },
    ],
  },
];

export function LandingFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-amber-50/40 py-20 dark:bg-amber-950/10">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground transition-transform group-hover:rotate-12">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4 text-background"
                >
                  <path
                    d="M6 8h11a3 3 0 010 6h-1.5M6 8v8a2 2 0 002 2h6a2 2 0 002-2v-2M6 8l-2-2m2 2l2-2"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <div className="leading-none">
                <div className="font-display text-[18px] font-medium tracking-tight">
                  Warung<span className="font-display-italic"> Kopi</span>
                </div>
                <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
                  POS · est. 2024
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-[14.5px] leading-[1.6] text-muted-foreground">
              Sistem kasir yang dirancang dari dan untuk warung kopi Indonesia.
              Bayar sekali, pakai selamanya.
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title} className="lg:col-span-2">
              <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="lg:col-span-1">
            <h3 className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Legal
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <Link
                  href="#"
                  className="text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                >
                  Privasi
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-[14px] text-foreground/80 transition-colors hover:text-foreground"
                >
                  Lisensi
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border/60 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            © {new Date().getFullYear()} Warung Kopi · Dibuat dengan ☕ di
            Indonesia
          </p>
          <p className="font-display-italic text-[14px] text-muted-foreground">
            &ldquo;Untuk para pejuang warung kopi.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
