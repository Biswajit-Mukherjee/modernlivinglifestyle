/** This is a repository of server actions related to email */

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import * as React from "react";
import { resend } from "@/lib/resend";
import { getBaseUrl } from "@/lib/utils";
import ConfirmUserEmail from "@/emails/confirm-email";

/** Send email */
type SendEmailProps = Readonly<{
  from: string;
  to: string | string[];
  subject: string;
  react?: React.ReactNode;
  html?: any;
}>;

export async function sendEmail({
  from,
  to,
  subject,
  react,
  html,
}: SendEmailProps) {
  if (!from || !to || !subject) {
    return { success: false, data: null };
  }

  try {
    const res = await resend.emails.send({
      from,
      to,
      subject,
      react,
      html,
    });

    return { success: true, data: res.data?.id };
  } catch (error: any) {
    console.log({ "Error message: ": error });
    return { success: false, data: null };
  }
}

/** Send confirmation email */
type SendConfirmationEmailProps = SendEmailProps & Readonly<{ token: string }>;

export async function sendConfirmationEmail({
  from,
  to,
  subject,
  token,
}: SendConfirmationEmailProps) {
  // Generate verification link
  const baseUrl = getBaseUrl();
  const link = `${baseUrl}/onboarding/confirm?token=${token}`;

  try {
    // Send confirmation email
    const res = await sendEmail({
      from,
      to,
      subject,
      react: ConfirmUserEmail({
        link,
      }) as React.ReactNode,
    });

    if (res.success) {
      return {
        success: true,
        message: "ok",
      };
    }
  } catch (error: any) {
    console.log(error);

    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
