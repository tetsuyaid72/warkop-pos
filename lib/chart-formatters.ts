import { formatCurrency } from "@/lib/format-currency";

export const chartCurrencyFormatter = (value: unknown): [string, string] => {
  const num = typeof value === "number" ? value : Number(value) || 0;
  return [formatCurrency(num), "Penjualan"];
};

export const chartNumberFormatter = (value: unknown): [string, string] => {
  const num = typeof value === "number" ? value : Number(value) || 0;
  return [num.toLocaleString("id-ID"), "Jumlah"];
};