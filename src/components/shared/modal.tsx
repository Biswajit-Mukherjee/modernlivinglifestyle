"use client";

import * as React from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
// import EmailOtpForm from "@/components/shared/email-otp-form";
// import UserInfoForm, {
//   UserInfoFormInputs,
// } from "@/components/shared/user-info-form";

/** Modal overlay */
export const ModalOverlay: React.FC = () => {
  return (
    <div
      aria-label="modal-overlay"
      className="w-full h-full top-0 left-0 fixed z-[100] bg-black/50"
      data-uia="overlay"
      role="presentation"
    />
  );
};

/** Contact Us success modal */
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
      <ModalOverlay />

      <div className="modal-wrapper p-2" data-uia="modal-wrapper">
        <div
          aria-label={label.toLowerCase().replaceAll(" ", "-")}
          className="modal"
          {...props}
        >
          <div
            aria-label="modal-header"
            className="w-full flex items-center justify-center mt-16 mx-auto mb-1"
          >
            <MdOutlineCheckCircle
              aria-label="modal-icon"
              className="text-green-500"
              size={60}
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
      </div>
    </>
  );
};

/** User info modal */
// export type UserInfoModalProps = Readonly<{
//   email: string;
//   onFormSubmit: (fieldValues: UserInfoFormInputs, email: string) => void;
// }>;

// export const UserInfoModal: React.FC<UserInfoModalProps> = ({
//   email,
//   onFormSubmit,
// }) => {
//   return (
//     <>
//       <ModalOverlay />

//       <div className="modal-wrapper p-2" data-uia="modal-wrapper">
//         <div aria-label="newsletter-modal" className="modal pt-5 px-5 pb-10">
//           <UserInfoForm email={email} onFormSubmit={onFormSubmit} />
//         </div>
//       </div>
//     </>
//   );
// };

/** Email verification modal */
// export type VerifyEmailModalProps = Readonly<{
//   email: string;
//   values: UserInfoFormInputs;
//   onClose: () => void;
// }>;

// export const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
//   email,
//   values,
//   onClose,
// }) => {
//   return (
//     <>
//       <ModalOverlay />

//       <div className="modal-wrapper p-2" data-uia="modal-wrapper">
//         <div aria-label="newsletter-modal" className="modal pt-5 px-5 pb-10">
//           <EmailOtpForm
//             className="w-full flex-1"
//             email={email}
//             values={values}
//             onClose={onClose}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

export type VerifyEmailModalProps = Readonly<{ onClose: () => void }>;

export const VerifyEmailModal: React.FC<VerifyEmailModalProps> = ({
  onClose,
}) => {
  return (
    <>
      <ModalOverlay />

      <div className="modal-wrapper p-2" data-uia="modal-wrapper">
        <div aria-label="newsletter-modal" className="modal flex flex-col p-6">
          <h1 className="w-full mt-2.5 mx-auto mb-0 text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-normal antialiased">
            Verify your email
          </h1>

          <div className="w-full p-8 text-center text-xs sm:text-sm md:text-base leading-normal text-muted-foreground antialiased">
            We have sent you an email with instructions for verification. Check
            your spam or junk folder if you don&apos;t see the email in your
            inbox.
          </div>

          <Button
            onClick={onClose}
            className="w-full h-14 text-base antialiased mt-auto"
          >
            Close
          </Button>
        </div>
      </div>
    </>
  );
};
