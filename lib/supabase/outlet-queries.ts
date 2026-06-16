import { getSupabase } from "./client";
import type { Outlet } from "@/types/order";

/**
 * Server-friendly fetch: looks up the active outlet by slug and validates the
 * qr_token. Returns null if Supabase is not configured, slug is missing, or
 * the token doesn't match. Safe to call from RSC and from client code.
 */
export async function fetchOutletByParams(
  slug?: string,
  token?: string,
): Promise<Outlet | null> {
  if (!slug || !token) return null;
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("outlets")
      .select("*")
      .eq("slug", slug)
      .eq("qr_token", token)
      .eq("is_active", true)
      .maybeSingle();
    if (error) return null;
    return (data as Outlet | null) ?? null;
  } catch {
    return null;
  }
}
