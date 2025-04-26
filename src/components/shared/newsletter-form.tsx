"use client";

import * as React from "react";
import { z } from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCheckCircle } from "react-icons/fa";
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

const NewsLetterForm: React.FC = () => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string | null>(null);

  /** Reset success message after 5s */
  React.useEffect(() => {
    setTimeout(() => {
      // Reset success message
      setMessage(null);
    }, 5000);
  }, [message]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof NewsletterFormSchema>>({
    resolver: zodResolver(NewsletterFormSchema),
    defaultValues: { email: "" },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof NewsletterFormSchema>) {
    setSubmitting(true);
    setTimeout(() => {
      console.log(values);

      // Reset form values
      form.reset();

      // Reset form status
      setSubmitting(false);

      // Set success message
      setMessage("You're now subscribed to our newsletter!");
    }, 5000);
  }

  return (
    <div className="w-full max-w-xl mx-auto" data-uia="form-container">
      {message && (
        <div className="w-full flex items-center justify-center">
          <div className="w-full align-middle leading-normal font-normal text-sm antialiased text-green-500 flex flex-row items-center gap-1.5 flex-1">
            <span data-uia="icon">
              <FaCheckCircle size={20} />
            </span>
            <span data-uia="message">{message}</span>
          </div>
        </div>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full grid">
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
                <FormMessage className="text-sm font-normal leading-normal antialiased" />
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

      <div
        aria-label="privacy-text"
        className="w-full mt-5 text-center align-middle text-sm leading-normal font-normal antialiased text-muted-foreground"
      >
        By subscribing, you agree with our{" "}
        <strong className="hover:underline active:underline underline-offset-2">
          <Link href="/terms-and-conditions">Terms</Link>
        </strong>{" "}
        and{" "}
        <strong className="hover:underline active:underline underline-offset-2">
          <Link href="/privacy">Privacy policy</Link>
        </strong>
        .
      </div>
    </div>
  );
};

export default NewsLetterForm;
