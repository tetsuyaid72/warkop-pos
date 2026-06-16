"use client";

import { motion } from "motion/react";
import {
  Coffee,
  BarChart3,
  Receipt,
  Smartphone,
  Lock,
  RefreshCw,
} from "lucide-react";

const features = [
  {
    icon: Coffee,
    title: "Dibuat dari ritme warung kopi",
    description:
      "Bukan adaptasi software ritel. Dirancang setelah ngobrol sama puluhan owner warung — tahu persis apa yang dibutuhin saat jam sibuk.",
  },
  {
    icon: BarChart3,
    title: "Tahu bisnis kamu, setiap hari",
    description:
      "Menu mana yang paling laris, jam berapa yang paling rame, kasir siapa yang paling cepat. Semua otomatis muncul di dashboard.",
  },
  {
    icon: Receipt,
    title: "Struk yang pelanggan ingat",
    description:
      "Format thermal 58mm/80mm yang rapi, dengan logo dan pesan brand kamu. Bukan cuma struk — itu mini marketing.",
  },
  {
    icon: Smartphone,
    title: "Terima semua jenis pembayaran",
    description:
      "QRIS, GoPay, OVO, DANA, debit, tunai — semua masuk ke satu laporan. Gak perlu ribet rekam manual lagi.",
  },
  {
    icon: Lock,
    title: "Data milik kamu sepenuhnya",
    description:
      "Tersimpan di device kamu, bukan server kami. Gak ada yang bisa ambil, gak ada yang bisa lihat. Privasi itu hak.",
  },
  {
    icon: RefreshCw,
    title: "Pindah device? Gampang.",
    description:
      "Export semua data ke JSON, restore di mana aja. Buka cabang baru, ganti tablet, atau upgrade device — semua data aman.",
  },
];

export function LandingFeatures() {
  return (
    <section
      id="fitur"
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
            <span className="mr-2 text-muted-foreground/60">/01</span> Fitur
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Enam hal yang{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              sebenernya
            </span>{" "}
            kamu butuhin.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
            Bukan 47 fitur yang bikin pusing. Cuma yang benar-benar kepake di
            warung kopi setiap hari.
          </p>
        </motion.div>

        {/* Features list */}
        <div className="mt-16 sm:mt-20">
          <div className="divide-y divide-border/60 border-y border-border/60">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative grid grid-cols-1 gap-5 py-8 transition-colors sm:grid-cols-12 sm:gap-8 sm:py-10"
              >
                <div className="sm:col-span-1">
                  <div className="font-mono text-[12px] text-muted-foreground">
                    0{i + 1}
                  </div>
                </div>

                <div className="flex items-start sm:col-span-1">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100/70 transition-transform group-hover:scale-110 group-hover:rotate-3 dark:bg-amber-900/30">
                    <feature.icon
                      className="h-5 w-5 text-amber-800 dark:text-amber-300"
                      strokeWidth={1.6}
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <h3
                    className="font-display text-[22px] font-medium leading-tight tracking-[-0.01em]"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                  >
                    {feature.title}
                  </h3>
                </div>

                <div className="sm:col-span-6">
                  <p className="text-pretty text-[15.5px] leading-[1.65] text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
