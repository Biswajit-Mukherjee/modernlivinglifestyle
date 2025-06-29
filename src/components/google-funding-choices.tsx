"use client";

import Script from "next/script";

const GoogleFundingChoices = () => {
  return (
    <>
      {/* Load the async script */}
      <Script
        src="https://fundingchoicesmessages.google.com/i/pub-1807889359282558?ers=1"
        strategy="afterInteractive"
        async
      />

      {/* Inline script to signal iframe */}
      <Script id="google-fc-signal" strategy="afterInteractive">
        {`
          (function() {
            function signalGooglefcPresent() {
              if (!window.frames['googlefcPresent']) {
                if (document.body) {
                  const iframe = document.createElement('iframe');
                  iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
                  iframe.style.display = 'none';
                  iframe.name = 'googlefcPresent';
                  document.body.appendChild(iframe);
                } else {
                  setTimeout(signalGooglefcPresent, 0);
                }
              }
            }
            signalGooglefcPresent();
          })();
        `}
      </Script>
    </>
  );
};

export default GoogleFundingChoices;
