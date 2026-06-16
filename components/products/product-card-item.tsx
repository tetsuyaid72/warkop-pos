import type { Product } from "@/types/product";
import { Coffee, Edit, Trash2, Eye, EyeOff, Flame } from "lucide-react";
import { PriceText } from "@/components/shared/price-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProductCardItem({
  product,
  onEdit,
  onDelete,
  onToggle,
}: {
  product: Product;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
  onToggle: (p: Product) => void;
}) {
  return (
    <Card className={cn("overflow-hidden p-0", !product.isAvailable && "opacity-60")}>
      <div className="flex items-stretch gap-3 p-3">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-muted to-secondary">
          {product.image ? (
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
          ) : (
            <Coffee className="h-7 w-7 text-muted-foreground/50" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="truncate text-sm font-semibold">{product.name}</p>
                {product.isBestSeller && (
                  <Flame className="h-3.5 w-3.5 shrink-0 text-accent" />
                )}
              </div>
              <p className="text-xs text-muted-foreground">{product.category}</p>
              {product.description && (
                <p className="mt-0.5 line-clamp-1 text-[11px] text-muted-foreground">{product.description}</p>
              )}
              <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                <PriceText value={product.price} size="sm" className="text-primary" />
                {product.stock !== undefined && (
                  <Badge variant="outline" className="text-[10px]">
                    Stok: {product.stock}
                  </Badge>
                )}
                {!product.isAvailable && (
                  <Badge variant="destructive" className="text-[10px]">
                    Non-aktif
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1 border-t border-border bg-muted/30 p-1.5">
        <Button
          variant="ghost"
          size="sm"
          className="flex-1 h-7 text-xs"
          onClick={() => onToggle(product)}
        >
          {product.isAvailable ? (
            <>
              <EyeOff className="h-3.5 w-3.5" />
              Non-aktifkan
            </>
          ) : (
            <>
              <Eye className="h-3.5 w-3.5" />
              Aktifkan
            </>
          )}
        </Button>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onEdit(product)}>
          <Edit className="h-3.5 w-3.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-destructive hover:text-destructive"
          onClick={() => onDelete(product)}
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>
    </Card>
  );
}