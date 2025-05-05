import * as React from "react";
import type { Metadata, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { WebPage, WithContext } from "schema-dts";
import dayjs from "dayjs";
import type { SanityTypes } from "@/@types";
import { getTermsAndConditions } from "@/lib/utils";
import StructuredData from "@/components/structured-data";
import { urlFor } from "@/lib/sanity";
import { SITE } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const terms: SanityTypes.Terms = await getTermsAndConditions();

  return {
    title: terms.metadata.title,
    description: terms.metadata.description,
    metadataBase: new URL(terms.metadata.metadataBase),
    applicationName: terms.metadata.applicationName,
    creator: terms.metadata.creator,
    keywords: terms.metadata.keywords ?? terms.metadata.title,
    authors: [{ name: terms.metadata.creator }],
    robots: terms.metadata.robots,
    openGraph: {
      title: terms.metadata.title,
      description: terms.metadata.description,
      images: urlFor(terms.metadata.image).url(),
      type: "website",
      locale: "en_IN",
    },
    alternates: {
      canonical: new URL(terms.metadata.metadataBase),
    },
  };
}

const TermsAndConditions: NextPage = async () => {
  const terms: SanityTypes.Terms = await getTermsAndConditions();

  const schemaData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms and Conditions",
    url: SITE.url + "/terms-and-conditions",
    description: `Terms and Conditions for accessing and using ${SITE.name}. Read about our content use policy, disclaimers, user responsibilities, and website usage rules.`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    isPartOf: {
      "@type": "WebSite",
      name: SITE.name,
      url: SITE.url,
    },
  };

  return (
    <>
      <StructuredData data={schemaData} />

      <div className="w-full min-h-screen app-bg grid gap-10">
        <section
          className="w-full max-w-5xl mt-10 mx-auto mb-5 px-4 py-10 relative"
          data-layout="section"
        >
          <div className="w-full flex flex-col md:flex-row md:items-center justify-between gap-5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold antialiased">
              {terms.title}
            </h1>

            <div data-uia="creation-date">
              <strong>Effective Date:</strong>{" "}
              {dayjs(terms.createdAt).format("MMMM D, YYYY")}
            </div>
          </div>

          <article
            data-uia="terms-description"
            className="terms w-full max-w-full mt-16 mx-0 mb-24 prose dark:prose-invert text-foreground text-base font-normal leading-normal antialiased"
          >
            <PortableText value={terms.description} />
          </article>

          <div className="w-full" data-uia="updation-date">
            <strong>Last Updated:</strong>{" "}
            {dayjs(terms.updatedAt).format("MMMM D, YYYY")}
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsAndConditions;
