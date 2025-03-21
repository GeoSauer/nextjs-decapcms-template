import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Next.js + DecapCMS Template</title>
        <meta
          name="description"
          content="Boilerplate template for rapidly deploying static sites with Next.js and DecapCMS."
        />
        <meta name="keywords" content="Next.js, DecapCMS, tailwindcss, static, free, CMS"></meta>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
