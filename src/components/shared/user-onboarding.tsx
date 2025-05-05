"use client";

import * as React from "react";
import NewsLetterForm from "@/components/shared/newsletter-form";
import { VerifyEmailModal } from "@/components/shared/modal";

const UserOnboarding: React.FC = () => {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleSubscribeInit = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div data-layout="container">
      <NewsLetterForm onSubscribeInit={handleSubscribeInit} />

      {showModal && <VerifyEmailModal onClose={handleModalClose} />}
    </div>
  );
};

export default UserOnboarding;
