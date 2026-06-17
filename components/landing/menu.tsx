"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

import { mockProducts } from "@/data/mock-products";

const productImages: Record<string, string> = {
  Americano: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80",
  Cappuccino: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&q=80",
  "Cafe Latte": "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=800&q=80",
  "Caramel Latte": "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=800&q=80",
  "Kopi Susu Aren": "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80",
  "Matcha Latte": "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&q=80",
  "Thai Tea": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&q=80",
  "French Fries": "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80",
};

const defaultImage =
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80";

const categoryEmoji: Record<string, string> = {
  Coffee: "\u2615",
  "Non Coffee": "\uD83C\uDF75",
  Tea: "\uD83E\uDDCB",
  Snack: "\uD83C\uDF5F",
  Food: "\uD83E\uDD50",
  Dessert: "\uD83C\uDF6B",
};

const bestSellers = mockProducts
  .filter((product) => product.isBestSeller)
  .slice(0, 8);

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

export function LandingMenu() {
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  return (
    <section
      id="menu"
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
            <span className="mr-2 text-muted-foreground/60">/02</span> Menu
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Menu favorit yang selalu bikin{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              orang balik lagi
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
            Pilihan best seller kami — dari kopi signature sampai comfort food
            buat nemenin senja kamu.
          </p>
        </motion.div>

        {/* Menu grid */}
        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card transition-all hover:-translate-y-1 hover:border-amber-300/60 hover:shadow-lg hover:shadow-amber-500/5 dark:hover:border-amber-700/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-amber-100/60 via-orange-50/40 to-rose-100/30 dark:from-amber-950/30 dark:via-orange-950/20 dark:to-rose-950/20">
                {imgErrors[product.id] ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      aria-hidden
                      className="text-7xl opacity-70 drop-shadow-sm sm:text-8xl"
                    >
                      {categoryEmoji[product.category] ?? "\u2615"}
                    </span>
                  </div>
                ) : (
                  <Image
                    src={productImages[product.name] ?? defaultImage}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={() =>
                      setImgErrors((prev) => ({ ...prev, [product.id]: true }))
                    }
                  />
                )}
                <div className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-amber-950">
                  Best Seller
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-700/80 dark:text-amber-400/80">
                      {product.category}
                    </p>
                    <h3
                      className="mt-1 font-display text-[20px] font-medium leading-tight tracking-[-0.01em]"
                      style={{
                        fontVariationSettings: '"opsz" 144, "SOFT" 30',
                      }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <p
                    className="font-display text-[16px] font-medium leading-none tracking-tight text-foreground"
                    style={{
                      fontVariationSettings: '"opsz" 144, "SOFT" 30',
                    }}
                  >
                    {formatPrice(product.price)}
                  </p>
                </div>
                <p className="mt-3 text-[13.5px] leading-[1.55] text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-12 text-center text-[14px] text-muted-foreground"
        >
          Lihat semua menu lengkap?{" "}
          <span className="font-semibold text-foreground">Scan QR di meja</span>{" "}
          kamu, atau langsung order di kasir.
        </motion.p>
      </div>
    </section>
  );
}