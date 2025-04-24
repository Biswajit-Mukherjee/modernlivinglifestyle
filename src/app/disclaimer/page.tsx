import * as React from "react";
import type { Metadata, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { WebPage, WithContext } from "schema-dts";
import dayjs from "dayjs";
import type { SanityTypes } from "@/@types";
import { getDisclaimer } from "@/lib/utils";
import StructuredData from "@/components/structured-data";
import { urlFor } from "@/lib/sanity";
import { SITE } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const disclaimer: SanityTypes.Disclaimer = await getDisclaimer();

  return {
    title: disclaimer.metadata.title,
    description: disclaimer.metadata.description,
    metadataBase: new URL(disclaimer.metadata.metadataBase),
    applicationName: disclaimer.metadata.applicationName,
    creator: disclaimer.metadata.creator,
    keywords: disclaimer.metadata.keywords ?? disclaimer.metadata.title,
    authors: [{ name: disclaimer.metadata.creator }],
    robots: disclaimer.metadata.robots,
    openGraph: {
      title: disclaimer.metadata.title,
      description: disclaimer.metadata.description,
      images: urlFor(disclaimer.metadata.image).url(),
      type: "website",
      locale: "en_IN",
    },
    alternates: {
      canonical: new URL(disclaimer.metadata.metadataBase),
    },
  };
}

const Disclaimer: NextPage = async () => {
  const disclaimer: SanityTypes.Disclaimer = await getDisclaimer();

  const schemaData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Disclaimer",
    url: SITE.url + "/disclaimer",
    description: `Disclaimer for ${SITE.name} outlining limitations of liability, content accuracy, and user responsibilities. Learn more about how to interpret our blog posts and third-party links.`,
    inLanguage: "en",
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <StructuredData data={schemaData} />

      <div className="w-full min-h-screen bg-muted/50 dark:bg-muted grid gap-10">
        <section
          className="w-full max-w-5xl mt-10 mx-auto mb-5 px-4 py-10 relative"
          data-layout="section"
        >
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold antialiased">
              {disclaimer.title}
            </h1>

            <div data-uia="creation-date">
              <strong>Effective Date:</strong>{" "}
              {dayjs(disclaimer.createdAt).format("MMMM D, YYYY")}
            </div>
          </div>

          <article
            data-uia="disclaimer-description"
            className="disclaimer w-full max-w-full mt-16 mx-0 mb-24 prose dark:prose-invert text-foreground text-base font-normal leading-normal antialiased"
          >
            <PortableText value={disclaimer.description} />
          </article>
        </section>
      </div>
    </>
  );
};

export default Disclaimer;
