import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Roboto_Flex } from "@next/font/google";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

export default function App({ Component, pageProps }) {

  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <Layout className={roboto_flex.className}>
        <Component {...pageProps} />
      </Layout>
    </SessionContextProvider>
  );
}
