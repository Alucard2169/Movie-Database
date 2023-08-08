import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const handler = async (req, res) => {
  const requestUrl = new URL(req.url)
  const code = requestUrl.searchParams.get('code')
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const session = await supabase.auth.exchangeCodeForSession(code)

    if (session) {
      const token = session.access_token;
      // Set the cookie with HttpOnly attribute
      res.setHeader('Set-Cookie', `your_cookie_name=${token}; HttpOnly; Path=/`);
    }
  }
  return res.redirect("/");
};

export default handler;
