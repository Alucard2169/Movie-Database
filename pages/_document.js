import { Html, Head, Main, meta, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400,700|Roboto:400,500,700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#040e13" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
