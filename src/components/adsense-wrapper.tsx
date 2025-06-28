"use client";

import * as React from "react";
import Script from "next/script";

const AdsenseWrapper: React.FC = () => {
  const ADSENSE_SCRIPT = process.env.NEXT_PUBLIC_ADSENSE_URL!;
  const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT!;
  const AD_SLOT = process.env.NEXT_PUBLIC_AD_SLOT!;

  return (
    <>
      <Script
        async
        src={ADSENSE_SCRIPT}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      {/* Modern Living Lifestyle Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <Script id="">(adsbygoogle = window.adsbygoogle || []).push({});</Script>
    </>
  );
};

export default AdsenseWrapper;
