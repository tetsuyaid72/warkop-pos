"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Play, Star, Quote } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      {/* Warm earthy background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-background to-background dark:from-amber-950/25" />
        <div className="absolute -top-32 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200/40 via-orange-100/25 to-transparent blur-3xl dark:from-amber-900/20" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.35] [background-image:radial-gradient(oklch(0.7_0.12_65_/_0.18)_1px,transparent_1px)] [background-size:22px_22px]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left — Copy */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-border/80 bg-background/70 px-3 py-1.5 text-[11.5px] text-muted-foreground shadow-sm backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500/70" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-600" />
              </span>
              <span className="font-mono uppercase tracking-[0.18em]">
                Edisi 01
              </span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>Dibuat bareng owner warung kopi</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-balance font-display text-[2.6rem] font-normal leading-[1.02] tracking-[-0.025em] sm:text-[3.5rem] lg:text-[4.6rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Kasir yang
              <br />
              <span
                className="font-display-italic text-foreground/90"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                mengerti
              </span>{" "}
              ritme
              <br />
              warung kopi.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 max-w-xl text-pretty text-[17px] leading-[1.65] text-muted-foreground"
            >
              Bukan aplikasi akuntansi yang dipaksakan. Bukan POS generik yang
              mahal tiap bulan. Sistem kasir yang dirancang{" "}
              <span className="font-medium text-foreground">dari nol</span>{" "}
              untuk cara kerja warung kopi Indonesia.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="#beli"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-3.5 text-[14px] font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98] sm:w-auto"
              >
                Pesan sekarang
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/dashboard"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-background/80 px-5 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/60 sm:w-auto"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-background">
                  <Play className="h-2.5 w-2.5 fill-current" />
                </span>
                Lihat demo langsung
              </Link>
            </motion.div>

            {/* Trust line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13.5px]"
            >
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-amber-500 text-amber-500"
                  />
                ))}
              </div>
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">4.9/5</span> dari{" "}
                <span className="font-semibold text-foreground">200+</span>{" "}
                owner warung kopi
              </span>
            </motion.div>
          </div>

          {/* Right — Visual showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              {/* Receipt-style card */}
              <div className="grain relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-2xl shadow-amber-900/10 dark:shadow-amber-900/30">
                {/* Top — brand bar */}
                <div className="relative flex items-center justify-between border-b border-dashed border-border/80 bg-gradient-to-br from-amber-100/80 to-orange-50/60 px-5 py-4 dark:from-amber-900/30 dark:to-orange-900/10">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-800/80 dark:text-amber-300/80">
                      Struk #0247
                    </div>
                    <div className="mt-1 font-display text-[20px] font-medium leading-none tracking-tight">
                      Warung<span className="font-display-italic"> Kopi</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Hari ini
                    </div>
                    <div
                      className="mt-1 font-display text-[26px] font-medium leading-none tracking-tight text-foreground"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      Rp 1,248K
                    </div>
                  </div>
                </div>

                {/* List of items */}
                <div className="px-5 py-4">
                  <ul className="space-y-2.5">
                    {[
                      { name: "Kopi Susu Gula Aren", qty: 12, price: "Rp 216K" },
                      { name: "Americano", qty: 8, price: "Rp 96K" },
                      { name: "Croissant Coklat", qty: 5, price: "Rp 75K" },
                    ].map((item) => (
                      <li
                        key={item.name}
                        className="flex items-center justify-between text-[13px]"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-amber-700 dark:text-amber-400">
                            ×{item.qty}
                          </span>
                          <span className="text-foreground/90">{item.name}</span>
                        </div>
                        <span className="font-mono text-[12px] text-muted-foreground">
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Decorative perforated edge */}
                  <div
                    aria-hidden
                    className="my-4 h-px bg-[repeating-linear-gradient(to_right,var(--color-border)_0_6px,transparent_6px_12px)]"
                  />

                  {/* Total row */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                        Total
                      </div>
                      <div className="font-display text-[24px] font-medium leading-none tracking-tight">
                        Rp 387<span className="text-base text-muted-foreground">.500</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        className="h-3 w-3"
                      >
                        <path
                          d="M7 17L17 7M17 7H8M17 7V16"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      +24%
                    </div>
                  </div>
                </div>

                {/* Footer with steam illustration */}
                <div className="relative flex items-center justify-between border-t border-dashed border-border/80 bg-amber-50/40 px-5 py-3.5 dark:bg-amber-950/20">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-800/80 dark:text-amber-300/80">
                      ☕ Terima kasih
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground">
                    09:42 WIB
                  </span>
                </div>
              </div>

              {/* Floating tag — top */}
              <motion.div
                initial={{ opacity: 0, y: -8, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -right-3 -top-3 hidden rounded-full border border-border/80 bg-background/95 px-3.5 py-1.5 text-[11px] font-medium shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Live · Omzet hari ini
              </motion.div>

              {/* Quote bubble — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -12, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="absolute -bottom-6 -left-4 hidden max-w-[230px] rounded-2xl border border-border/80 bg-background/95 p-3.5 shadow-xl backdrop-blur-md sm:block"
              >
                <Quote className="h-3.5 w-3.5 text-amber-600" />
                <p className="mt-2 text-[12.5px] font-medium leading-snug text-foreground">
                  &ldquo;Akhirnya laporan gak pake Excel manual lagi.&rdquo;
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Pak Dimas · Surabaya
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
