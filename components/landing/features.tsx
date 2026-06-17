"use client";

import { motion } from "motion/react";
import {
  Sun,
  Coffee,
  Wifi,
  Users,
  Moon,
  Heart,
} from "lucide-react";

const features = [
  {
    icon: Sun,
    title: "Sunset view",
    description:
      "View matahari terbenam langsung dari sofa. Jam 17.00-18.30 tuh golden hour-nya, siap-siap untuk feed-able banget.",
  },
  {
    icon: Coffee,
    title: "Single origin beans",
    description:
      "Biji kopi pilihan dari Gayo, Toraja, Mandheling. Roast mingguan biar selalu fresh sampai di cangkir kamu.",
  },
  {
    icon: Users,
    title: "Cozy space",
    description:
      "Indoor & outdoor area, cocok buat sendiri, rame-rame, atau meeting kecil. Banyak stop kontak, banyak sudut tenang.",
  },
  {
    icon: Wifi,
    title: "Free WiFi kencang",
    description:
      "Buat yang WFC, nge-draft skripsi, atau Zoom-call. Password ada di meja, unlimited untuk semua pelanggan.",
  },
  {
    icon: Moon,
    title: "Open late",
    description:
      "Buka sampai malam buat yang suka senja. Tiap Jumat & Sabtu ada acoustic session mulai jam 19.00.",
  },
  {
    icon: Heart,
    title: "Pet friendly",
    description:
      "Bawa anjing atau kucing boleh, ada water bowl & treats-nya juga. Area outdoor recommended buat yang bawa pets.",
  },
];

export function LandingFeatures() {
  return (
    <section
      id="cerita"
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
            <span className="mr-2 text-muted-foreground/60">/02</span> Cerita
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Kenapa Sunset Caffe bukan{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              sekadar
            </span>{" "}
            café biasa.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
            Enam hal yang bikin orang balik lagi — bukan cuma soal kopinya, tapi
            soal tempat dan waktunya.
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