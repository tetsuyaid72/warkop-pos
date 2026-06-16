"use client";

import { useEffect, useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { productSchema, type ProductFormValues } from "@/schemas/product-schema";
import { useCategoryStore } from "@/stores/category-store";
import { useProductStore } from "@/stores/product-store";
import { useToast } from "@/components/ui/toast";
import type { Product, Addon, Variant } from "@/types/product";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { compressImage } from "@/lib/image-utils";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/format-currency";

export function ProductForm({
  open,
  onOpenChange,
  product,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  product?: Product | null;
}) {
  const categories = useCategoryStore((s) => s.categories).filter((c) => c.isActive);
  const addProduct = useProductStore((s) => s.addProduct);
  const updateProduct = useProductStore((s) => s.updateProduct);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema) as Resolver<ProductFormValues>,
    defaultValues: {
      name: "",
      category: categories[0]?.name ?? "",
      price: 0,
      description: "",
      image: "",
      isAvailable: true,
      isBestSeller: false,
      stock: 0,
      variants: ["hot", "iced"],
      addons: [],
    },
  });

  const [addonDraft, setAddonDraft] = useState<{ name: string; price: number }>({ name: "", price: 0 });
  const watchAddons = watch("addons") || [];
  const watchVariants = watch("variants") || [];
  const watchIsBest = watch("isBestSeller");
  const watchIsAvail = watch("isAvailable");
  const watchImage = watch("image");
  const watchCategory = watch("category");

  // Reset form when dialog opens or product changes
  useEffect(() => {
    if (!open) return;
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description ?? "",
        image: product.image ?? "",
        isAvailable: product.isAvailable,
        isBestSeller: product.isBestSeller ?? false,
        stock: product.stock ?? 0,
        variants: product.variants ?? [],
        addons: product.addons ?? [],
      });
    }
  }, [open, product?.id, reset]);

  // For new products, reset on open using first available category
  const firstCategory = categories[0]?.name ?? "";
  useEffect(() => {
    if (!open || product) return;
    reset({
      name: "",
      category: firstCategory,
      price: 0,
      description: "",
      image: "",
      isAvailable: true,
      isBestSeller: false,
      stock: 0,
      variants: ["hot", "iced"],
      addons: [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product?.id, firstCategory]);

  const onSubmit = (data: ProductFormValues) => {
    if (product) {
      updateProduct(product.id, data);
      toast({ type: "success", title: "Produk diperbarui", description: data.name });
    } else {
      addProduct(data as Omit<Product, "id">);
      toast({ type: "success", title: "Produk ditambahkan", description: data.name });
    }
    onOpenChange(false);
  };

  const toggleVariant = (v: Variant) => {
    const current = watchVariants;
    if (current.includes(v)) {
      setValue("variants", current.filter((x) => x !== v));
    } else {
      setValue("variants", [...current, v]);
    }
  };

  const handleAddAddon = () => {
    if (!addonDraft.name || addonDraft.price < 0) return;
    const newAddon: Addon = {
      id: `a${Date.now()}`,
      name: addonDraft.name,
      price: Number(addonDraft.price) || 0,
    };
    setValue("addons", [...watchAddons, newAddon]);
    setAddonDraft({ name: "", price: 0 });
  };

  const handleRemoveAddon = (id: string) => {
    setValue(
      "addons",
      watchAddons.filter((a) => a.id !== id),
    );
  };

  const handleImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const compressed = await compressImage(file, { maxWidth: 600, maxHeight: 600, quality: 0.7 });
      setValue("image", compressed);
    } catch {
      toast({ type: "error", title: "Gagal memuat gambar" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={product ? "Edit Produk" : "Tambah Produk"}
        description="Lengkapi informasi produk"
        className="max-w-lg"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label className="text-xs">Foto Produk</Label>
            <div className="mt-1.5 flex items-center gap-3">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-dashed border-border bg-muted">
                {watchImage ? (
                  <img src={watchImage} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <ImageIcon className="h-6 w-6 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageFile}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="inline-flex h-9 cursor-pointer items-center justify-center rounded-lg border border-border bg-background px-3 text-xs font-medium hover:bg-muted"
                >
                  Pilih Foto
                </label>
                {watchImage && (
                  <button
                    type="button"
                    onClick={() => setValue("image", "")}
                    className="ml-2 text-xs text-destructive hover:underline"
                  >
                    Hapus
                  </button>
                )}
                <p className="mt-1 text-[10px] text-muted-foreground">PNG/JPG maks 2MB</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Label className="text-xs">Nama Produk</Label>
              <Input {...register("name")} className="mt-1.5 h-9 text-sm" placeholder="cth: Caramel Latte" />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div>
              <Label className="text-xs">Kategori</Label>
              <select
                {...register("category")}
                className="mt-1.5 h-9 w-full rounded-lg border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                value={watchCategory}
              >
                {categories.length === 0 && <option value="">Tidak ada kategori</option>}
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-destructive">{errors.category.message}</p>}
            </div>
            <div>
              <Label className="text-xs">Harga (Rp)</Label>
              <Input
                {...register("price")}
                type="number"
                className="mt-1.5 h-9 text-sm"
                placeholder="25000"
              />
              {errors.price && <p className="mt-1 text-xs text-destructive">{errors.price.message}</p>}
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Deskripsi</Label>
              <Textarea
                {...register("description")}
                className="mt-1.5 min-h-[60px] text-sm"
                placeholder="Deskripsi singkat..."
              />
            </div>
            <div>
              <Label className="text-xs">Stok (opsional)</Label>
              <Input
                {...register("stock")}
                type="number"
                className="mt-1.5 h-9 text-sm"
                placeholder="0"
              />
            </div>
            <div>
              <Label className="text-xs">Varian</Label>
              <div className="mt-1.5 flex gap-1.5">
                {(["hot", "iced"] as Variant[]).map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => toggleVariant(v)}
                    className={cn(
                      "flex-1 rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                      watchVariants.includes(v)
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {v === "hot" ? "Hot" : "Iced"}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label className="text-xs">Add-on</Label>
              <div className="mt-1.5 space-y-1.5">
                {watchAddons.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-lg border border-border bg-muted/50 px-2.5 py-1.5 text-xs"
                  >
                    <span className="font-medium">{a.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground">{formatCurrency(a.price)}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveAddon(a.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex gap-1.5">
                  <Input
                    value={addonDraft.name}
                    onChange={(e) => setAddonDraft({ ...addonDraft, name: e.target.value })}
                    placeholder="Nama add-on"
                    className="h-8 text-xs"
                  />
                  <Input
                    type="number"
                    value={addonDraft.price || ""}
                    onChange={(e) => setAddonDraft({ ...addonDraft, price: Number(e.target.value) || 0 })}
                    placeholder="Harga"
                    className="h-8 w-24 text-xs"
                  />
                  <Button type="button" size="sm" variant="outline" onClick={handleAddAddon}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="sm:col-span-2 flex flex-col gap-2.5 rounded-xl border border-border p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Tersedia</p>
                  <p className="text-[10px] text-muted-foreground">Tampilkan di POS</p>
                </div>
                <Switch
                  checked={watchIsAvail}
                  onCheckedChange={(v) => setValue("isAvailable", v)}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Best Seller</p>
                  <p className="text-[10px] text-muted-foreground">Tandai sebagai favorit</p>
                </div>
                <Switch
                  checked={watchIsBest}
                  onCheckedChange={(v) => setValue("isBestSeller", v)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {product ? "Simpan" : "Tambah"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}