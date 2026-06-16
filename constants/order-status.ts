import type { OrderStatus } from "@/types/order";
import { Coffee, Hourglass, Check, ChefHat, X, Clock } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const ORDER_STATUS_FLOW: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "served",
];

export type OrderStatusMeta = {
  label: string;
  description: string;
  icon: LucideIcon;
  tone: "neutral" | "info" | "warn" | "success" | "danger";
};

export const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  pending: {
    label: "Menunggu kasir",
    description: "Pesanan kamu sudah sampai ke kasir, menunggu konfirmasi.",
    icon: Hourglass,
    tone: "warn",
  },
  accepted: {
    label: "Diterima",
    description: "Kasir sudah menerima pesanan kamu.",
    icon: Check,
    tone: "info",
  },
  preparing: {
    label: "Disiapkan",
    description: "Barista lagi nyiapin pesanan kamu. Sabar ya ☕",
    icon: ChefHat,
    tone: "info",
  },
  served: {
    label: "Selesai",
    description: "Pesanan sudah sampai. Selamat menikmati!",
    icon: Coffee,
    tone: "success",
  },
  rejected: {
    label: "Ditolak",
    description: "Pesanan tidak dapat diproses. Silakan hubungi kasir.",
    icon: X,
    tone: "danger",
  },
};

export const KASIR_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  pending: {
    label: "Masuk",
    description: "Order baru",
    icon: Clock,
    tone: "warn",
  },
  accepted: { ...ORDER_STATUS_META.accepted, description: "Sudah diterima" },
  preparing: {
    ...ORDER_STATUS_META.preparing,
    description: "Lagi disiapkan",
  },
  served: { ...ORDER_STATUS_META.served, description: "Sudah diantar" },
  rejected: { ...ORDER_STATUS_META.rejected, description: "Ditolak" },
};
