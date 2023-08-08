import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const handler = async (req, res) => {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')
  if (code) {
    const supabase = createRouteHandlerClient({cookies});
    await supabase.auth.exchangeCodeForSession(code)
  }

  return res.redirect("/");
};

export default handler;
