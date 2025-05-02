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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}'); 
            `,
          }}
        />
      </Head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Main />
        <NextScript />
        {/* <!-- A little help for the Netlify post-processing bots --> */}
        {/* // TODO: uncomment these and add them to the <form> to enable file upload */}
        {/* encType="multipart/form-data"
				 data-netlify-accept="image/*" */}
        <form name="contact" hidden data-netlify="true" netlify-honeypot="bot-field">
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="tel" name="phone" />
          <textarea name="message"></textarea>
          {/* // TODO: uncomment to enable file upload */}
          {/* <input type="file" name="file" /> */}
          <input name="bot-field" />
        </form>
      </body>
    </Html>
  );
}
