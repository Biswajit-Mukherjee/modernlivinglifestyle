/** This is a server action to subscribe to the newsletter */

/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { generateToken } from "@/lib/utils";
import {
  checkIfSubscriberExists,
  checkIfSubscriberIsSubscribed,
  checkIfSubscriberIsVerified,
  createSubscriber,
  getSubscriberById,
  updateSubscriberFullName,
  updateSubscriberToSubscribed,
} from "@/lib/queries";
import { NewsletterFormSchema, SubscriptionFormSchema } from "@/lib/schema";
import { NewsletterFormInputs } from "@/components/shared/newsletter-form";
import { SubscriptionFormInputs } from "@/components/shared/subscription-form";
import { sendConfirmationEmail } from "./email-action";
import { SENDER } from "@/lib/data";

// Create new subscriber
export async function createNewSubscriber(data: NewsletterFormInputs) {
  const parsedResult = NewsletterFormSchema.safeParse(data);

  if (parsedResult.success) {
    // Validate email address
    const validatedEmail = parsedResult.data.email.trim().toLowerCase();

    // Generate token
    const token = generateToken();

    try {
      const existingUser = await checkIfSubscriberExists(validatedEmail);

      if (existingUser) {
        return {
          success: false,
          message: "This email already exists.",
        };
      }
    } catch (error: any) {
      console.log(error);

      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }

    // Create subscriber
    try {
      const newSubscriber = await createSubscriber(validatedEmail, token);

      if (newSubscriber) {
        // Send confirmation email
        const res = await sendConfirmationEmail({
          from: SENDER,
          to: [validatedEmail],
          subject: "Verify your email",
          token,
        });

        if (res?.success) {
          return {
            success: true,
            data: newSubscriber.id,
          };
        } else {
          return {
            success: false,
            message: "Something went wrong. Please try again later.",
          };
        }
      }
    } catch (error: any) {
      console.log({ error });

      return {
        success: false,
        message: "Something went wrong. Please try again later.",
      };
    }
  }

  if (parsedResult.error) {
    return {
      success: false,
      message: "Something went. Please try again later.",
    };
  }
}

// Subscribe to the newsletter
export async function subscribeToNewsletter(
  id: string,
  data: SubscriptionFormInputs
) {
  const parsedResult = SubscriptionFormSchema.safeParse(data);

  if (parsedResult.success) {
    const { firstName, lastName } = parsedResult.data;

    try {
      // Get user by id
      const userId = await getSubscriberById(id);

      if (!userId) {
        return {
          success: false,
          error: {
            message: "No user found.",
          },
        };
      }

      // Check if user is verified
      const userIsVerified = await checkIfSubscriberIsVerified(id);

      if (!userIsVerified) {
        return {
          success: false,
          error: {
            message: "User is not verified. Please verify your email.",
          },
        };
      }

      // Update firstname and lastname if user is already subscribed
      const userIsSubscribed = await checkIfSubscriberIsSubscribed(id);

      if (userIsSubscribed) {
        await updateSubscriberFullName(id, firstName, lastName);
      } else {
        await updateSubscriberFullName(id, firstName, lastName);
        await updateSubscriberToSubscribed(id);
      }

      return {
        success: true,
        error: null,
      };
    } catch (error: any) {
      console.log(error);

      return {
        success: false,
        error: {
          message: "Something went wrong. Please try again.",
        },
      };
    }
  } else {
    return {
      success: false,
      error: {
        message: "Something went wrong. Please try again.",
      },
    };
  }
}
