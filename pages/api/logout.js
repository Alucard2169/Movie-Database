import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function handler(request, response) {
  const supabase = createRouteHandlerClient({ request });

  await supabase.auth.signOut();

  return NextResponse.redirect(`${request.headers.referer || "/"}`, {
    status: 307, // Use 307 Temporary Redirect to prevent browser caching
  });
}
