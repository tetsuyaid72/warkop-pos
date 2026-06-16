/**
 * Generates a daily auto-incrementing order number, e.g. "Q-20260616-0001".
 * Caller is responsible for retrying on unique-constraint collision
 * (the (outlet_id, order_number) unique index will reject duplicates).
 */
export function generateOrderNumber(countToday: number): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const seq = String(countToday + 1).padStart(4, "0");
  return `Q-${yyyy}${mm}${dd}-${seq}`;
}

/** Returns the date prefix used in order numbers, e.g. "Q-20260616-". */
export function orderNumberDatePrefix(): string {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `Q-${yyyy}${mm}${dd}-`;
}
