import Link from "next/link";
import Image from "next/image";

const columns = [
  {
    title: "Cafe",
    links: [
      { label: "Menu", href: "#menu" },
      { label: "Lokasi", href: "#lokasi" },
      { label: "Testimoni", href: "#testimoni" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Cerita",
    links: [
      { label: "Tentang kami", href: "#cerita" },
      { label: "Cara pesan", href: "#cara-pesan" },
      { label: "Acoustic session", href: "#" },
    ],
  },
  {
    title: "Sosial",
    links: [
      { label: "Instagram", href: "https://instagram.com/sunsetcaffe" },
      { label: "TikTok", href: "https://tiktok.com/@sunsetcaffe" },
      { label: "WhatsApp", href: "https://wa.me/6281234567890" },
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
              <span className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-border/60 transition-transform group-hover:scale-110">
                <Image
                  src="/logo.jpg"
                  alt="Sunset Caffe"
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>
              <div className="leading-none">
                <div className="font-display text-[18px] font-medium tracking-tight">
                  Sunset<span className="font-display-italic"> Caffe</span>
                </div>
                <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
                  Coffee · Sunset · Slow Living
                </div>
              </div>
            </Link>
            <p className="mt-5 max-w-xs text-pretty text-[14.5px] leading-[1.6] text-muted-foreground">
              Specialty coffee, signature drinks, dan view matahari terbenam di
              Canggu, Bali. Buka setiap hari sampai malam.
            </p>
            <div className="mt-6 space-y-1.5 text-[13.5px] text-muted-foreground">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70">
                Alamat
              </p>
              <p>CM3X+GHR, Jl. Industri, Padang, Kec. Bati Bati, Kabupaten Tanah Laut, Kalimantan Selatan 70853</p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70">
                Jam buka
              </p>
              <p>Senin-Jumat · 15.00-23.00</p>
              <p>Sabtu-Minggu · 14.00-00.00</p>
            </div>
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
            © {new Date().getFullYear()} Sunset Caffe · Dibuat dengan ☕ di
            Canggu
          </p>
          <p className="font-display-italic text-[14px] text-muted-foreground">
            &ldquo;Setiap senja punya rasa sendiri.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
