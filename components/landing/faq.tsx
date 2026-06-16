"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Apa bedanya dengan POS SaaS seperti MOKA atau DealPOS?",
    a: "POS SaaS mengenakan biaya bulanan Rp 50.000–300.000 per bulan. Warung Kopi POS adalah source code yang kamu beli sekali dan deploy sendiri. Gak ada biaya berulang, dan data kamu gak disimpan di server pihak ketiga.",
  },
  {
    q: "Saya gaptek, beneran bisa setup sendiri?",
    a: "Bisa banget. Paket Coffee Shop dan Chain sudah termasuk sesi setup guided via Zoom 1 jam. Kamu cukup ikuti instruksi — gak perlu sentuh kode sama sekali.",
  },
  {
    q: "Data transaksi saya aman gak?",
    a: "Sangat aman. Semua data tersimpan lokal di browser device kamu (localStorage). Gak ada server kami yang menerima data pelanggan. Kamu bisa export ke JSON kapan saja.",
  },
  {
    q: "Bisa dipakai untuk usaha selain warung kopi?",
    a: "Bisa. Sistem ini fleksibel — cocok untuk kedai minuman, kafe kecil, bakery, atau retail sederhana. Kamu bisa custom kategori, produk, dan pajak sesuai jenis usaha.",
  },
  {
    q: "Kalau ada masalah, gimana caranya minta bantuan?",
    a: "Paket Coffee Shop dapat support WhatsApp 30 hari, dan Chain 90 hari. Kami fast response dan siap bantu. Plus ada komunitas owner Warung Kopi yang saling membantu.",
  },
  {
    q: "Kalau ternyata gak cocok, uang saya balik gak?",
    a: "Ya, kembali 100%. Garansi uang kembali 7 hari tanpa syarat. Kalau gak sesuai kebutuhan, tinggal minta refund via WhatsApp.",
  },
  {
    q: "Gimana sistem pembayarannya?",
    a: "Bisa transfer bank (BCA, Mandiri, BNI), e-wallet (GoPay, OVO, DANA), atau QRIS. Setelah pembayaran dikonfirmasi, source code dikirim ke email dalam 1x24 jam.",
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
            <span className="mr-2 text-muted-foreground/60">/05</span> Pertanyaan
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
            ditanyakan.
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
