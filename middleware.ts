import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // 1. Pehle response object initialization karein
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // 2. Pure Server Client Instance with proper request & response cookie mapping
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
        },
        setAll(cookiesToSet) {
          // CRITICAL FIX: Cookies ko request aur response dono par set karna padta hai
          // taaki Next.js ka middleware engine use real-time browser session me inject kar sake
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set({ name, value, ...options });
            response = NextResponse.next({
              request: {
                headers: request.headers,
              },
            });
            response.cookies.set({ name, value, ...options });
          });
        },
      },
    }
  );

  // 3. Current user check karein
  const { data: { user } } = await supabase.auth.getUser();

  const currentPath = request.nextUrl.pathname;

  // RULE A: PROTECT DASHBOARD
  // Agar user logged in nahi hai aur dashboard par jaane ki koshish kare
  if (!user && currentPath.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // RULE B: SMART REDIRECTION BYPASS
  // Agar user already logged in hai aur login/signup/auth paths par bhatak raha hai, push to dashboard
  if (user && (currentPath.startsWith("/auth/login") || currentPath.startsWith("/auth/signup") || currentPath === "/auth" || currentPath === "/")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

// Next.js config matcher optimization
export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/signup", "/auth", "/"],
};