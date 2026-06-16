"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

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
          {/* Subtle warm background */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-transparent to-rose-50/40 dark:from-amber-950/20 dark:to-rose-950/10"
          />
          <div
            aria-hidden
            className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-amber-200/25 blur-3xl dark:bg-amber-900/10"
          />
          <div
            aria-hidden
            className="absolute -bottom-32 -left-32 h-72 w-72 rounded-full bg-rose-200/20 blur-3xl dark:bg-rose-900/10"
          />

          <div className="relative mx-auto max-w-2xl text-center">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
              <span className="mr-2 text-muted-foreground/60">/06</span> Saatnya
              mulai
            </p>
            <h2
              className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3.2rem] lg:text-[3.8rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Saatnya kasih{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                warung kamu
              </span>{" "}
              tools yang{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                sepatutnya
              </span>
              .
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
              Bukan tools korporat yang bikin pusing. Bukan software asing yang
              mahal. Tapi tools yang dirancang{" "}
              <span className="font-medium text-foreground">
                dari dan untuk
              </span>{" "}
              warung kopi Indonesia.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="#harga"
                className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-foreground px-6 py-3.5 text-[14px] font-medium text-background transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-foreground/10 active:scale-[0.98] sm:w-auto"
              >
                Lihat harga
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-border bg-background px-6 py-3.5 text-[14px] font-medium text-foreground transition-colors hover:bg-muted/60 sm:w-auto"
              >
                Coba demo dulu
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>✓ Bayar sekali</span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>✓ Garansi 7 hari</span>
              <span aria-hidden className="h-3 w-px bg-border" />
              <span>✓ Source code milik kamu</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
