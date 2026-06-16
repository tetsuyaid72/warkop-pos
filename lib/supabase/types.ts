export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type OrderStatus =
  | "pending"
  | "accepted"
  | "preparing"
  | "served"
  | "rejected";

export type DbOrder = {
  id: string;
  outlet_id: string;
  order_number: string;
  table_number: string | null;
  customer_name: string | null;
  customer_phone: string | null;
  items: Json;
  subtotal: number;
  status: OrderStatus;
  customer_note: string | null;
  rejection_reason: string | null;
  estimated_minutes: number | null;
  created_at: string;
  updated_at: string;
};

export type DbOutlet = {
  id: string;
  slug: string;
  name: string;
  qr_token: string;
  tax_percentage: number;
  service_charge_percentage: number;
  is_active: boolean;
  created_at: string;
};

export type DbOrderEvent = {
  id: string;
  order_id: string;
  event_type: string;
  payload: Json | null;
  created_at: string;
};
