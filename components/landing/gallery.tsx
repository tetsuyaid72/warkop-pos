"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const photos = [
  { src: "/galeri/1.webp", caption: "Golden Hour", alt: "Golden hour di Sunset Caffe" },
  { src: "/galeri/2.webp", caption: "Outdoor Vibes", alt: "Suasana outdoor Sunset Caffe" },
  { src: "/galeri/3.webp", caption: "Coffee + Sunset", alt: "Kopi dengan view sunset" },
  { src: "/galeri/4.webp", caption: "Our Corner", alt: "Sudut favorit Sunset Caffe" },
  { src: "/galeri/5.webp", caption: "Brew & Chill", alt: "Brewing corner Sunset Caffe" },
  { src: "/galeri/6.webp", caption: "The View", alt: "Pemandangan sekitar cafe" },
  { src: "/galeri/7.webp", caption: "Pet Friendly", alt: "Area pet friendly" },
  { src: "/galeri/8.webp", caption: "Acoustic Night", alt: "Malam acoustic session" },
];

const bentoClasses = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-2 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
  "lg:col-span-1 lg:row-span-1",
];

const cellAspect = [
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-square",
  "aspect-[2/1]",
  "aspect-square",
  "aspect-square",
];

const rotations = [
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-2",
  "-rotate-1",
  "rotate-1",
  "-rotate-2",
  "rotate-1",
];

export function LandingGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const closeLightbox = useCallback(() => setSelectedIndex(null), []);
  const nextPhoto = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i + 1) % photos.length,
    );
  }, []);
  const prevPhoto = useCallback(() => {
    setSelectedIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextPhoto();
      if (e.key === "ArrowLeft") prevPhoto();
    };

    window.addEventListener("keydown", handleKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedIndex, closeLightbox, nextPhoto, prevPhoto]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) prevPhoto();
      else nextPhoto();
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="galeri"
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
            <span className="mr-2 text-muted-foreground/60">/01</span> Galeri
          </p>
          <h2
            className="mt-5 text-balance font-display text-[2.4rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[3rem] lg:text-[3.6rem]"
            style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
          >
            Indahnya{" "}
            <span
              className="font-display-italic"
              style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
            >
              Sunset Caffe
            </span>
            .
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-pretty text-[16.5px] leading-[1.65] text-muted-foreground">
            Delapan sudut yang bikin kamu pengen balik lagi.
          </p>
        </motion.div>

        {/* Bento grid - Tablet & Desktop */}
        <div className="mt-16 hidden grid-cols-2 gap-3 sm:grid sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {photos.map((photo, i) => (
            <motion.button
              key={photo.src}
              type="button"
              onClick={() => setSelectedIndex(i)}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-lg transition-all duration-300 hover:shadow-2xl",
                bentoClasses[i],
                cellAspect[i],
                rotations[i],
                "hover:scale-[1.02] hover:rotate-0",
              )}
              aria-label={`Lihat foto ${i + 1}: ${photo.caption}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 via-transparent to-rose-500/10 transition-opacity duration-300 group-hover:opacity-90" />
              <div className="absolute bottom-2 left-2 text-left">
                <span className="inline-block rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-foreground shadow-sm backdrop-blur-sm">
                  {photo.caption}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Mobile: Horizontal carousel */}
        <div className="mt-12 sm:hidden">
          <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4">
            {photos.map((photo, i) => (
              <motion.button
                key={photo.src}
                type="button"
                onClick={() => setSelectedIndex(i)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group relative aspect-square w-[80vw] shrink-0 snap-center overflow-hidden rounded-2xl border-[5px] border-white bg-white shadow-lg"
                aria-label={`Lihat foto ${i + 1}: ${photo.caption}`}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="80vw"
                  className="object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-amber-950/50 via-transparent to-rose-500/10" />
                <div className="absolute bottom-3 left-3 text-left">
                  <span className="inline-block rounded-full bg-background/90 px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground shadow-sm backdrop-blur-sm">
                    {photo.caption}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
          <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Swipe untuk lihat lebih
          </p>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`Foto ${selectedIndex + 1} dari ${photos.length}: ${photos[selectedIndex].caption}`}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
              aria-label="Tutup lightbox"
            >
              <X className="h-5 w-5" strokeWidth={2} />
            </button>

            <div className="absolute left-4 top-4 z-10 rounded-full bg-white/10 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:left-6 sm:top-6">
              {selectedIndex + 1} / {photos.length}
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20 sm:flex"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>

            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative h-full max-h-[80vh] w-full max-w-5xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={photos[selectedIndex].src}
                alt={photos[selectedIndex].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 90vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm sm:bottom-6">
              <p className="text-center text-[13px] text-white">
                <span className="font-mono font-semibold uppercase tracking-[0.18em]">
                  {photos[selectedIndex].caption}
                </span>
                <span className="mx-2 text-white/40">·</span>
                <span className="font-display-italic">Sunset Caffe</span>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}