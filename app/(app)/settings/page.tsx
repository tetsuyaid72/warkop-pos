"use client";

export const dynamic = "force-dynamic";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { settingSchema, type SettingFormValues } from "@/schemas/setting-schema";
import { useSettingStore } from "@/stores/setting-store";
import { useProductStore } from "@/stores/product-store";
import { useTransactionStore } from "@/stores/transaction-store";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/components/ui/toast";
import { useTheme } from "@/components/theme-provider";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { Save, RefreshCcw, Download, Upload, Sun, Moon, Monitor, QrCode } from "lucide-react";

export default function SettingsPage() {
  const settings = useSettingStore((s) => s.settings);
  const updateSettings = useSettingStore((s) => s.updateSettings);
  const resetSettings = useSettingStore((s) => s.resetSettings);
  const resetProducts = useProductStore((s) => s.resetProducts);
  const resetTransactions = useTransactionStore((s) => s.resetTransactions);
  const importTransactions = useTransactionStore((s) => s.importTransactions);
  const importProducts = useProductStore((s) => s.importProducts);
  const resetCategories = useCategoryStore((s) => s.resetCategories);
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [resetOpen, setResetOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<SettingFormValues>({
    resolver: zodResolver(settingSchema) as Resolver<SettingFormValues>,
    defaultValues: settings,
  });

  const onSubmit = (data: SettingFormValues) => {
    updateSettings(data);
    toast({ type: "success", title: "Pengaturan disimpan" });
  };

  const handleReset = () => {
    resetSettings();
    resetProducts();
    resetCategories();
    resetTransactions();
    toast({ type: "info", title: "Data direset", description: "Semua data dikembalikan ke kondisi awal." });
    setResetOpen(false);
    setTimeout(() => window.location.reload(), 500);
  };

  const handleExport = () => {
    const data = {
      transactions: useTransactionStore.getState().transactions,
      products: useProductStore.getState().products,
      categories: useCategoryStore.getState().categories,
      settings: useSettingStore.getState().settings,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `warkop-coffee-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast({ type: "success", title: "Data diekspor" });
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (data.transactions) importTransactions(data.transactions);
        if (data.products) importProducts(data.products);
        toast({ type: "success", title: "Data diimpor", description: "Halaman akan dimuat ulang." });
        setTimeout(() => window.location.reload(), 800);
      } catch {
        toast({ type: "error", title: "Gagal import", description: "File tidak valid." });
      }
    };
    reader.readAsText(file);
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Pengaturan"
        description="Konfigurasi outlet dan preferensi aplikasi"
        actions={
          <Button asChild variant="outline" size="sm">
            <Link href="/settings/qr">
              <QrCode className="h-4 w-4" />
              QR & E-Catalog
            </Link>
          </Button>
        }
      />

      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Informasi Outlet</h3>
          <p className="text-xs text-muted-foreground">Detail toko Anda</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs">Nama Outlet</Label>
              <Input {...register("outletName")} className="mt-1.5 h-9 text-sm" />
              {errors.outletName && <p className="mt-1 text-xs text-destructive">{errors.outletName.message}</p>}
            </div>
            <div>
              <Label className="text-xs">Alamat</Label>
              <Input {...register("outletAddress")} className="mt-1.5 h-9 text-sm" />
            </div>
            <div>
              <Label className="text-xs">Nomor WhatsApp</Label>
              <Input {...register("outletPhone")} className="mt-1.5 h-9 text-sm" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Pajak & Service</h3>
          <p className="text-xs text-muted-foreground">Atur nilai default</p>
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <Label className="text-xs">Pajak (%)</Label>
              <Input
                {...register("taxPercentage")}
                type="number"
                step="0.5"
                className="mt-1.5 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Service Charge (%)</Label>
              <Input
                {...register("serviceChargePercentage")}
                type="number"
                step="0.5"
                className="mt-1.5 h-9 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs">Mata Uang</Label>
              <Input {...register("currency")} className="mt-1.5 h-9 text-sm" />
            </div>
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <h3 className="text-sm font-semibold sm:text-base">Tampilan</h3>
          <p className="text-xs text-muted-foreground">Mode terang atau gelap</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              { v: "light", l: "Terang", I: Sun },
              { v: "dark", l: "Gelap", I: Moon },
              { v: "system", l: "Sistem", I: Monitor },
            ].map((opt) => (
              <button
                key={opt.v}
                type="button"
                onClick={() => {
                  setTheme(opt.v as "light" | "dark" | "system");
                  updateSettings({ theme: opt.v as "light" | "dark" | "system" });
                }}
                suppressHydrationWarning
                className={
                  "flex flex-col items-center gap-1 rounded-xl border p-3 text-xs font-medium transition-colors " +
                  (mounted && theme === opt.v ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground")
                }
              >
                <opt.I className="h-4 w-4" />
                {opt.l}
              </button>
            ))}
          </div>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={!isDirty}>
            <Save className="h-4 w-4" />
            Simpan Pengaturan
          </Button>
        </div>
      </form>

      <Card className="mt-4 p-4 sm:p-5">
        <h3 className="text-sm font-semibold sm:text-base">Data</h3>
        <p className="text-xs text-muted-foreground">Backup, restore, atau reset data mock</p>
        <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Button variant="outline" onClick={handleExport} type="button">
            <Download className="h-4 w-4" />
            Export JSON
          </Button>
          <label className="inline-flex">
            <input type="file" accept=".json" onChange={handleImport} className="hidden" id="import-file" />
            <Button variant="outline" type="button" onClick={() => document.getElementById("import-file")?.click()} className="w-full">
              <Upload className="h-4 w-4" />
              Import JSON
            </Button>
          </label>
          <Button variant="destructive" onClick={() => setResetOpen(true)} type="button">
            <RefreshCcw className="h-4 w-4" />
            Reset Data
          </Button>
        </div>
      </Card>

      <ConfirmDialog
        open={resetOpen}
        onOpenChange={setResetOpen}
        title="Reset semua data?"
        description="Tindakan ini akan mengembalikan semua menu, transaksi, dan pengaturan ke kondisi awal. Tidak dapat dibatalkan."
        confirmText="Ya, Reset"
        onConfirm={handleReset}
      />
    </ContentContainer>
  );
}