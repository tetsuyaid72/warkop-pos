"use client";

import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Pesan & unduh source code",
    description:
      "Selesaikan pembayaran, dan dalam 1x24 jam source code lengkap dikirim ke email kamu. Plus video setup guide.",
    detail: "Source code · Setup guide · Video tutorial",
  },
  {
    number: "02",
    title: "Setup warung kamu, 15 menit",
    description:
      "Login, isi nama warung, atur menu, pilih warna brand. Atau biarin tim kami yang setupin via Zoom — gratis.",
    detail: "Nama outlet · Menu · Logo · Warna brand",
  },
  {
    number: "03",
    title: "Langsung jualan, seperti biasa",
    description:
      "Buka di tablet atau HP, mulai catet pesanan. Pelanggan bayar, struk keluar, laporan ke-update otomatis.",
    detail: "POS · Struk · Laporan · Backup",
  },
];

export function LandingHowItWorks() {
  return (
    <section
      id="cerita"
      className="relative border-t border-border/60 bg-gradient-to-b from-amber-50/40 via-background to-background py-24 sm:py-32 dark:from-amber-950/10"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Left header */}
          <div className="lg:col-span-5">
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400"
            >
              <span className="mr-2 text-muted-foreground/60">/02</span> Cara
              mulai
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
            >
              Dari checkout{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                pertama
              </span>{" "}
              ke pesanan{" "}
              <span
                className="font-display-italic"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
              >
                pertama
              </span>{" "}
              warung kamu.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 max-w-md text-pretty text-[16.5px] leading-[1.65] text-muted-foreground"
            >
              Tiga langkah sederhana. Gak perlu training berhari-hari, gak
              perlu panggil IT, gak perlu ganti workflow warung kamu.
            </motion.p>
          </div>

          {/* Right steps */}
          <div className="lg:col-span-7">
            <div className="space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative grid grid-cols-12 gap-4 border-l-2 border-amber-300/60 pl-7 dark:border-amber-700/40"
                >
                  <div className="col-span-2">
                    <div
                      className="font-display text-[2.5rem] font-normal leading-none tracking-[-0.02em] text-amber-700/80 dark:text-amber-400/80"
                      style={{
                        fontVariationSettings: '"opsz" 144, "SOFT" 40',
                      }}
                    >
                      {step.number}
                    </div>
                  </div>
                  <div className="col-span-10">
                    <h3
                      className="font-display text-[22px] font-medium leading-tight tracking-[-0.01em]"
                      style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                    >
                      {step.title}
                    </h3>
                    <p className="mt-2.5 text-pretty text-[15.5px] leading-[1.65] text-muted-foreground">
                      {step.description}
                    </p>
                    <p className="mt-3.5 font-mono text-[11px] uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
                      {step.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
