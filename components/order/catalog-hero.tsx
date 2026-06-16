export function CatalogHero({ outletName }: { outletName: string }) {
  return (
    <section className="relative pt-6">
      <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
        <span className="mr-1.5 text-muted-foreground/60">/</span> Pesan dari
        meja
      </p>
      <h1
        className="mt-2 text-balance font-display text-[1.9rem] font-normal leading-[1.05] tracking-[-0.02em] sm:text-[2.4rem]"
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
      >
        Pilih menu,
        <br />
        <span
          className="font-display-italic"
          style={{ fontVariationSettings: '"opsz" 144, "SOFT" 60' }}
        >
          biar kami
        </span>{" "}
        yang siapin.
      </h1>
      <p className="mt-3 max-w-md text-pretty text-[14.5px] leading-[1.6] text-muted-foreground">
        Pesanan kamu akan langsung terkirim ke kasir{" "}
        <span className="font-medium text-foreground">{outletName}</span>. Bayar
        di kasir setelah pesanan sampai di meja kamu.
      </p>
    </section>
  );
}
