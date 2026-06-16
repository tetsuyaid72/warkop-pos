import type { Variant, SugarLevel, Addon } from "./product";

export type OrderType = "dine-in" | "take-away" | "delivery";
export type PaymentMethod = "cash" | "qris" | "debit" | "ewallet";
export type TransactionStatus = "paid" | "cancelled" | "refunded";

export type CartItem = {
  id: string;
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

export type Transaction = {
  id: string;
  invoiceNumber: string;
  customerName?: string;
  orderType: OrderType;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  serviceCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  paidAmount?: number;
  changeAmount?: number;
  status: TransactionStatus;
  createdAt: string;
};

