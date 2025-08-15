import * as React from "react";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { getFooterDetails } from "@/lib/utils";
import Logo from "@/components/shared/logo";

const Footer: React.FC = async () => {
  const foo = await getFooterDetails();

  // Get current year
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  return (
    <footer
      id="appFooter"
      aria-label={foo.label}
      className="foo w-full min-h-40 p-6 flex flex-col gap-8 bg-background border-t border-border"
    >
      <div className="flex-1">
        <div data-uia="footer-logo">
          <Logo />
        </div>

        <div
          data-uia="footer-contact"
          className="w-full mt-5 mx-0 mb-10 prose text-left text-base font-normal leading-normal antialiased text-card-foreground/80"
        >
          <PortableText value={foo.helpText} />
        </div>

        <div data-uia="footer-links" className="mt-8 mx-0 mb-4">
          <ul
            aria-label="footer-links"
            role="list"
            className="w-full grid gap-4"
          >
            {foo.links.map((link) => (
              <li
                key={link._key}
                aria-label={link.ariaLabel}
                className="underline underline-offset-2"
              >
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div
        aria-label="copyright-message"
        data-uia="footer-copyright"
        className="text-foreground/80 text-sm font-normal leading-normal text-center antialiased mt-6 mx-auto mb-4"
      >
        <span>
          &copy; Copyright {currentYear}. {foo.copyrightMsg}
        </span>
        <span className="sr-only">{foo.copyrightMsg}</span>
      </div>
    </footer>
  );
};

export default Footer;
