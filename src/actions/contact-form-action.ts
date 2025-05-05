"use server";

/** This is a server action to send an email to admin and user when contact form is submitted
 *  with the user details — first name, last name, email, message subject and message body
 */

import dayjs from "dayjs";
import lodash from "lodash";
import { generateID, getProfile } from "@/lib/utils";
import { ContactFormSchema } from "@/lib/schema";
import type { SanityTypes } from "@/@types";
import { ContactFormInputs } from "@/components/shared/contact-form";
import ContactFormAdminEmail from "@/emails/contact-form-admin";
import ContactFormUserEmail from "@/emails/contact-form-user";
import { sendEmail } from "@/actions/email-action";
import { SENDER } from "@/lib/data";

export async function sendInvoices(data: ContactFormInputs) {
  const result = ContactFormSchema.safeParse(data);
  const profile: SanityTypes.Profile = await getProfile();

  if (result.success) {
    const { firstName, lastName, email, subject, message } = result.data;
    const dateOfSubmission = dayjs(new Date()).format("MMM D, YYYY").toString();
    const invoiceId = generateID();

    try {
      /** Send email invoice to admin and user */
      const admin = await sendEmail({
        from: SENDER,
        to: [profile.email],
        subject: `Admin invoice for #${invoiceId}`,
        react: ContactFormAdminEmail({
          invoiceId,
          firstName: lodash.capitalize(firstName),
          lastName: lodash.capitalize(lastName),
          email,
          subject,
          message,
          generatedOn: dateOfSubmission,
        }) as React.ReactNode,
      });

      const user = await sendEmail({
        from: SENDER,
        to: [email],
        subject: `User invoice for #${invoiceId}`,
        react: ContactFormUserEmail({
          invoiceId,
          firstName: lodash.capitalize(firstName),
          lastName: lodash.capitalize(lastName),
          email,
          subject,
          message,
          generatedOn: dateOfSubmission,
        }) as React.ReactNode,
      });

      return {
        success: true,
        data: {
          adminResponseId: admin.data,
          userResponseId: user.data,
        },
      };
    } catch (error: unknown) {
      console.log(error);

      return {
        success: false,
        data: {
          error: {
            code: 500,
            message: "Something went wrong. Please try again later.",
          },
        },
      };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
