import type { NextConfig } from "next";

/** Variables */
const IS_DEV = process.env.NODE_ENV === "development";

/** CSP Policy */
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' ${IS_DEV ? "'unsafe-eval'" : ""} https://cdn.sanity.io https://www.googletagmanager.com https://www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https://cdn.sanity.io https://images.unsplash.com https://www.google-analytics.com;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://cdn.sanity.io https://*.sanity.io https://www.google-analytics.com https://region1.google-analytics.com;
  frame-src https://www.youtube.com https://player.vimeo.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'self';
  upgrade-insecure-requests;
`;

/** Configuration */
const nextConfig: NextConfig = {
  /* Images */
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
      },
    ],
  },

  /** Set Headers */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Permissions-Policy",
            value:
              "geolocation=(), camera=(), microphone=(), fullscreen=(self), autoplay=(self), clipboard-read=(self), clipboard-write=(self), payment=(), usb=(), publickey-credentials-get=(self)",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
