import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { Roboto_Flex } from "@next/font/google";

const roboto_flex = Roboto_Flex({
  subsets: ["latin"],
  weight: ["300", "500", "700", "800"],
});

export default function App({ Component, pageProps }) {
  return (
    <Layout className={roboto_flex.className}>
      <Component {...pageProps} />
    </Layout>
  );
}
