/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import Link from "next/link";
import type { Metadata, NextPage } from "next";
import { BlogPosting, CollectionPage, WithContext } from "schema-dts";
import { redirect } from "next/navigation";
import type { SanityTypes } from "@/@types";
import { getBlogs, getBlogsByQuery } from "@/lib/utils";
import SearchBox from "@/components/ui/search-box";
import PageNav from "@/components/ui/page-nav";
import Loader from "@/components/shared/loader";
import FilteredBlogs from "@/components/shared/filtered-blogs";
import BlogsNotFound from "@/components/shared/blogs-not-found";
import StructuredData from "@/components/structured-data";
import { SITE } from "@/lib/data";

const BLOGS_END_MSG = "No more blogs to display :(";

export const metadata: Metadata = {
  title:
    "Inspiring Blog Articles on Fitness, Lifestyle & Mental Wellness | The Daily Blogs",
  metadataBase: new URL(SITE.url),
  description:
    "Explore empowering blog posts about fitness, lifestyle, mental health, self-transformation, positivity, and well-being. Stay inspired with new content every week from The Daily Blogs.",
  keywords: [
    "fitness blogs",
    "mental health articles",
    "lifestyle tips",
    "positivity blog",
    "self-improvement",
    "positivity",
    "well-being",
    "transformation stories",
    "healthy living",
    "sociology insights",
  ],
  robots: "index,noarchive,follow,max-image-preview:large",
  openGraph: {
    title:
      "Inspiring Blog Articles on Fitness, Lifestyle & Mental Wellness | The Daily Blogs",
    description:
      "Explore empowering blog posts about fitness, lifestyle, mental health, self-transformation, positivity, and well-being. Stay inspired with new content every week from The Daily Blogs.",
    images: new URL(SITE.url + "/assets/blogs-cover.webp"),
    type: "website",
    locale: "en_IN",
  },
  alternates: {
    canonical: new URL(SITE.url + "/blogs"),
  },
};

type Props = Readonly<{
  searchParams?: Promise<any>;
}>;

const Blogs: NextPage<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const query = params ? params?.query : "";
  const page = params ? params?.page : "1";
  const startIndex = params ? params?.startIndex : "0";
  const endIndex = params ? params?.endIndex : "6";

  if (!params.page) {
    redirect("/blogs?page=1");
  }

  const blogs: SanityTypes.Blog[] = await getBlogs();

  const schemaData: WithContext<CollectionPage | BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Inspiring Blog Articles on Fitness, Lifestyle & Mental Wellness",
    description:
      "Explore empowering blog posts about fitness, lifestyle, mental health, self-transformation, positivity, and well-being. Stay inspired with new content every week from The Daily Blogs.",
    url: "https://www.the-daily-blogs.com/blogs",
    potentialAction: {
      "@type": "SearchAction",
      target:
        "https://www.the-daily-blogs.com/blogs?query={search_term_string}&page={page_number}",
      query: ["search_term_string", "page_number"],
    },
    mainEntity: {
      "@type": "Blog",
      name: "The Daily Blogs",
      url: "https://www.the-daily-blogs.com",
      blogPost: blogs.map((blog) => {
        return {
          "@type": "BlogPosting",
          headline: blog.title,
          url: SITE.url + "/blog/" + blog.slug,
          datePublished: blog.createdAt.toString(),
          author: {
            "@type": "Person",
            name: blog.author.name,
          },
        };
      }),
    },
  };

  const filteredBlogs: SanityTypes.Blog[] = await getBlogsByQuery(
    query,
    startIndex,
    endIndex
  );

  return (
    <>
      <StructuredData data={schemaData} />

      <main className="w-full min-h-screen app-bg grid gap-10 px-4 py-10">
        <div className="w-full max-w-[440px] mx-auto" data-uia="search">
          <SearchBox searchQuery={query} />
        </div>

        <PageNav
          page={page}
          query={query}
          startIndex={startIndex}
          prevDisabled={page === "1"}
          nextDisabled={filteredBlogs.length === 0}
        />

        <section
          className="w-full max-w-5xl min-h-[600px] mx-auto"
          data-uia="blogs-container"
        >
          {filteredBlogs.length ? (
            <React.Suspense fallback={<Loader />}>
              <FilteredBlogs query={query} blogs={filteredBlogs} />
            </React.Suspense>
          ) : (
            !query && (
              <div className="w-full max-w-sm min-h-[240px] m-auto text-muted-foreground text-center">
                <div className="w-full mx-auto mt-0 mb-5 text-5xl">
                  ¯\_(ツ)_/¯
                </div>
                <div className="w-full text-center mx-auto my-5 text-base font-normal leading-normal antialiased">
                  {BLOGS_END_MSG}
                </div>
                <Link
                  role="button"
                  aria-label="blogs-first-page-link-cta"
                  className="block w-full bg-primary text-white rounded-lg p-4 mt-6 mx-auto mb-0"
                  href="/blogs?page=1"
                >
                  Go to first page
                </Link>
              </div>
            )
          )}

          {query && !filteredBlogs.length && (
            <React.Suspense fallback={<Loader />}>
              <BlogsNotFound query={query} />
            </React.Suspense>
          )}
        </section>
      </main>
    </>
  );
};

export default Blogs;
