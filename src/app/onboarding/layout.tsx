import * as React from "react";

const OnboardingLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <main className="w-full min-h-[75vh] flex items-center justify-center">
      <React.Suspense fallback={<div className="loader" />}>
        <>{children}</>
      </React.Suspense>
    </main>
  );
};

export default OnboardingLayout;
