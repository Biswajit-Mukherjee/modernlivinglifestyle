"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, LoadingButton } from "@/components/ui/button";
import { NewsletterFormSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewSubscriber } from "@/actions/subscribe-action";
import SubscriptionAgreement from "@/components/shared/subscription-agreement";
import { sendConfirmationEmail } from "@/actions/email-action";
import { generateToken } from "@/lib/utils";
import {
  checkIfUserExists,
  checkIfUserIsSubscribed,
  checkIfUserIsVerified,
  getUserName,
} from "@/actions/user-action";
import { SENDER } from "@/lib/data";

export type NewsletterFormInputs = z.infer<typeof NewsletterFormSchema>;

type Props = Readonly<{ onSubscribeInit: () => void }>;

const NewsLetterForm: React.FC<Props> = ({ onSubscribeInit }) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof NewsletterFormSchema>>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: { email: "" },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<NewsletterFormInputs> = async (data) => {
    // Set form status
    setSubmitting(true);

    // Check if user exists
    const existingUserId = await checkIfUserExists(data.email);

    if (existingUserId) {
      // Check if user is verified
      const verifiedUserId = await checkIfUserIsVerified(existingUserId);

      if (verifiedUserId) {
        const userIsSubscribed = await checkIfUserIsSubscribed(verifiedUserId);

        if (userIsSubscribed) {
          toast.success("You're already subscribed to our newsletter");
        } else {
          const user = await getUserName(verifiedUserId as string);

          if (user && user.firstName && user.lastName) {
            router.push(
              `/onboarding/details?uid=${user?.id}&firstName=${user?.firstName}&lastName=${user?.lastName}`
            );
          } else {
            router.push(`/onboarding/details?uid=${user?.id}`);
          }
        }
      } else {
        // Generate token
        const token = generateToken();

        // Send confirmation email
        const res = await sendConfirmationEmail({
          from: SENDER,
          to: [data.email],
          subject: "Verify your email",
          token,
        });

        if (res?.success) {
          // Pass entered email to parent
          onSubscribeInit();
        } else {
          // Set error
          toast.error(res?.message as string);
        }
      }
    } else {
      const res = await createNewSubscriber(data);

      if (res?.success) {
        // Pass entered email to parent
        onSubscribeInit();
      } else {
        // Set error
        toast.error(res?.message as string);
      }
    }

    // Reset form values
    form.reset();

    // Reset form status
    setSubmitting(false);
  };

  return (
    <div className="w-full max-w-xl mx-auto" data-uia="form-container">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col flex-1">
                <FormControl>
                  <Input
                    className="bg-background w-full min-h-12 shadow-none flex-1 rounded-sm aria-invalid:border-destructive focus-visible:ring-2 ring-offset-2 text-base"
                    placeholder="Email address"
                    autoComplete="email"
                    aria-label="email"
                    disabled={submitting}
                    type="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm leading-normal font-normal antialiased text-destructive" />
              </FormItem>
            )}
          />

          <div className="w-full mt-4" data-uia="btn-container">
            {!submitting && (
              <Button
                type="submit"
                aria-label="newsletter-form-cta"
                className="w-full h-12 text-base leading-none font-medium text-white rounded-sm"
                aria-disabled={submitting}
                disabled={submitting}
              >
                Subscribe
              </Button>
            )}

            {submitting && <LoadingButton className="w-full h-12 rounded-sm" />}
          </div>
        </form>
      </Form>

      <SubscriptionAgreement />
    </div>
  );
};

export default NewsLetterForm;
