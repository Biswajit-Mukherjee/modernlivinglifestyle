"use client";

import Script from "next/script";

const FundingChoicesLoader = () => {
  return (
    <>
      {/* Load the obfuscated script */}
      <Script id="funding-choices-init" strategy="afterInteractive">
        {`
(function(){
  'use strict';
  window.__h82AlnkH6D91__ = function(){
    var args = Array.prototype.slice.call(arguments);
    if (typeof window.atob === "function") {
      (new (function(window, atobArg){
        this.m = window;
        this.g = JSON.parse(window.atob(atobArg));
        this.j = this.g[0];
        this.u = this.g[3] || "";
        this.i = false;
        this.start = function(){
          var script = document.createElement("script");
          script.async = true;
          script.src = this.u;
          document.head.appendChild(script);
        };
        this.start();
      })(window, args[0]));
    }
  };
})();
        `}
      </Script>

      {/* This is the invocation of the function */}
      <Script id="funding-choices-data" strategy="afterInteractive">
        {`
window.__h82AlnkH6D91__("WyJwdWItMTgwNzg4OTM1OTI4MjU1OCIsW251bGwsbnVsbC... (TRUNCATED FOR BREVITY)");
        `}
      </Script>
    </>
  );
};

export default FundingChoicesLoader;
