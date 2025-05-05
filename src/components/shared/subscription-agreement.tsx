import * as React from "react";
import Link from "next/link";

const SubscriptionAgreement: React.FC = () => {
  return (
    <div
      aria-label="privacy-text"
      className="w-full mt-3 text-center align-middle text-sm leading-normal font-normal antialiased text-muted-foreground"
    >
      By subscribing, you agree with our{" "}
      <strong className="hover:underline active:underline underline-offset-2">
        <Link target="_blank" href="/terms-and-conditions">
          Terms
        </Link>
      </strong>{" "}
      and{" "}
      <strong className="hover:underline active:underline underline-offset-2">
        <Link target="_blank" href="/privacy">
          Privacy policy
        </Link>
      </strong>
      .
    </div>
  );
};

export default SubscriptionAgreement;
