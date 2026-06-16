import "../globals.css";

export const metadata = {
  title: "Pesan dari Meja — Warung Kopi",
  description:
    "Pilih menu favoritmu, kirim pesanan langsung ke kasir. Bayar di kasir setelah pesanan siap.",
};

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">{children}</div>
  );
}
