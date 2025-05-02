import Head from "next/head";
import { GetStaticProps } from "next";
import { getFolderMarkups } from "@/lib/utils/markdown";
import Script from "next/script";
import { useCallback, useState } from "react";
import {
  ClientFeature,
  DevFeature,
  Examples,
  Features,
  Hero,
  Page,
  Contact,
} from "@/types/cms/HomePage";
import { RxExternalLink, RxGithubLogo } from "react-icons/rx";
import { useAnalytics } from "@/lib/hooks/useAnalytics";
import { useToast } from "@/components/Toast/ToastContext";

interface HomeProps {
  hero: Hero;
  features: Features;
  examples: Examples;
  contact: Contact;
}

export default function Home({ hero, features, examples, contact }: HomeProps) {
  return (
    <>
      <Head>
        <title>Next.js + DecapCMS Template</title>
      </Head>
      {/* include this script on '/' so that invited users can set a password */}
      <Script
        src="https://identity.netlify.com/v1/netlify-identity-widget.js"
        strategy="lazyOnload"
      />
      <div className="bg-gradient-to-br from-gray-700 to-gray-900 min-h-screen w-full text-gray-300 flex flex-col justify-between">
        {/* HEADER */}
        <header className="fixed w-full text-center md:text-left flex bg-gray-950 justify-between p-4 md:px-15 z-1">
          <HeaderContent />
        </header>

        <main className="p-4 flex flex-col gap-15 md:gap-35 flex-grow max-w-7xl mx-auto mt-30 md:mt-40">
          {/* HERO */}
          {hero && <HeroContent {...hero} />}

          {/* FEATURES */}
          {(features.clients.length > 0 || features.developers.length > 0) && (
            <section className="flex flex-col md:flex-row justify-evenly gap-20 md:gap-0">
              <FeatureList title="Developers Love:" features={features.developers} />
              <FeatureList title="Clients Love:" features={features.clients} />
            </section>
          )}

          {/* EXAMPLES */}
          {examples.pages.length > 0 && (
            <section>
              <h2 className="text-2xl md:text-3xl text-center">{examples.title}</h2>
              <div className="grid md:grid-cols-2 gap-8 mt-5 md:mt-15">
                {examples.pages.map((page, index) => (
                  <ExampleCard key={index} {...page} />
                ))}
              </div>
            </section>
          )}

          {/* CONTACT */}
          {/* There's a static version of this form in `src/pages/_document.tsx` for Netlify to
          process the form submission. */}
          {contact.show && <ContactForm {...contact} />}
        </main>

        {/* FOOTER */}
        <footer className="w-full text-center bg-gray-950 text-gray-300 mt-30">
          <FooterContent />
        </footer>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  // Use the getFolderMarkups utility to fetch markdown data from a given folder
  const homePageMarkups = getFolderMarkups("src/content/home-page");

  //* Alternatively, use the getMarkup utility to fetch a single markdown file
  // const heroMarkups = getMarkup("src/content/home-page", "hero.md");

  // Return the data as props
  return {
    props: {
      hero: homePageMarkups.hero || null,
      features: homePageMarkups.features || null,
      examples: homePageMarkups.examples || [],
      contact: homePageMarkups.contact || null,
    },
  };
};

const HeaderContent = () => {
  const { trackExternalLink } = useAnalytics();

  return (
    <>
      <p className="text-2xl font-bold">
        <a
          className="hover:text-white"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackExternalLink("https://nextjs.org/docs", "Next.js")}
        >
          Next.js
        </a>{" "}
        +{" "}
        <a
          className="hover:text-white"
          href="https://decapcms.org/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackExternalLink("https://decapcms.org/docs/intro/", "DecapCMS")}
        >
          DecapCMS
        </a>
        <span className="hidden md:inline"> Template</span>
      </p>
      <a
        className="hover:bg-white bg-gray-300 p-[1px] rounded-full max-h-fit my-auto"
        href="https://github.com/GeoSauer/nextjs-decapcms-template"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() =>
          trackExternalLink("https://github.com/GeoSauer/nextjs-decapcms-template", "GitHub")
        }
      >
        <RxGithubLogo className="text-gray-950" size={30} />
      </a>
    </>
  );
};

const HeroContent = ({ title, description, details, cta }: Hero) => {
  const { trackExternalLink } = useAnalytics();

  return (
    <section className="flex flex-col gap-4 md:gap-8">
      <h1 className="text-3xl sm:text-5xl md:text-7xl">{title}</h1>
      <p className="text-md text-gray-500 md:text-xl">{description}</p>
      <span className="text-md text-gray-500 md:text-lg">
        {details.text}{" "}
        <a
          className="text-gray-300 hover:underline hover:text-white inline-flex items-center gap-1"
          href={details.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackExternalLink(details.url, details.link)}
        >
          {details.link}
          <RxExternalLink />
        </a>
        .
      </span>
      <a
        className="bg-gray-900 text-gray-300 hover:bg-gray-700 transition-colors rounded-full px-4 py-2 max-w-fit mx-auto md:ml-40 inline-flex items-center gap-1 cursor-pointer mt-10 md:mt-3"
        href={cta.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackExternalLink(cta.url, cta.text)}
      >
        {cta.text}
        <RxExternalLink />
      </a>
    </section>
  );
};

