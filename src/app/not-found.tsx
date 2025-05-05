import * as React from "react";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WebPage, WithContext } from "schema-dts";
import { SITE } from "@/lib/data";
import StructuredData from "@/components/structured-data";

const NotFound: NextPage = () => {
  const schemaData: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "404 Not Found",
    description:
      "This page does not exist on The Daily Blogs. Explore articles on fitness, lifestyle, well-being, and more instead.",
    url: SITE.url + "/not-found",
  };

  return (
    <>
      <StructuredData data={schemaData} />

      <main className="w-full app-bg text-foreground flex items-center justify-center">
        <section className="w-full max-w-5xl mx-auto mt-12 mb-24 grid gap-5 items-center justify-center">
          <div
            data-uia="bg-image"
            className="w-[420px] h-[300px] mx-auto aspect-auto relative"
          >
            <Image
              className="w-full h-full object-cover aspect-auto"
              blurDataURL="/assets/404.png"
              src="/assets/404.png"
              placeholder="blur"
              alt="page not found"
              priority
              fill
            />
          </div>

          <div
            data-uia="404-content"
            className="w-full p-10 grid items-center mx-auto"
          >
            <h3
              data-uia="error-code"
              className="w-fit mx-auto mt-2.5 align-middle px-4 py-2.5 border-l-2 border-l-red-500 text-center text-xl leading-normal font-light antialiased prose dark:prose-invert"
            >
              Error Code <strong>404</strong>
            </h3>

            <p
              data-uia="error-message"
              className="w-full p-5 text-center text-base font-normal leading-normal antialiased prose dark:prose-invert"
            >
              The page you&apos;re looking for could not be found.
            </p>

            <Button
              className="w-full h-14 shadow-2xl mt-6 mx-auto p-5 bg-primary text-white text-lg leading-none antialiased"
              data-uia="cta-btn"
              role="link"
            >
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotFound;
