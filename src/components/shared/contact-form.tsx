"use client";

import * as React from "react";
import { z } from "zod";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, LoadingButton } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormSchema } from "@/lib/schema";
import { sendEmail } from "@/actions/contact-form-action";
import { ContactSuccessModal } from "@/components/shared/modal";

export type ContactFormInputs = z.infer<typeof ContactFormSchema>;

type Props = Readonly<{
  modal: { name: string; title: string; subtitle: string; body: never };
}>;

const ContactForm: React.FC<Props> = ({ modal }) => {
  const [submitting, setSubmitting] = React.useState<boolean>(false);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof ContactFormSchema>>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      message: "",
      subject: "",
      subscriber: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
    setSubmitting(true);

    const result = await sendEmail(data);

    if (result?.success) {
      // Set success modal
      setShowModal(true);
    } else {
      toast.error(result?.data?.error?.message);
    }

    // Reset form values
    form.reset();

    // Reset form status
    setSubmitting(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full max-w-xl mx-auto grid gap-2.5 mt-10">
        <div className="w-full mt-5" data-uia="form-container">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full max-w-[540px] mx-auto grid gap-5"
            >
              {/* Mandatory fields */}
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background w-full min-h-12 shadow-none flex-1 aria-invalid:border-destructive rounded-sm focus-visible:ring-2 ring-offset-2 text-base"
                        placeholder="Enter your first name"
                        aria-label="name"
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
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background w-full min-h-12 shadow-none flex-1 aria-invalid:border-destructive rounded-sm focus-visible:ring-2 ring-offset-2 text-base"
                        placeholder="Enter your last name"
                        aria-label="name"
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
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      Email address
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background w-full min-h-12 shadow-none flex-1 rounded-sm aria-invalid:border-destructive focus-visible:ring-2 ring-offset-2 text-base"
                        placeholder="Enter your email address"
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

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      Subject
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="bg-background w-full min-h-12 shadow-none flex-1 rounded-sm aria-invalid:border-destructive focus-visible:ring-2 ring-offset-2 text-base"
                        placeholder="What is your message about?"
                        aria-label="subject"
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      Message
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="bg-background w-full min-h-40 shadow-none aria-invalid:border-destructive focus-visible:ring-2 ring-offset-2"
                        placeholder="Enter your message or query"
                        aria-label="message"
                        disabled={submitting}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Optional field */}
              <FormField
                control={form.control}
                name="subscriber"
                render={({ field }) => (
                  <FormItem className="flex flex-col flex-1">
                    <FormLabel className="text-foreground text-base font-normal antialiased">
                      Are you a subscriber on my youtube? (optional)
                    </FormLabel>

                    <Select
                      disabled={submitting}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl className="bg-background w-full min-h-12 shadow-none flex-1 rounded-sm focus-visible:ring-2 ring-offset-2 text-base">
                        <SelectTrigger className="text-sm font-normal antialiased">
                          <SelectValue
                            aria-label="default-value"
                            placeholder="Please choose an option"
                          />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent aria-label="subscriber-select">
                        <SelectItem
                          className="w-full my-2 text-sm font-normal antialiased cursor-pointer"
                          aria-label="option — yes"
                          value="yes"
                        >
                          Yes
                        </SelectItem>

                        <SelectItem
                          className="w-full my-2 text-sm font-normal antialiased cursor-pointer"
                          aria-label="option — no"
                          value="no"
                        >
                          No
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <div className="w-full mt-6" data-uia="btn-container">
                {!submitting && (
                  <Button
                    id="al"
                    type="submit"
                    aria-label="contact-form-cta"
                    className="w-full h-14 text-xl font-normal text-white rounded-sm"
                    aria-disabled={submitting}
                    disabled={submitting}
                  >
                    Submit
                  </Button>
                )}

                {submitting && (
                  <LoadingButton className="w-full h-14 rounded-sm" />
                )}
              </div>
            </form>
          </Form>
        </div>
      </div>

      <div data-uia="form-success">
        {showModal && (
          <ContactSuccessModal
            label={modal.name}
            title={modal.title}
            subtitle={modal.subtitle}
            body={modal.body}
            onClose={handleModalClose}
          />
        )}
      </div>
    </>
  );
};

export default ContactForm;
