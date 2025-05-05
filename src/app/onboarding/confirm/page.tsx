/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { redirect } from "next/navigation";
import { FaLinkSlash } from "react-icons/fa6";
import {
  getSubscriberByToken,
  updateSubscriberToVerified,
} from "@/lib/queries";

type Props = Readonly<{
  searchParams?: Promise<any>;
}>;

const OnboardingConfirmation: NextPage<Props> = async ({ searchParams }) => {
  const params = await searchParams;
  const token: string | null = params ? params?.token : null;
  const noToken = !token || !token.trim().length;

  if (noToken) {
    redirect("/");
  }

  // Get user by token
  const userId = await getSubscriberByToken(token);

  if (!userId) {
    return (
      <div className="w-full min-h-[75vh] flex items-center justify-center">
        <section className="w-full max-w-4xl m-auto p-5">
          <div aria-label="container">
            <div className="text-center text-muted-foreground">
              <div className="w-fit mt-10 mx-auto mb-5">
                <FaLinkSlash size={48} />
              </div>
              <p className="text-base leading-normal font-normal antialiased">
                This link has either expired or is an invalid one. Please try
                again with a valid link.
              </p>
            </div>

            <div
              aria-label="cta"
              className="flex items-center justify-center mt-10 mx-auto mb-20"
            >
              <Link
                role="button"
                href="/"
                className="w-full max-w-sm mx-auto rounded bg-primary text-white text-lg font-semibold text-center p-4 cursor-pointer"
              >
                Go Home
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Update user to verified
  await updateSubscriberToVerified(userId as string);

  redirect(`/onboarding/success?uid=${userId}`);
};

export default OnboardingConfirmation;
