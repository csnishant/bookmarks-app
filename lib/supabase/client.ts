import { createBrowserClient } from "@supabase/ssr";

// Yeh client automatic browser cookies aur auth synchronization handle karega
export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);