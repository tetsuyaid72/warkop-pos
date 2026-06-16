import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter"),
  category: z.string().min(1, "Kategori wajib dipilih"),
  price: z.coerce.number().min(0, "Harga tidak boleh negatif"),
  description: z.string().optional(),
  image: z.string().optional(),
  isAvailable: z.boolean().default(true),
  isBestSeller: z.boolean().default(false),
  stock: z.coerce.number().int().min(0).optional(),
  variants: z.array(z.enum(["hot", "iced"])).optional(),
  addons: z
    .array(
      z.object({
        id: z.string(),
        name: z.string(),
        price: z.coerce.number().min(0),
      }),
    )
    .optional(),
});

export type ProductFormValues = z.infer<typeof productSchema>;

