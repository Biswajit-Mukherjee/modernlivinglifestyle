/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { redirect } from "next/navigation";
import { GoVerified } from "react-icons/go";

type Props = Readonly<{
  searchParams?: Promise<any>;
}>;

const OnboardingSuccess: NextPage<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const userId: string | null = params ? params?.uid : null;
  const noUserId = !userId || !userId.trim().length;

  if (noUserId) {
    redirect("/");
  }

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center">
      <section className="w-full max-w-4xl m-auto p-5">
        <div aria-label="container">
          <div className="text-center text-green-600">
            <div className="w-fit mt-10 mx-auto mb-5">
              <GoVerified size={48} />
            </div>
            <p className="text-base leading-normal font-normal antialiased">
              Your email has been verified successfully!
            </p>
          </div>

          <div
            aria-label="cta"
            className="flex items-center justify-center mt-10 mx-auto mb-20"
          >
            <Link
              role="button"
              href={`/onboarding/details?uid=${userId}`}
              className="w-full max-w-sm mx-auto rounded bg-primary text-white text-lg font-semibold text-center p-4 cursor-pointer"
            >
              Continue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingSuccess;
