import { GA_MEASUREMENT_ID } from "@/lib/utils/analytics";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta
          name="description"
          content="Boilerplate template for rapidly deploying static sites with Next.js and DecapCMS."
        />
        <meta name="keywords" content="Next.js, DecapCMS, tailwindcss, static, free, CMS"></meta>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
