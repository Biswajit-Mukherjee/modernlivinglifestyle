import * as React from "react";
import type { Metadata, NextPage } from "next";
import { PortableText } from "@portabletext/react";
import { WebSite, WithContext } from "schema-dts";
import { getHomepageDetails, getMostRecentBlogs } from "@/lib/utils";
import type { SanityTypes } from "@/@types";
import BlogCard from "@/components/shared/blog-card";
import Jumbotron from "@/components/shared/jumbotron";
import StructuredData from "@/components/structured-data";
import AllBlogsButton from "@/components/shared/all-blogs-btn";
import NewsLetterForm from "@/components/shared/newsletter-form";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity";
import { SITE } from "@/lib/data";

/** Runtime */
export const runtime = "edge";

export async function generateMetadata(): Promise<Metadata> {
  const home: SanityTypes.Homepage = await getHomepageDetails();

  return {
    title: home.metadata.title,
    description: home.metadata.description,
    metadataBase: new URL(home.metadata.metadataBase),
    applicationName: home.metadata.applicationName,
    creator: home.metadata.creator,
    keywords: home.metadata.keywords ?? home.metadata.title,
    authors: [{ name: home.metadata.creator }],
    robots: home.metadata.robots,
    openGraph: {
      title: home.metadata.title,
      description: home.metadata.description,
      images: urlFor(home.metadata.image).url(),
      type: "website",
      locale: "en_IN",
    },
    alternates: {
      canonical: new URL(home.metadata.metadataBase),
    },
  };
}

const Home: NextPage = async () => {
  const home: SanityTypes.Homepage = await getHomepageDetails();
  const blogs: SanityTypes.Blog[] = await getMostRecentBlogs();

  const schemaData: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: `${SITE.name} shares uplifting content on fitness, lifestyle, mental health, well-being, positivity, and personal transformation to inspire and empower everyday lives.`,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: SITE.url + "/favicon.ico",
      },
    },
  };

  return (
    <>
      <StructuredData data={schemaData} />

      <main className="w-full min-h-screen bg-muted/50 dark:bg-muted grid gap-10 px-4 py-10">
        <section className="w-full mt-0 mx-auto mb-0">
          <Jumbotron title={home.title} image={urlFor(home.image).url()} />
        </section>

        <section
          data-uia="blogs-container"
          className="w-full mt-8 mx-auto mb-6"
        >
          <div className="w-full max-w-5xl text-center mt-0 mx-auto mb-16 text-foreground prose dark:prose-invert text-base leading-normal antialiased">
            <PortableText value={home.intro} />
          </div>

          <div className="w-full max-w-xs mt-0 mx-auto mb-8 relative">
            <div className="w-fit mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-nowrap antialiased">
                Most recent blogs
              </h2>
            </div>
          </div>

          <div className="flex flex-wrap gap-5 w-full max-w-5xl mx-auto">
            {blogs.length &&
              blogs.map((blog: SanityTypes.Blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
          </div>
        </section>

        <section
          data-uia="load-all-blogs"
          className="w-full max-w-5xl mx-auto my-0 flex items-center justify-center"
        >
          <AllBlogsButton />
        </section>

        <Separator className="w-full max-w-5xl mx-auto bg-muted-foreground/10 dark:bg-muted-foreground/25" />

        <section
          data-uia="newsletter"
          className="w-full max-w-5xl mt-8 mx-auto mb-16"
        >
          <h3
            aria-label="newsletter-form-title"
            className="w-full mt-0 mx-auto mb-8 align-middle text-xl sm:text-2xl md:text-3xl text-center font-bold text-nowrap antialiased"
          >
            Subscribe to our newsletter
          </h3>

          <div className="w-full max-w-xl mt-2.5 mx-auto mb-10 text-center text-foreground text-base leading-normal antialiased">
            Subscribe to our newsletter and receive the latest updates on
            what&apos;s new, recently published blogs and other important stuff.
          </div>

          <NewsLetterForm />
        </section>
      </main>
    </>
  );
};

export default Home;
