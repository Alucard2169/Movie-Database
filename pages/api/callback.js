import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const handler = async (req, res) => {
  const code = req.query.code;
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code)
  }
  res.redirect("/");
};

export default handler;