interface FeatureListProps {
  title: string;
  features: DevFeature[] | ClientFeature[];
}

const FeatureList = ({ title, features }: FeatureListProps) => {
  if (features.length === 0) return null;

  return (
    <div className="text-left md:max-w-1/3">
      <h2 className="text-2xl md:text-3xl text-center">{title}</h2>
      <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-10">
        {features.map((feature, index) => (
          <p key={index}>
            <span className="font-bold">{feature.title} - </span>
            <span className="text-gray-500">{feature.description}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

const ExampleCard = ({ title, url, image, alt }: Page) => {
  const { trackExternalLink } = useAnalytics();
  const [imageExists, setImageExists] = useState(true);

  return (
    <div className="rounded-lg overflow-hidden shadow-lg aspect-[16/9]">
      <div className="hover:scale-105 transition-transform duration-300 h-full">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackExternalLink(url, title)}
        >
          {imageExists ? (
            <img
              src={image}
              alt={alt || title}
              onError={() => setImageExists(false)}
              className="w-full"
            />
          ) : (
            <div className="flex justify-center w-full h-full bg-gray-700">
              <span className="text-2xl my-auto">{title}</span>
            </div>
          )}
        </a>
      </div>
    </div>
  );
};

const ContactForm = ({ title, subtitle }: Contact) => {
  const emptyForm = { name: "", email: "", message: "" };
  const [formData, setFormData] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const invalidForm = !formData.name || !formData.email || !formData.message;

  // TODO: uncomment to enable file upload
  // const fileInputRef = useRef<HTMLInputElement | null>(null);
  // const MAX_FILE_SIZE = 10 * 1024 * 1024; // Limit set by Netlify for file uploads (10MB)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  // const handleFileChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     if (e.target.type === "file") {
  //       const files = Array.from((e.target as HTMLInputElement).files || []);
  //       const invalidFiles = files.filter((file) => file.size > MAX_FILE_SIZE);

  //       if (invalidFiles.length > 0) {
  //         toaster.create({
  //           description: "Files must be under 10MB each",
  //           type: "error",
  //         });
  //         (e.target as HTMLInputElement).value = "";
  //         return;
  //       }
  //     }
  //   },
  //   []
  // );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      try {
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        const response = await fetch("/", {
          method: "POST",
          // TODO: replace headers and body with the following to enable file upload
          // headers: { "Content-Type": "multipart/form-data" },
          // body: formData,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData as any).toString(),
        });

        if (response.ok) {
          addToast("Message sent successfully! We'll get back to you soon.", "success", 5000);
          setFormData(emptyForm);
          // TODO: uncomment to enable file upload
          // if (fileInputRef.current !== null) {
          //   fileInputRef.current.value = "";
          // }
        } else {
          throw new Error(`Response status: ${response.status}`);
        }
      } catch (err) {
        console.error("Form submission error:", err);
        addToast("Error sending message, please try again", "error");
      } finally {
        setLoading(false);
      }
    },
    [emptyForm, addToast]
  );

  // TODO: uncomment these and add them to the <form> to enable file upload */
  //  encType="multipart/form-data"
  // data-netlify-accept="image/*"
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto p-6 space-y-6"
    >
      {/* Required hidden input for Netlify forms */}
      <input type="hidden" name="form-name" value="contact" />

      {/* Hidden honeypot field to prevent spam */}
      <div hidden>
        <input name="bot-field" />
      </div>

      <fieldset className="space-y-6">
        <div className="space-y-2">
          <legend className="text-2xl md:text-3xl text-center">{title}</legend>
          <p className="text-gray-300">{subtitle}</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-white md:w-24">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="flex-grow p-2 rounded bg-white text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-white md:w-24">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="me@example.com"
              value={formData.email}
              onChange={handleChange}
              className="flex-grow p-2 rounded bg-white text-gray-900"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-white md:w-24">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              id="message"
              name="message"
              placeholder="What can we help you with?"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="flex-grow p-2 rounded bg-white text-gray-900"
            />
          </div>

          {/* //TODO: uncomment to enable file upload */}
          {/* <div className="flex flex-col gap-2">
						<label htmlFor="file" className="text-white md:w-24">
							Image
						</label>
						<input
							ref={fileInputRef}
						  onChange={handleFileChange}
							type="file"
							id="file"
							name="file"
							accept="image/*"
							className="flex-grow text-white "
						/>
					</div> */}
        </div>

        <button
          type="submit"
          disabled={loading || invalidForm}
          className="w-full md:w-auto px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors duration-200 mx-auto block"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </fieldset>
    </form>
  );
};

const FooterContent = () => {
  const currentYear = new Date().getFullYear();

  return (
    <p className="py-1.5">
      Copyright © 2025
      {currentYear > 2025 ? ` - ${currentYear} ` : " "}
      <a
        className="hover:text-white"
        href="https://geosauer.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Geo Sauer
      </a>
    </p>
  );
};
