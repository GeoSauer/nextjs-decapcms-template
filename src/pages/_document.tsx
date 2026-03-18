import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

const siteName = "Next.js + DecapCMS Template";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://nextjs-decapcms-template.netlify.app";
const title = "Next.js + DecapCMS Template";
const description = "Boilerplate template for rapidly deploying static sites with Next.js and DecapCMS.";
const ogImage = `${siteUrl}/images/cover.webp`;
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteName,
  url: siteUrl,
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content="Next.js, DecapCMS, tailwindcss, static, free, CMS" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="theme-color" content="#111827" />
        <meta name="format-detection" content="telephone=no" />

        <link rel="canonical" href={siteUrl} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content="Next.js + DecapCMS template preview" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content="Next.js + DecapCMS template preview" />

        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        {/* Google Tag Manager */}
        {gtmId && (
          <Script
            id="gtm-script"
            dangerouslySetInnerHTML={{
              __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');
            `,
            }}
          />
        )}
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <Main />
        <NextScript />
        {/* <!-- A little help for the Netlify post-processing bots --> */}
        {/* // TODO: uncomment these and add them to the <form> to enable file upload */}
        {/* encType="multipart/form-data"
				 data-netlify-accept="image/*" */}
        <form name="contact" hidden data-netlify="true" netlify-honeypot="bot-field">
          <input type="text" name="name" />
          <input type="email" name="email" />
          <textarea name="message"></textarea>
          {/* // TODO: uncomment to enable file upload */}
          {/* <input type="file" name="file" /> */}
          <input name="bot-field" />
        </form>
      </body>
    </Html>
  );
}
