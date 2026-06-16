"use client";

export const dynamic = "force-dynamic";

import { useState, useMemo } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useCartStore } from "@/stores/cart-store";
import { useProductStore } from "@/stores/product-store";
import { useCategoryStore } from "@/stores/category-store";
import { useSettingStore } from "@/stores/setting-store";
import { ProductCard } from "@/components/pos/product-card";
import { CategoryTabs } from "@/components/pos/category-tabs";
import { SearchInput } from "@/components/pos/search-input";
import { CartPanel } from "@/components/pos/cart-panel";
import { ProductVariantDialog } from "@/components/pos/product-variant-dialog";
import { IncomingOrdersPanel } from "@/components/pos/incoming-orders-panel";
import { EmptyState } from "@/components/shared/empty-state";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Search } from "lucide-react";
import type { Product } from "@/types/product";
import type { CartItem } from "@/types/transaction";
import { calculateOrder } from "@/lib/calculate-order";
import { formatCurrency } from "@/lib/format-currency";

export default function POSPage() {
  const products = useProductStore((s) => s.products);
  const categories = useCategoryStore((s) => s.categories).filter((c) => c.isActive);
  const settings = useSettingStore((s) => s.settings);
  const { addItem, items, discountPercentage, updateItem } = useCartStore();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [variantOpen, setVariantOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (!p.isAvailable) return false;
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [products, search, activeCategory]);

  const totals = calculateOrder(items, settings.taxPercentage, settings.serviceChargePercentage, discountPercentage);
  const cartCount = items.reduce((s, i) => s + i.quantity, 0);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setEditingItem(null);
    setVariantOpen(true);
  };

  const handleEditItem = (item: CartItem) => {
    const product = products.find((p) => p.id === item.productId);
    if (!product) return;
    setSelectedProduct(product);
    setEditingItem(item);
    setVariantOpen(true);
  };

  const handleAdd = (data: {
    product: Product;
    quantity: number;
    variant?: "hot" | "iced";
    sugar?: "normal" | "less" | "none";
    addons?: { id: string; name: string; price: number }[];
    note?: string;
  }) => {
    if (editingItem) {
      updateItem(editingItem.id, {
        quantity: data.quantity,
        variant: data.variant,
        sugar: data.sugar,
        addons: data.addons,
        note: data.note,
      });
    } else {
      addItem({
        productId: data.product.id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.image,
        quantity: data.quantity,
        variant: data.variant,
        sugar: data.sugar,
        addons: data.addons,
        note: data.note,
      });
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col lg:flex-row">
      <IncomingOrdersPanel />
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="border-b border-border bg-background p-3 sm:p-4">
          <div className="flex flex-col gap-3">
            <SearchInput value={search} onChange={setSearch} className="w-full" />
            <CategoryTabs
              categories={categories}
              active={activeCategory}
              onChange={setActiveCategory}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">
          {filteredProducts.length === 0 ? (
            <EmptyState
              title="Menu tidak ditemukan"
              description="Coba ubah kata kunci atau kategori"
              icon={Search}
              className="rounded-xl border border-dashed border-border py-12"
            />
          ) : (
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onClick={handleProductClick} />
              ))}
            </div>
          )}
        </div>
      </div>
      {isDesktop ? (
        <div className="w-full max-w-md border-l border-border">
          <CartPanel onEditItem={handleEditItem} />
        </div>
      ) : (
        <>
          <div className="fixed bottom-16 left-0 right-0 z-30 border-t border-border bg-card p-3 shadow-lg">
            <Sheet open={cartOpen} onOpenChange={setCartOpen}>
              <SheetTrigger asChild>
                <Button size="lg" className="w-full justify-between" disabled={cartCount === 0}>
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    {cartCount} item
                  </span>
                  <span className="font-semibold">{formatCurrency(totals.grandTotal)}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="p-0">
                <div className="h-[85vh]">
                  <CartPanel onEditItem={handleEditItem} />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </>
      )}
      <ProductVariantDialog
        product={selectedProduct}
        open={variantOpen}
        onOpenChange={setVariantOpen}
        onAdd={handleAdd}
      />
    </div>
  );
}