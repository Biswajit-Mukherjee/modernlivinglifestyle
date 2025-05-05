import * as React from "react";
import type { Metadata, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { WebPage, WithContext } from "schema-dts";
import dayjs from "dayjs";
import type { SanityTypes } from "@/@types";
import { getPrivacyPolicy } from "@/lib/utils";
import StructuredData from "@/components/structured-data";
import { urlFor } from "@/lib/sanity";
import { SITE } from "@/lib/data";

export async function generateMetadata(): Promise<Metadata> {
  const policy: SanityTypes.PrivacyPolicy = await getPrivacyPolicy();

  return {
    title: policy.metadata.title,
    description: policy.metadata.description,
    metadataBase: new URL(policy.metadata.metadataBase),
    applicationName: policy.metadata.applicationName,
    creator: policy.metadata.creator,
    keywords: policy.metadata.keywords ?? policy.metadata.title,
    authors: [{ name: policy.metadata.creator }],
    robots: policy.metadata.robots,
    openGraph: {
      title: policy.metadata.title,
      description: policy.metadata.description,
      images: urlFor(policy.metadata.image).url(),
      type: "website",
      locale: "en_IN",
    },
    alternates: {
      canonical: new URL(policy.metadata.metadataBase),
    },
  };
}

const Privacy: NextPage = async () => {
  const policy: SanityTypes.PrivacyPolicy = await getPrivacyPolicy();

  const schemaData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: SITE.url + "/privacy",
    description: `Learn how ${SITE.name} handles personal information, data collection, and cookies. This page outlines our privacy practices and compliance standards.`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
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
              {policy.title}
            </h1>

            <div data-uia="creation-date">
              <strong>Effective Date:</strong>{" "}
              {dayjs(policy.createdAt).format("MMMM D, YYYY")}
            </div>
          </div>

          <article
            data-uia="policy-description"
            className="policy w-full max-w-full mt-16 mx-0 mb-24 prose dark:prose-invert text-foreground text-base font-normal leading-normal antialiased"
          >
            <PortableText value={policy.description} />
          </article>

          <div className="w-full" data-uia="updation-date">
            <strong>Last Updated:</strong>{" "}
            {dayjs(policy.updatedAt).format("MMMM D, YYYY")}
          </div>
        </section>
      </div>
    </>
  );
};

export default Privacy;
