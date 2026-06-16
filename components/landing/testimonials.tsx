"use client";

import { motion } from "motion/react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "Dulu saya tutup buku jam 11 malam, sekarang jam 9 udah bisa pulang. Laporannya udah ada semua.",
    author: "Pak Rudi",
    role: "Pemilik Kopi Bahari",
    location: "Bandung",
    initials: "RB",
  },
  {
    quote:
      "Yang bikin suka: pas buka cabang kedua, data dari outlet pertama tinggal export, restore di device baru. Beres.",
    author: "Bu Sari",
    role: "Pemilik Kopi Tuang 24",
    location: "Jakarta",
    initials: "SK",
  },
  {
    quote:
      "Anak kasir saya baru SMP, gak butuh training khusus. Tinggal dikasih tau 10 menit, langsung ngerti.",
    author: "Mas Dimas",
    role: "Pemilik Dims Coffee",
    location: "Surabaya",
    initials: "DA",
  },
];

export function LandingTestimonials() {
  return (
    <section
      id="testimoni"
      className="border-t border-border/60 py-24 sm:py-32"
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
            <span className="mr-2 text-muted-foreground/60">/03</span> Testimoni
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Cerita dari mereka{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              yang udah pakai
            </span>
            .
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group relative flex flex-col rounded-2xl border border-border/60 bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-500/5 sm:p-8 dark:hover:border-amber-700/40"
            >
              <Quote className="h-5 w-5 text-amber-600/50 dark:text-amber-400/50" />

              <blockquote
                className="mt-5 flex-1 font-display text-[18px] font-normal leading-[1.45] tracking-[-0.01em] text-foreground/90"
                style={{ fontVariationSettings: '"opsz" 144, "SOFT" 30' }}
              >
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-7 flex items-center gap-3 border-t border-border/60 pt-5">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-orange-300 font-display text-[14px] font-medium text-amber-900 dark:from-amber-700 dark:to-orange-700 dark:text-amber-100">
                  {t.initials}
                </div>
                <div className="flex-1">
                  <p className="text-[14px] font-semibold leading-tight">
                    {t.author}
                  </p>
                  <p className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
                    {t.role} · {t.location}
                  </p>
                </div>
                <div className="flex">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      className="h-3 w-3 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
