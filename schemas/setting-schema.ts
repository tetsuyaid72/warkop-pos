import { z } from "zod";

export const settingSchema = z.object({
  outletName: z.string().min(2, "Nama outlet minimal 2 karakter"),
  outletAddress: z.string().optional(),
  outletPhone: z.string().optional(),
  taxPercentage: z.coerce.number().min(0).max(100),
  serviceChargePercentage: z.coerce.number().min(0).max(100),
  theme: z.enum(["light", "dark", "system"]),
  currency: z.string().default("IDR"),
});

export type SettingFormValues = z.infer<typeof settingSchema>;

