"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "#cerita", label: "Cerita" },
  { href: "#fitur", label: "Fitur" },
  { href: "#testimoni", label: "Testimoni" },
  { href: "#harga", label: "Harga" },
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
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-foreground transition-transform group-hover:rotate-12">
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
            <div className="font-display text-[17px] font-medium tracking-tight">
              Warung<span className="font-display-italic"> Kopi</span>
            </div>
            <div className="mt-1 font-mono text-[9.5px] uppercase tracking-[0.22em] text-muted-foreground">
              POS · est. 2024
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
            href="/dashboard"
            className="rounded-full px-3.5 py-1.5 text-[13.5px] text-foreground/70 transition-colors hover:text-foreground"
          >
            Coba demo
          </Link>
          <Link
            href="#beli"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-[13.5px] font-medium text-background transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            Pesan sekarang
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
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg border border-border px-3 py-3 text-center text-[15px] font-medium"
              >
                Coba demo
              </Link>
              <Link
                href="#beli"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg bg-foreground px-3 py-3 text-center text-[15px] font-medium text-background"
              >
                Pesan sekarang
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
