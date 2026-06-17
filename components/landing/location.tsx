"use client";

import { motion } from "motion/react";
import { MapPin, Phone, Clock, Car } from "lucide-react";

export function LandingLocation() {
  return (
    <section
      id="lokasi"
      className="relative border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
            <span className="mr-2 text-muted-foreground/60">/06</span> Lokasi &
            jam buka
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Temuin kami{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              di Kalimantan Selatan
            </span>
            .
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-10 lg:grid-cols-5 lg:gap-8">
          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 lg:col-span-3 lg:aspect-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-200/40 via-orange-200/30 to-rose-300/40 dark:from-amber-900/20 dark:via-orange-900/15 dark:to-rose-900/20" />
            <div
              aria-hidden
              className="absolute inset-0 opacity-30 [background-image:radial-gradient(oklch(0.7_0.12_65_/_0.2)_1px,transparent_1px)] [background-size:18px_18px]"
            />
            <div
              aria-hidden
              className="absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-700/20"
            />
            <div
              aria-hidden
              className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-800/20"
            />

            <div className="relative flex h-full flex-col items-center justify-center p-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-foreground shadow-xl">
                <MapPin className="h-7 w-7 text-background" strokeWidth={1.8} />
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-foreground/70">
                Bati Bati · Kalimantan Selatan
              </p>
              <p className="mt-2 max-w-xs text-pretty text-[15px] font-medium leading-snug text-foreground/90">
                CM3X+GHR, Jl. Industri, Padang, Kec. Bati Bati, Kabupaten Tanah Laut, Kalimantan Selatan 70853
              </p>
              <a
                href="https://maps.app.goo.gl/HfnGdEHUbY5hyKrTA"
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-foreground/20 bg-background/80 px-4 py-2 text-[13px] font-medium backdrop-blur-sm transition-colors hover:border-foreground/40 hover:bg-background"
              >
                Buka di Google Maps →
              </a>
            </div>
          </motion.div>

          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-5 lg:col-span-2"
          >
            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100/70 dark:bg-amber-900/30">
                  <Clock
                    className="h-4 w-4 text-amber-800 dark:text-amber-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Jam buka
                  </p>
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-muted-foreground">
                        Senin - Jumat
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        15.00 - 23.00
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[14px]">
                      <span className="text-muted-foreground">
                        Sabtu - Minggu
                      </span>
                      <span className="font-mono font-medium text-foreground">
                        14.00 - 00.00
                      </span>
                    </div>
                  </div>
                  <p className="mt-4 text-[12.5px] text-muted-foreground">
                    ✓ Buka setiap hari termasuk hari libur
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100/70 dark:bg-amber-900/30">
                  <Phone
                    className="h-4 w-4 text-amber-800 dark:text-amber-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Hubungi kami
                  </p>
                  <a
                    href="https://wa.me/6281234567890"
                    className="mt-2 block text-[15px] font-medium text-foreground transition-colors hover:text-amber-700"
                  >
                    +62 812-3456-7890
                  </a>
                  <a
                    href="mailto:hello@sunsetcaffe.id"
                    className="mt-1 block text-[13.5px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    hello@sunsetcaffe.id
                  </a>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100/70 dark:bg-amber-900/30">
                  <Car
                    className="h-4 w-4 text-amber-800 dark:text-amber-300"
                    strokeWidth={1.8}
                  />
                </div>
                <div className="flex-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Parkir
                  </p>
                  <p className="mt-2 text-[14px] leading-[1.55] text-foreground/85">
                    Parkir motor & mobil luas, gratis untuk pelanggan. Area
                    outdoor juga available buat yang bawa hewan.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}