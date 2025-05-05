import { z } from "zod";

/** Newsletter form schema */
export const NewsletterFormSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required.")
    .email({ message: "Please provide a valid email address." }),
});

/** Subscription form schema */
export const SubscriptionFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required.")
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .max(60, {
      message: "First name must not exceed 60 characters.",
    }),
  lastName: z
    .string()
    .nonempty("Last name is required.")
    .min(3, {
      message: "Last name must be at least 3 characters.",
    })
    .max(60, {
      message: "Last name must not exceed 60 characters.",
    }),
});

/** Contact form schema */
export const ContactFormSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required.")
    .min(3, {
      message: "First name must be at least 3 characters.",
    })
    .max(60, {
      message: "First name must not exceed 60 characters.",
    }),
  lastName: z
    .string()
    .nonempty("Last name is required.")
    .min(3, {
      message: "Last name must be at least 3 characters.",
    })
    .max(60, {
      message: "Last name must not exceed 60 characters.",
    }),
  email: z
    .string()
    .nonempty("Email address is required.")
    .email({ message: "Please provide a valid email address." }),
  subject: z
    .string()
    .nonempty("Subject is required.")
    .min(4, {
      message: "Subject must be at least 4 characters.",
    })
    .max(60, {
      message: "Subject must not exceed 60 characters.",
    }),
  message: z
    .string()
    .nonempty("Message is required.")
    .min(10, {
      message: "Message must be at least 10 characters.",
    })
    .max(60, {
      message: "Message must not exceed 60 characters.",
    }),
});
