"use client";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { categorySchema, type CategoryFormValues } from "@/schemas/category-schema";
import { useCategoryStore } from "@/stores/category-store";
import { useToast } from "@/components/ui/toast";
import type { Category } from "@/types/category";

const iconOptions = ["Coffee", "CupSoda", "Leaf", "UtensilsCrossed", "Croissant", "Cake", "Cookie", "IceCream"];
const colorOptions = ["#5B3924", "#C98A40", "#7BA05B", "#A0522D", "#D4A373", "#B85C38", "#6A8EAD", "#8E6E53"];

export function CategoryForm({
  open,
  onOpenChange,
  category,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  category?: Category | null;
}) {
  const addCategory = useCategoryStore((s) => s.addCategory);
  const updateCategory = useCategoryStore((s) => s.updateCategory);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: "",
      icon: "Coffee",
      color: colorOptions[0],
      isActive: true,
    },
  });

  const watchColor = watch("color");
  const watchIcon = watch("icon");

  const onSubmit = (data: CategoryFormValues) => {
    if (category) {
      updateCategory(category.id, data);
      toast({ type: "success", title: "Kategori diperbarui", description: data.name });
    } else {
      addCategory(data);
      toast({ type: "success", title: "Kategori ditambahkan", description: data.name });
    }
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        title={category ? "Edit Kategori" : "Tambah Kategori"}
        description="Atur nama, ikon, dan warna kategori"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div>
            <Label className="text-xs">Nama Kategori</Label>
            <Input
              {...register("name")}
              className="mt-1.5 h-9 text-sm"
              placeholder="cth: Coffee"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label className="text-xs">Ikon</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {iconOptions.map((i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setValue("icon", i)}
                  className={
                    "rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors " +
                    (watchIcon === i
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground")
                  }
                >
                  {i}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label className="text-xs">Warna</Label>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {colorOptions.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setValue("color", c)}
                  className={
                    "h-7 w-7 rounded-full border-2 transition-all " +
                    (watchColor === c ? "border-foreground scale-110" : "border-transparent")
                  }
                  style={{ backgroundColor: c }}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit">{category ? "Simpan" : "Tambah"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}