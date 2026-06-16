"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo } from "react";
import { ContentContainer } from "@/components/layout/content-container";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchInput } from "@/components/pos/search-input";
import { ProductCardItem } from "@/components/products/product-card-item";
import { ProductForm } from "@/components/products/product-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { EmptyState } from "@/components/shared/empty-state";
import { useProductStore } from "@/stores/product-store";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/components/ui/toast";
import { Plus, Package } from "lucide-react";
import type { Product } from "@/types/product";

export default function ProductsPage() {
  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories);

  const updateProduct = useProductStore((s) => s.updateProduct);
  const deleteProduct = useProductStore((s) => s.deleteProduct);
  const { toast } = useToast();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState<"all" | "available" | "unavailable">("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (categoryFilter !== "all" && p.category !== categoryFilter) return false;
      if (availabilityFilter === "available" && !p.isAvailable) return false;
      if (availabilityFilter === "unavailable" && p.isAvailable) return false;
      return true;
    });
  }, [products, search, categoryFilter, availabilityFilter]);

  const handleAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleToggleAvailable = (p: Product) => {
    updateProduct(p.id, { isAvailable: !p.isAvailable });
    toast({
      type: "info",
      title: p.isAvailable ? "Produk ditandai habis" : "Produk tersedia",
      description: p.name,
    });
  };

  const handleDelete = () => {
    if (!confirmDelete) return;
    deleteProduct(confirmDelete.id);
    toast({ type: "warning", title: "Produk dihapus", description: confirmDelete.name });
    setConfirmDelete(null);
  };

  return (
    <ContentContainer>
      <PageHeader
        title="Manajemen Produk"
        description={`${products.length} produk terdaftar`}
        actions={
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4" />
            Tambah
          </Button>
        }
      />

      <Card className="mt-5 p-3 sm:p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <SearchInput value={search} onChange={setSearch} placeholder="Cari produk..." />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">Semua Kategori</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>
                {c.name}
              </option>
            ))}
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value as typeof availabilityFilter)}
            className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          >
            <option value="all">Semua Status</option>
            <option value="available">Tersedia</option>
            <option value="unavailable">Habis</option>
          </select>
        </div>
      </Card>

      <div className="mt-4">
        {filtered.length === 0 ? (
          <EmptyState
            title="Produk tidak ditemukan"
            description="Coba ubah filter atau tambah produk baru"
            icon={Package}
            className="rounded-xl border border-dashed border-border py-12"
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <ProductCardItem
                key={p.id}
                product={p}
                onEdit={() => handleEdit(p)}
                onDelete={() => setConfirmDelete(p)}
                onToggle={() => handleToggleAvailable(p)}
              />
            ))}
          </div>
        )}
      </div>

      <ProductForm open={formOpen} onOpenChange={setFormOpen} product={editing} />

      <ConfirmDialog
        open={!!confirmDelete}
        onOpenChange={(v) => !v && setConfirmDelete(null)}
        title="Hapus produk?"
        description={`Produk ${confirmDelete?.name} akan dihapus permanen.`}
        confirmText="Hapus"
        onConfirm={handleDelete}
      />
    </ContentContainer>
  );
}