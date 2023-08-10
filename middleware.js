import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  // Create authenticated Supabase Client.
  const supabase = createMiddlewareClient({ req });
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check auth condition
  if (session) {
    // Authentication successful, continue to the protected route.
    return NextResponse.next();
  }

  // Auth condition not met, redirect to home page.
  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/";
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: "/user/:id",
};
