"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Star, Quote } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-44 lg:pb-28">
      {/* Sunset gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 via-orange-50/30 to-rose-50/40 dark:from-amber-950/25 dark:via-orange-950/15 dark:to-rose-950/20" />
        <div className="absolute -top-40 left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-gradient-to-br from-amber-200/50 via-orange-200/30 to-rose-200/40 blur-3xl dark:from-amber-900/25 dark:via-orange-900/15 dark:to-rose-900/20" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.32] [background-image:radial-gradient(oklch(0.7_0.12_65_/_0.18)_1px,transparent_1px)] [background-size:22px_22px]"
        />
      </div>

      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Left â€” Copy */}
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
                Buka hari ini
              </span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>15.00 - 23.00 WIB</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 text-balance font-display text-[2.6rem] font-normal leading-[1.02] tracking-[-0.025em] sm:text-[3.5rem] lg:text-[4.6rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Tempat di mana
              <br />
              <span
                className="font-display-italic text-foreground/90"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                waktu
              </span>{" "}
              <span
                className="bg-gradient-to-r from-amber-600 via-orange-500 to-rose-500 bg-clip-text text-transparent dark:from-amber-400 dark:via-orange-400 dark:to-rose-400"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                melambat
              </span>
              .
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-7 max-w-xl text-pretty text-[17px] leading-[1.65] text-muted-foreground"
            >
              Sunset Caffe â€” specialty coffee, signature drinks, dan view
              matahari terbenam yang{" "}
              <span className="font-medium text-foreground">
                gak akan kamu lupain
              </span>
              .
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <Link
                href="#menu"
                className="group inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-5 py-3.5 text-[14px] font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98] sm:w-auto"
              >
                Lihat menu
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#lokasi"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border bg-background/80 px-5 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/60 sm:w-auto"
              >
                Kunjungi kami
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
                <span className="font-semibold text-foreground">500+</span>{" "}
                review pelanggan
              </span>
            </motion.div>
          </div>

          {/* Right â€” Visual showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 1 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md">
              {/* Hero photo */}
              <div className="grain relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border/70 shadow-2xl shadow-orange-900/15 dark:shadow-orange-900/30">
                <Image
                  src="/sunset.webp"
                  alt="Sunset Caffe dengan cahaya matahari terbenam"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/40 via-transparent to-transparent" />

                {/* Signature drinks card */}
                <div className="absolute inset-x-3 bottom-3 rounded-2xl border border-white/30 bg-background/85 p-4 shadow-xl backdrop-blur-md">
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
                    Signature drinks
                  </p>
                  <ul className="mt-2.5 space-y-1.5">
                    {[
                      { name: "Kopi Susu Aren", price: "Rp 25K" },
                      { name: "Caramel Latte", price: "Rp 32K" },
                      { name: "Matcha Latte", price: "Rp 30K" },
                    ].map((drink) => (
                      <li
                        key={drink.name}
                        className="flex items-center justify-between text-[13px]"
                      >
                        <span className="text-foreground/90">{drink.name}</span>
                        <span className="font-mono text-[11.5px] text-muted-foreground">
                          {drink.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Floating tag â€” top */}
              <motion.div
                initial={{ opacity: 0, y: -8, x: 8 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="absolute -right-3 -top-3 hidden rounded-full border border-border/80 bg-background/95 px-3.5 py-1.5 text-[11px] font-medium shadow-xl backdrop-blur-md sm:flex sm:items-center sm:gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                Sunset view Â· 17.00-18.30
              </motion.div>

              {/* Quote bubble â€” bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -12, y: 8 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95 }}
                className="absolute -bottom-6 -left-4 hidden max-w-[230px] rounded-2xl border border-border/80 bg-background/95 p-3.5 shadow-xl backdrop-blur-md sm:block"
              >
                <Quote className="h-3.5 w-3.5 text-amber-600" />
                <p className="mt-2 text-[12.5px] font-medium leading-snug text-foreground">
                  &ldquo;Tempat WFC favorit. Sunset-nya juara.&rdquo;
                </p>
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Sasha Â· Mahasiswi
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}