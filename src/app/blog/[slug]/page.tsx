/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import type { Metadata, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import { redirect } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { BlogPosting, WithContext } from "schema-dts";
import { getBlog } from "@/lib/utils";
import type { SanityTypes } from "@/@types";
import { SITE } from "@/lib/data";
import { urlFor } from "@/lib/sanity";
import { redis } from "@/lib/redis";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import StructuredData from "@/components/structured-data";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import BackButton from "@/components/shared/back-btn";
import { ReportView } from "@/components/shared/view";
import { YouTubePlayer } from "@/components/shared/youtube-player";

type Props = Readonly<{ params: Promise<any> }>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pageParams = await params;
  const blog: SanityTypes.BlogDetails = await getBlog(pageParams?.slug ?? "");

  return {
    applicationName: SITE.name,
    creator: SITE.creator,
    metadataBase: new URL(`${SITE.url}/blog/${blog.slug}`),
    title: blog.title,
    description: blog.description,
    openGraph: {
      title: blog.title,
      description: blog.description,
      images: urlFor(blog.image).url(),
      type: "article",
      locale: "en_IN",
    },
    alternates: {
      canonical: new URL(`${SITE.url}/blog/${blog.slug}`),
    },
    keywords: blog.seo ? blog.seo.concat(blog.title) : blog.title,
    robots: "index,noarchive,follow,max-image-preview:large",
    authors: [{ name: SITE.creator }],
  };
}

const BlogDetails: NextPage<Props> = async ({
  params,
}: {
  params: Promise<any>;
}) => {
  const pageParams = await params;

  if (!pageParams) {
    redirect("/");
  }

  const blogSlug = pageParams?.slug || "";
  const blog: SanityTypes.BlogDetails = await getBlog(blogSlug);

  if (!blog) {
    redirect("/");
  }

  /** Calculate number of times blog is viewed */
  const views =
    (await redis.get<number>(
      ["pageviews", "posts", pageParams.slug].join(":")
    )) ?? 0;
  const numberOfViews =
    views <= 99
      ? views === 1
        ? `${views} view`
        : `${views} views`
      : "99+ views";

  /** Calculate estimated blog reading time */
  const readingTime =
    +blog.estimatedReadingTimeInMins === 1
      ? `${blog.estimatedReadingTimeInMins} min read`
      : `${blog.estimatedReadingTimeInMins} mins read`;

  const schemaData: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": SITE.url + `/blog/${blogSlug}`,
    },
    headline: blog.title,
    description: blog.description,
    image: urlFor(blog.image).url() ?? "",
    author: {
      "@type": "Person",
      name: blog.author?.name,
      image: urlFor(blog.author?.image).url() ?? "",
      url: "https://www.the-daily-blogs.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "The Daily Blogs",
      logo: {
        "@type": "ImageObject",
        url: "https://www.the-daily-blogs.com/favicon.ico",
      },
    },
    datePublished: dayjs(blog.createdAt).format("MMMM D, YYYY"),
    dateModified: dayjs(blog.updatedAt).format("MMMM D, YYYY"),
  };

  return (
    <>
      <StructuredData data={schemaData} />

      <ReportView slug={blog.slug} />

      <main className="w-full h-full app-bg flex flex-col p-4 items-center justify-center">
        <MaxWidthWrapper className="min-h-screen mt-10 mb-0 select-none">
          <section
            aria-label="back-nav"
            className="w-full mt-0 mx-auto mb-10"
            data-uia="back-btn"
          >
            <BackButton />
          </section>

          <section
            className="w-full mt-4 flex items-center gap-2.5"
            data-uia="blog-date"
          >
            <CalendarIcon className="text-primary" size={30} />
            <div className="w-full flex-1">
              <p className="text-muted-foreground text-xs font-normal leading-normal antialiased">
                Posted on
              </p>
              <p className="text-foreground text-sm font-medium leading-normal antialiased">
                {dayjs(blog.createdAt).format("MMM D, YYYY")}
              </p>
            </div>
          </section>

          <section className="w-full" data-uia="blog-header">
            <h1
              data-uia="blog-title"
              className="w-full mt-6 text-wrap text-2xl sm:text-3xl md:text-4xl text-foreground font-black leading-normal antialiased"
            >
              {blog.title}
            </h1>

            <div
              data-uia="blog-user"
              aria-label="blog-user"
              className="w-full mt-10 flex flex-row items-center justify-between relative"
            >
              <Link
                href="/about#aboutMe"
                className="w-fit flex items-center justify-center gap-2"
              >
                <Avatar className="border border-border">
                  <AvatarImage
                    className="object-cover"
                    src={urlFor(blog.author?.image).url()}
                    alt={blog.author?.name}
                  />
                  <AvatarFallback>
                    {blog.author?.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <p className="w-20 sm:w-fit align-middle text-foreground text-base sm:text-lg font-medium antialiased">
                  {blog.author?.name}
                </p>
              </Link>

              {readingTime && numberOfViews && (
                <div className="flex flex-row items-center gap-1 text-xs sm:text-sm font-normal leading-normal text-muted-foreground antialiased">
                  <span>{readingTime}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground mx-1" />
                  <span>{numberOfViews}</span>
                </div>
              )}
            </div>

            <div data-uia="blog-image" className="w-full mt-8 relative">
              <AspectRatio ratio={16 / 9}>
                <Image
                  className="w-full h-full object-cover bg-top aspect-auto"
                  blurDataURL={urlFor(blog.image).url()}
                  src={urlFor(blog.image).url()}
                  placeholder="blur"
                  title={blog.title}
                  alt={blog.title}
                  quality={80}
                  priority
                  fill
                />
              </AspectRatio>
            </div>
          </section>

          <section className="w-full" data-uia="blog-body">
            <div
              data-uia="blog-description"
              className="w-full mt-6 text-center text-muted-foreground text-lg font-medium leading-normal antialiased"
            >
              {blog.description}
            </div>

            <article
              data-uia="blog-content"
              className="w-full max-w-full mt-16 mx-0 mb-20 prose dark:prose-invert text-foreground leading-normal antialiased"
            >
              <PortableText value={blog.content} />
            </article>
          </section>

          {blog.ytkey && (
            <section className="w-full" data-uia="blog-multimedia">
              <div
                className="yt-player-wrapper w-full h-[202.5px] sm:h-[270px] md:h-[360px] aspect-auto max-w-[360px] sm:max-w-[480px] md:max-w-[640px] flex items-center justify-center mt-2.5 mx-auto mb-20"
                data-uia="youtube-player-container"
              >
                <YouTubePlayer id={blog.id} videoId={blog.ytkey} />
              </div>
            </section>
          )}
        </MaxWidthWrapper>
      </main>
    </>
  );
};

export default BlogDetails;
