import "@/styles/globals.css";
import Script from "next/script";
import type { Metadata, NextPage } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import type { NextTypes } from "@/@types";
import { ThemeProvider } from "@/providers/theme-provider";
import AdsenseWrapper from "@/components/adsense-wrapper";
import GoogleFundingChoices from "@/components/google-funding-choices";
import FundingChoicesLoader from "@/components/funding-choices-loader";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";
import { SITE } from "@/lib/data";

// If loading a variable font, you don't need to specify the font weight
const ff = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Modern Living Lifestyle",
    template: "Modern Living Lifestyle | %s",
  },
  metadataBase: new URL(SITE.url),
  description:
    "Welcome to Modern Living Lifestyle – explore powerful insights on fitness, lifestyle, mental health, self-transformation, well-being, and sociology. Discover content that inspires growth, positivity, and purpose.",
  alternates: {
    canonical: new URL(SITE.url),
  },
};

export const revalidate = 3600; // revalidate all paths at most every hour

const RootLayout: NextPage<NextTypes.Layout> = ({ children }) => {
  const ADSENSE_SCRIPT = process.env.NEXT_PUBLIC_ADSENSE_URL!;
  const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT!;

  return (
    <html lang="en">
      <head>
        {/* Load the adsense script and metadata */}
        <Script
          async
          id="adsense-script"
          src={ADSENSE_SCRIPT}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <meta name="google-adsense-account" content={AD_CLIENT}></meta>
      </head>

      <body className={ff.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className="w-full bg-background mt-20">{children}</div>
          <Footer />
        </ThemeProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="colored"
          transition={Bounce}
        />
        <Analytics />
        <SpeedInsights />
        <AdsenseWrapper />
        <GoogleFundingChoices />
        <FundingChoicesLoader />
      </body>
    </html>
  );
};

export default RootLayout;
