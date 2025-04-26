"use client";

import * as React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";

export type ContactSuccessModalProps = Readonly<{
  label: string;
  title: string;
  subtitle: string;
  body: never;
  onClose: () => void;
}>;

export const ContactSuccessModal: React.FC<ContactSuccessModalProps> = ({
  label,
  title,
  subtitle,
  body,
  onClose,
  ...props
}) => {
  return (
    <>
      <div
        aria-label="modal-overlay"
        className="w-full h-full top-0 left-0 fixed z-[100] bg-black/50"
        data-uia="overlay"
        role="presentation"
      />

      <div
        aria-label={label.toLowerCase().replaceAll(" ", "-")}
        className="w-full max-w-xl min-h-80 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] shadow-2xl m-auto bg-background text-foreground flex flex-col"
        {...props}
      >
        <div
          aria-label="modal-header"
          className="w-full flex items-center justify-center mt-16 mx-auto mb-1"
        >
          <FaCheckCircle
            aria-label="modal-icon"
            className="text-green-400"
            size={54}
          />
        </div>

        <div
          aria-label="modal-content"
          className="w-full flex flex-col flex-1 p-5"
        >
          <h1
            aria-label="modal-title"
            className="text-xl sm:text-2xl md:text-3xl text-center font-bold leading-normal antialiased"
          >
            {title}
          </h1>

          <div
            aria-label="modal-subtitle"
            className="w-full flex-1 mt-4 text-center text-muted-foreground text-base font-normal leading-normal antialiased"
          >
            {subtitle}
          </div>

          <div
            aria-label="modal-body"
            className="w-full flex-1 mt-4 text-center text-muted-foreground text-base font-normal leading-normal antialiased"
          >
            <PortableText value={body} />
          </div>
        </div>

        <div
          aria-label="modal-close"
          className="w-full flex items-center justify-center p-6"
        >
          <Button
            type="button"
            aria-label="close-btn"
            className="w-full max-w-xs h-12 mx-auto my-4 flex items-center justify-center text-base leading-none antialiased"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
