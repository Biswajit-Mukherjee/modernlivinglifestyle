"use client";

import * as React from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdWarning } from "react-icons/md";
import { Button, LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubscriptionFormSchema } from "@/lib/schema";
import { subscribeToNewsletter } from "@/actions/subscribe-action";

export type SubscriptionFormInputs = z.infer<typeof SubscriptionFormSchema>;

type Props = Readonly<{ id: string; firstName?: string; lastName?: string }>;

const SubscriptionForm: React.FC<Props> = ({
  id,
  firstName = "",
  lastName = "",
}) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const router = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SubscriptionFormSchema>>({
    resolver: zodResolver(SubscriptionFormSchema),
    defaultValues: {
      firstName,
      lastName,
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<SubscriptionFormInputs> = async (data) => {
    // Set form loading
    setSubmitting(true);

    // Reset error
    setError(null);

    // Subscribe to newsletter
    const res = await subscribeToNewsletter(id, data);

    // Set error message if encountered
    if (res.error) {
      setError(res.error.message);

      // Reset form loading
      setSubmitting(true);

      // Reset form values
      form.reset();
    }

    if (res.success) {
      router.push(`/onboarding/subscribed?uid=${id}`);
    }
  };

  return (
    <div className="w-full grid gap-2.5">
      <h1 className="text-center font-bold text-lg sm:text-xl md:text-2xl leading-normal antialiased">
        You&apos;re almost there!
      </h1>

      {error && (
        <div className="w-full mt-4" data-uia="error-container">
          <div className="w-full p-4 flex items-center gap-2 border-l-2 border-solid border-destructive bg-destructive/20 text-destructive">
            <div>
              <MdWarning size={24} />
            </div>
            <p>{error}</p>
          </div>
        </div>
      )}

      <div className="w-full mt-12" data-uia="form-container">
        <Form {...form}>
          <form
            noValidate
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full max-w-[540px] mx-auto grid gap-5"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormControl>
                    <Input
                      className="bg-background w-full min-h-12 shadow-none flex-1 aria-invalid:border-destructive rounded-sm focus-visible:ring-2 ring-offset-2 text-base"
                      placeholder="First name"
                      aria-label="firstname"
                      disabled={submitting}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal leading-normal antialiased" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex flex-col flex-1">
                  <FormControl>
                    <Input
                      className="bg-background w-full min-h-12 shadow-none flex-1 aria-invalid:border-destructive rounded-sm focus-visible:ring-2 ring-offset-2 text-base"
                      placeholder="Last name"
                      aria-label="lastname"
                      disabled={submitting}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm font-normal leading-normal antialiased" />
                </FormItem>
              )}
            />

            <div className="w-full mt-6" data-uia="btn-container">
              {!submitting && (
                <Button
                  id="al"
                  type="submit"
                  aria-label="contact-form-cta"
                  className="w-full h-16 text-xl font-semibold text-white shadow-xl rounded"
                  aria-disabled={submitting}
                  disabled={submitting}
                >
                  Subscribe to our Newsletter
                </Button>
              )}

              {submitting && <LoadingButton className="w-full h-16 rounded" />}
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SubscriptionForm;
