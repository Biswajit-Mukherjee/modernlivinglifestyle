"use client";

import * as React from "react";
import { MdOutlineCheckCircle } from "react-icons/md";
import { Button } from "@/components/ui/button";

type Props = Readonly<{ onClick: () => void; submitting: boolean }>;

const SubscribeToNewsletter: React.FC<Props> = ({ onClick, submitting }) => {
  const [done, setDone] = React.useState<boolean>(false);

  const handleCtaClick = () => {
    setDone(true);
  };

  const handleClose = () => {
    onClick();
  };

  return (
    <div className="w-full flex flex-col flex-1">
      {!done && (
        <div className="w-full flex flex-col flex-1">
          <div className="mt-4 mx-auto mb-8">
            <MdOutlineCheckCircle
              aria-label="modal-icon"
              className="text-green-500"
              size={48}
            />
          </div>

          <div className="text-center text-base font-semibold leading-normal antialiased">
            Your email has been verified successfully!
          </div>

          <div className="mt-4 text-center text-sm leading-normal antialiased">
            Please click on the button below to subscribe to our newsletter.
          </div>

          <div className="w-full mt-10" data-uia="subscribe-cta">
            <Button
              className="w-full h-14 text-base"
              aria-disabled={submitting}
              disabled={submitting}
              onClick={handleCtaClick}
            >
              Subscribe Now
            </Button>
          </div>
        </div>
      )}

      {done && (
        <div className="w-full flex flex-col flex-1">
          <div className="mt-4 mx-auto mb-8">
            <MdOutlineCheckCircle
              aria-label="modal-icon"
              className="text-green-500"
              size={64}
            />
          </div>

          <div className="text-center text-base font-semibold leading-normal antialiased">
            Thank You!
          </div>

          <div className="mt-4 text-center text-sm leading-normal antialiased">
            You are now subscribed to our email newsletter.
          </div>

          <div className="w-full mt-auto" data-uia="subscribe-cta">
            <Button
              className="w-full h-14 text-base"
              aria-disabled={submitting}
              disabled={submitting}
              onClick={handleClose}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribeToNewsletter;
