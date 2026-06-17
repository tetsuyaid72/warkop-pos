"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Jam buka Sunset Caffe berapa?",
    a: "Weekday (Senin-Jumat) buka dari jam 15.00 sampai 23.00 WIB. Weekend (Sabtu-Minggu) buka lebih awal, dari jam 14.00 sampai 00.00 WIB. Buka setiap hari termasuk hari libur nasional.",
  },
  {
    q: "Di mana lokasi persisnya?",
    a: "Kami ada di CM3X+GHR, Jl. Industri, Padang, Kec. Bati Bati, Kabupaten Tanah Laut, Kalimantan Selatan 70853. Parkir motor & mobil luas, gratis untuk semua pelanggan.",
  },
  {
    q: "Bisa reservasi tempat untuk acara atau group?",
    a: "Bisa banget. Untuk group kecil (4-8 orang) bisa langsung dateng. Untuk group besar atau acara (10+ orang), hubungi kami via WhatsApp minimal H-1 supaya kami siapin tempatnya.",
  },
  {
    q: "Ada WiFi gratis?",
    a: "Ada, kencang, dan gratis untuk semua pelanggan. Password WiFi ada di meja, atau bisa tanya langsung ke barista. Cocok buat WFC, Zoom-call, atau nge-draft skripsi.",
  },
  {
    q: "Boleh bawa hewan peliharaan?",
    a: "Boleh banget, kami pet friendly! Area outdoor recommended buat yang bawa anjing atau kucing. Kami juga sediain water bowl dan treats — tapi tetap diawasi ya, biar nyaman buat semua pelanggan.",
  },
  {
    q: "Metode pembayaran apa aja yang didukung?",
    a: "QRIS, GoPay, OVO, DANA, ShopeePay, debit (BCA, Mandiri, BNI), dan tunai. Semua metode didukung untuk dine-in, takeaway, dan nanti juga delivery.",
  },
  {
    q: "Ada menu vegetarian atau vegan?",
    a: "Ada beberapa. Pilihan vegan-friendly: Lemon Tea, Lychee Tea, Oat Milk Latte (pakai oat milk), dan beberapa snack. Tanyakan ke barista untuk rekomendasi yang sesuai diet kamu.",
  },
];

export function LandingFAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border/60 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
            <span className="mr-2 text-muted-foreground/60">/07</span> Pertanyaan
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Hal yang{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              sering
            </span>{" "}
            ditanyain.
          </h2>
        </motion.div>

        {/* FAQ list */}
        <div className="mt-14 divide-y divide-border/60 border-y border-border/60">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-foreground sm:py-6"
                >
                  <span
                    className="font-display text-[18px] font-medium leading-snug tracking-[-0.005em] sm:text-[20px]"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
                  >
                    {faq.q}
                  </span>
                  <Plus
                    className={cn(
                      "h-4 w-4 shrink-0 text-amber-700 transition-transform duration-300 dark:text-amber-400",
                      isOpen && "rotate-45",
                    )}
                    strokeWidth={2}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 text-pretty text-[15.5px] leading-[1.7] text-muted-foreground">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="mt-12 text-center text-[14.5px] text-muted-foreground">
          Masih ada pertanyaan lain?{" "}
          <Link
            href="https://wa.me/6281234567890"
            className="font-semibold text-foreground underline decoration-amber-400 underline-offset-4 transition-colors hover:text-amber-700"
          >
            Chat tim kami di WhatsApp
          </Link>
        </p>
      </div>
    </section>
  );
}