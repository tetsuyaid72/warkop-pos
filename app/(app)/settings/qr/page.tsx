"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Copy, ExternalLink, Printer, QrCode as QrIcon } from "lucide-react";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode } from "@/components/shared/qr-code";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { getSiteUrl } from "@/lib/site-url";
import { useToast } from "@/components/ui/toast";
import type { Outlet } from "@/types/order";

export default function SettingsQrPage() {
  const { toast } = useToast();
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [loading, setLoading] = useState(true);
  const [configured, setConfigured] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!isSupabaseConfigured()) {
        if (!cancelled) {
          setConfigured(false);
          setLoading(false);
        }
        return;
      }
      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from("outlets")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: true })
          .limit(1)
          .maybeSingle();
        if (cancelled) return;
        if (error) throw error;
        setOutlet((data as Outlet | null) ?? null);
      } catch (err) {
        if (!cancelled) {
          console.error(err);
          toast({
            type: "error",
            title: "Gagal memuat QR",
            description: "Cek koneksi Supabase Anda.",
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [toast]);

  if (!configured) {
    return (
      <ContentContainer>
        <PageHeader
          title="QR & E-Catalog"
          description="Generate QR statis untuk ditempel di meja"
        />
        <Card className="mt-5 p-6">
          <h3 className="text-base font-semibold sm:text-lg">
            Supabase belum dikonfigurasi
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Tambahkan <code className="rounded bg-muted px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_URL</code>{" "}
            dan <code className="rounded bg-muted px-1.5 py-0.5">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            di <code className="rounded bg-muted px-1.5 py-0.5">.env.local</code>{" "}
            lalu jalankan migration SQL.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            File migration:{" "}
            <code className="rounded bg-muted px-1.5 py-0.5">
              supabase/migrations/0001_init.sql
            </code>
          </p>
        </Card>
      </ContentContainer>
    );
  }

  const orderUrl = outlet
    ? `${getSiteUrl()}/order?o=${outlet.slug}&t=${outlet.qr_token}`
    : "";

  const handleCopy = async () => {
    if (!orderUrl) return;
    try {
      await navigator.clipboard.writeText(orderUrl);
      setCopied(true);
      toast({ type: "success", title: "URL disalin" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ type: "error", title: "Gagal menyalin" });
    }
  };

  return (
    <ContentContainer>
      <PageHeader
        title="QR & E-Catalog"
        description="Generate QR statis untuk ditempel di meja"
        actions={
          outlet ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="print:hidden"
            >
              <Printer className="h-4 w-4" />
              Print
            </Button>
          ) : null
        }
      />

      {loading ? (
        <Card className="mt-5 p-8 text-center text-sm text-muted-foreground">
          Memuat…
        </Card>
      ) : !outlet ? (
        <Card className="mt-5 p-8 text-center">
          <QrIcon className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-3 text-sm text-muted-foreground">
            Belum ada outlet. Jalankan migration SQL untuk seed outlet default.
          </p>
        </Card>
      ) : (
        <>
          {/* Big preview card — printable */}
          <div className="mt-5 print:mt-0">
            <Card className="grain overflow-hidden p-0 print:border-0 print:shadow-none">
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* QR side */}
                <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-amber-50/70 via-background to-orange-50/50 p-8 dark:from-amber-950/20 dark:to-orange-950/10 md:p-10">
                  <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-foreground/10">
                    <QrCode value={orderUrl} size={220} margin={1} />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber-800/80 dark:text-amber-300/80">
                    Scan untuk pesan
                  </p>
                </div>
                {/* Info side */}
                <div className="flex flex-col justify-center gap-4 p-8 md:p-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-amber-700 dark:text-amber-400">
                    <span className="mr-1.5 text-muted-foreground/60">/</span>
                    Meja · QR
                  </p>
                  <h2
                    className="font-display text-[2rem] leading-[1.05] tracking-[-0.02em]"
                    style={{ fontVariationSettings: '"opsz" 144, "SOFT" 20' }}
                  >
                    {outlet.name}
                  </h2>
                  <p className="text-pretty text-[15px] leading-[1.65] text-muted-foreground">
                    Scan QR di atas pakai HP kamu, pilih menu favorit, isi nama
                    & nomor meja, lalu kirim. Pesanan kamu akan{" "}
                    <span className="font-semibold text-foreground">
                      langsung muncul di kasir
                    </span>
                    . Bayar di kasir setelah pesanan selesai.
                  </p>
                  <div className="mt-2 rounded-xl border border-dashed border-border bg-muted/30 p-3">
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      URL
                    </p>
                    <p className="mt-1 break-all text-[12.5px] text-foreground/80">
                      {orderUrl}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 print:hidden">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                    >
                      <Copy className="h-4 w-4" />
                      {copied ? "Tersalin" : "Salin URL"}
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/order?o=${outlet.slug}&t=${outlet.qr_token}`} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                        Coba buka
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Instructions */}
          <Card className="mt-5 p-5 print:hidden">
            <h3 className="text-sm font-semibold sm:text-base">
              Cara pakai
            </h3>
            <ol className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[10px] font-medium text-background">
                  1
                </span>
                <span>
                  Klik <strong>Print</strong> di kanan atas. Pilih ukuran A6 atau
                  A4, lalu potong.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[10px] font-medium text-background">
                  2
                </span>
                <span>
                  Tempel stiker di setiap meja (sudut yang mudah di-scan dari
                  posisi duduk).
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-foreground font-mono text-[10px] font-medium text-background">
                  3
                </span>
                <span>
                  Customer scan → pesan dari HP mereka. Notifikasi muncul{" "}
                  <strong>real-time</strong> di POS kasir.
                </span>
              </li>
            </ol>
            <div className="mt-5 rounded-xl border border-amber-200/60 bg-amber-50/40 p-3 text-[12.5px] text-amber-900/80 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-200/80">
              <strong>Tips:</strong> Kalau belum setup Supabase, scan QR ini
              dulu di HP kamu untuk cek tampilan catalog. Menu yang tampil
              berasal dari data yang sama dengan POS.
            </div>
          </Card>
        </>
      )}
    </ContentContainer>
  );
}
