/**
 * Get the public site URL used to build QR-code target links.
 * Reads from NEXT_PUBLIC_SITE_URL, falls back to window.location.origin on the client.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}
