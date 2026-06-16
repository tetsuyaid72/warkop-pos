export type SugarLevel = "normal" | "less" | "none";
export type Variant = "hot" | "iced";

export type Addon = {
  id: string;
  name: string;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image?: string;
  description?: string;
  isAvailable: boolean;
  isBestSeller?: boolean;
  stock?: number;
  variants?: Variant[];
  addons?: Addon[];
};

