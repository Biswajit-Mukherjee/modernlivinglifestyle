"use client";

import { useEffect } from "react";

const AdsenseWrapper: React.FC = () => {
  const AD_SLOT = process.env.NEXT_PUBLIC_AD_SLOT!;
  const AD_CLIENT = process.env.NEXT_PUBLIC_AD_CLIENT!;

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && window.adsbygoogle) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      console.error("Adsense error", e);
    }
  }, []);

  return (
    <div style={{ overflow: "hidden" }}>
      {/* Modern Living Lifestyle Ad Unit */}
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={AD_SLOT}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdsenseWrapper;
