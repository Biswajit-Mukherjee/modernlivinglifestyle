/** This is the configuration file for sitemaps */

/** @type {import('next-sitemap').IConfig} */

import { createClient } from "next-sanity";

/** Create Sanity client */
export const sanity = createClient({
  projectId: "d2lxyr39",
  dataset: "production",
  useCdn: false,
  apiVersion: "2025-02-09",
});

const config = {
  siteUrl: "https://www.the-daily-blogs.com" || "http://localhost:3000", // Your domain
  generateRobotsTxt: true, // Generate robots.txt file
  sitemapSize: 7000, // Split sitemap into multiple files if you have many URLs
  outDir: "./public", // The output directory for your sitemap files
  changefreq: "weekly",
  priority: 0.7,
  exclude: ["/server-sitemap.xml"],

  transform: async (config, path) => {
    const priorityMap = {
      "/": 1.0,
      "/about": 0.9,
      "/contact-us": 0.9,
      "/privacy": 0.6,
      "/terms-and-conditions": 0.6,
      "/disclaimer": 0.6,
      "/blogs": 0.8,
    };

    return {
      loc: path,
      changefreq: "weekly",
      priority: priorityMap[path] || 0.7,
      lastmod: new Date().toISOString(),
    };
  },

  additionalPaths: async () => {
    const query = `*[_type == "blog" && defined(slug.current)]{
    "slug": slug.current
  }`;

    const posts = await sanity.fetch(query);

    return posts.map((post) => ({
      loc: `/blog/${post.slug}`,
      changefreq: "weekly",
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
};

export default config;
