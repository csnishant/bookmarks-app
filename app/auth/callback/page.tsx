"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AuthCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // 1. URL se error ya expired tokens check karein
      const error = searchParams.get("error");
      const errorDescription = searchParams.get("error_description");

      if (error) {
        console.error("Auth callback error:", errorDescription);
        toast.error(
          errorDescription || "Authentication link expired or invalid!",
        );
        // Error aane par user ko vapas login par bhej dein
        router.push("/auth/login");
        return;
      }

      // 2. Supabase automatic session capture kar leta hai client side par
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      } else {
        // Safe fallback agar session instant create na hua ho
        router.push("/");
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center gap-3 text-slate-100">
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      <p className="text-xs text-slate-500 font-mono tracking-widest uppercase">
        Verifying Secure Token...
      </p>
    </div>
  );
}
