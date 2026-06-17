"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";

export function LandingCTA() {
  return (
    <section
      id="beli"
      className="border-t border-border/60 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grain relative overflow-hidden rounded-[2rem] border border-border bg-card px-6 py-20 sm:px-14 sm:py-24"
        >
          {/* Sunset gradient background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-amber-100/60 via-orange-100/40 to-rose-100/50 dark:from-amber-950/30 dark:via-orange-950/15 dark:to-rose-950/20"
          />
          <div
            aria-hidden
            className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl dark:bg-amber-700/15"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-rose-300/30 blur-3xl dark:bg-rose-800/15"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
              <span className="mr-2 text-muted-foreground/60">/07</span> Ayo
              mampir
            </p>
            <h2
              className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem] lg:text-[3.8rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Senja terbaik,{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                cangkir terhangat
              </span>
              , cerita yang{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                belum selesai
              </span>
              .
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
              Bukan cuma soal kopinya, tapi soal siapa yang kamu ajak ngobrol,
              dan berapa lama kamu bisa di sini. Dateng, duduk, dan biarin waktu
              yang {" "}
              <span className="font-medium text-foreground">
                melambat
              </span>{" "}
              buat kamu.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#menu"
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98] sm:w-auto"
              >
                Lihat menu
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="https://maps.google.com/?q=Canggu,Bali"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-background px-6 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/60 sm:w-auto"
              >
                <MapPin className="h-3.5 w-3.5" strokeWidth={2.2} />
                Buka di Google Maps
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>? Parkir luas</span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>? Pet friendly</span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>? Free WiFi</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
