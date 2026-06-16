"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Check, ArrowUpRight, Plus } from "lucide-react";

const mainPlan = {
  name: "Warung Kopi POS",
  description: "Source code lengkap, deploy sendiri, pakai selamanya.",
  price: "79",
  features: [
    "Unlimited device & produk",
    "Multi-outlet dashboard",
    "Custom logo & warna brand",
    "Cetak struk thermal",
    "Laporan penjualan dasar",
    "Backup & restore JSON",
    "Support WhatsApp 30 hari",
    "Update gratis selamanya",
  ],
  cta: "Dapatkan source code",
  href: "#beli",
};

const addons = [
  {
    name: "Custom logo & warna",
    description: "Bawa identitas brand warung kamu.",
    price: "30",
  },
  {
    name: "Support WA 30 hari",
    description: "Tanya jawab langsung via WhatsApp.",
    price: "50",
  },
  {
    name: "Setup guided Zoom",
    description: "Dipandu pasang & setting 1 jam.",
    price: "75",
  },
];

export function LandingPricing() {
  return (
    <section
      id="harga"
      className="relative border-t border-border/60 bg-gradient-to-b from-amber-50/40 via-background to-background py-24 sm:py-32 dark:from-amber-950/10"
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
            <span className="mr-2 text-muted-foreground/60">/04</span> Harga
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Bayar{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              sekali
            </span>
            . Pakai{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              selamanya
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
            Gak ada biaya bulanan. Gak ada biaya tersembunyi. Gak ada kenaikan
            harga diam-diam. Sekali bayar, source code milik kamu selamanya.
          </p>
        </motion.div>

        {/* Main plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mx-auto mt-14 max-w-xl"
        >
          <div className="relative flex flex-col rounded-2xl border border-foreground bg-foreground p-7 text-background shadow-2xl shadow-foreground/15 sm:p-8">
            <div className="absolute -top-3 right-6 rounded-full bg-amber-400 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-amber-950">
              Akses selamanya
            </div>

            <h3
              className="font-display text-[28px] font-medium leading-tight tracking-[-0.01em]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
            >
              {mainPlan.name}
            </h3>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-background/75">
              {mainPlan.description}
            </p>

            <div className="mt-7">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-[13px] font-medium">Rp</span>
                <span
                  className="font-display text-[72px] font-normal leading-none tracking-[-0.03em]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                >
                  {mainPlan.price}
                </span>
                <span className="font-mono text-[13px]">rb</span>
              </div>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-background/60">
                sekali bayar
              </p>
            </div>

            <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {mainPlan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-[14px] leading-[1.5]"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-amber-400"
                    strokeWidth={2.2}
                  />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href={mainPlan.href}
              className="group mt-8 inline-flex items-center justify-center gap-1.5 rounded-full bg-background px-5 py-3 text-[14px] font-medium text-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {mainPlan.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Add-ons */}
        <div className="mt-10">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
          >
            Tambahan opsional
          </motion.p>
          <div className="mx-auto mt-5 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
            {addons.map((addon, i) => (
              <motion.div
                key={addon.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-md hover:shadow-amber-500/5"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Add-on
                  </span>
                  <Plus
                    className="h-3.5 w-3.5 text-muted-foreground/60 transition-colors group-hover:text-amber-600"
                    strokeWidth={2.2}
                  />
                </div>
                <h4
                  className="mt-3 font-display text-[17px] font-medium leading-tight tracking-[-0.01em]"
                  style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                >
                  {addon.name}
                </h4>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-muted-foreground">
                  {addon.description}
                </p>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    +
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    Rp
                  </span>
                  <span
                    className="font-display text-[26px] font-normal leading-none tracking-[-0.02em]"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                  >
                    {addon.price}
                  </span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    rb
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-14 text-center text-[14px] text-muted-foreground"
        >
          Termasuk source code lengkap, deploy guide, dan akses ke update.{" "}
          <span className="font-semibold text-foreground">
            Garansi uang kembali 7 hari
          </span>
          , tanpa syarat.
        </motion.p>
      </div>
    </section>
  );
}
