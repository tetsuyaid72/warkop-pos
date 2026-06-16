import type { Variant, SugarLevel, Addon } from "./product";

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "served"
  | "rejected";

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  variant?: Variant;
  sugar?: SugarLevel;
  addons?: Addon[];
  note?: string;
  image?: string;
};

export type CustomerOrder = {
  id: string;
  outlet_id: string;
  order_number: string;
  table_number: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  items: OrderItem[];
  subtotal: number;
  status: OrderStatus;
  customer_note: string | null;
  rejection_reason: string | null;
  estimated_minutes: number | null;
  created_at: string;
  updated_at: string;
};

export type Outlet = {
  id: string;
  slug: string;
  name: string;
  qr_token: string;
  tax_percentage: number;
  service_charge_percentage: number;
  is_active: boolean;
  created_at: string;
};

export type OrderEvent = {
  id: string;
  order_id: string;
  event_type: string;
  payload: unknown;
  created_at: string;
};
