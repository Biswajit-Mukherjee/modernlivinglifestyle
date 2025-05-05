/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";
import type { NextPage } from "next";
import { redirect } from "next/navigation";
import SubscriptionForm from "@/components/shared/subscription-form";
import SubscriptionAgreement from "@/components/shared/subscription-agreement";

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

  const firstName = params?.firstName ?? "";
  const lastName = params?.lastName ?? "";

  return (
    <div className="w-full min-h-[75vh] flex items-center justify-center">
      <section className="w-full max-w-4xl mt-8 mx-auto mb-20 p-5">
        <div aria-label="container" className="w-full max-w-md mx-auto">
          <SubscriptionForm
            id={userId}
            firstName={firstName}
            lastName={lastName}
          />

          <div className="w-full mt-5">
            <SubscriptionAgreement />
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnboardingSuccess;
