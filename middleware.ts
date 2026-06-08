import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 1. Agar user login nahi hai aur /dashboard par jaane ki koshish kare toh login par bhejo
  if (!user && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  // 2. Agar user login hai aur auth pages par jaye toh dashboard par redirect karo
  // (Yahan se humne "pathname === '/'" hata diya hai taaki home page access ho sake)
  if (
    user &&
    (
      pathname === "/auth" ||
      pathname.startsWith("/auth/login") ||
      pathname.startsWith("/auth/signup")
    )
  ) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/",
    "/auth/:path*",
    "/dashboard/:path*",
  ],
};