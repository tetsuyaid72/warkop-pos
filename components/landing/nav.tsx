"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#menu", label: "Menu" },
  { href: "#cerita", label: "Cerita" },
  { href: "#lokasi", label: "Lokasi" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#faq", label: "FAQ" },
];

export function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/85 backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:h-18 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 transition-transform group-hover:rotate-12">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-white"
            >
              <circle cx="12" cy="12" r="4" fill="currentColor" />
              <path
                d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4l1.4-1.4M17 7l1.4-1.4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <div className="leading-none">
            <div className="font-display text-[17px] font-medium tracking-tight">
              Sunset<span className="font-display-italic"> Caffe</span>
            </div>
            <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
              Café · est. 2024
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-[13.5px] text-foreground/70 transition-colors hover:bg-muted hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="#lokasi"
            className="rounded-full px-3.5 py-1.5 text-[13.5px] text-foreground/70 transition-colors hover:text-foreground"
          >
            Kunjungi kami
          </Link>
          <Link
            href="#menu"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13.5px] font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Lihat menu
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="rounded-full p-2 transition-colors hover:bg-muted md:hidden"
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border/60 bg-background/95 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-3 text-[15px] text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3">
              <Link
                href="#lokasi"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-3 py-3 text-center text-[15px] font-medium"
              >
                Kunjungi kami
              </Link>
              <Link
                href="#menu"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-foreground px-3 py-3 text-center text-[15px] font-medium text-background"
              >
                Lihat menu
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}