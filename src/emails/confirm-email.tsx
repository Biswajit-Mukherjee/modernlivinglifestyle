/** This is a email to verify the email address of the user
 *  Type — confirmation email
 */

import * as React from "react";
import {
  Html,
  Body,
  Container,
  Heading,
  Section,
  Text,
  Head,
  Preview,
  Link,
} from "@react-email/components";
import Logo from "./components/logo";
import Footer from "./components/footer";

interface ConfirmUserEmailProps {
  link: string;
}

export default function ConfirmUserEmail({ link }: ConfirmUserEmailProps) {
  return (
    <Html style={htmlStyles} lang="en">
      <Head />
      <Preview>
        Verify your email to subscribe to The Modern Living Lifestyle
      </Preview>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          <Section style={logoSectionStyles}>
            <div style={logoContainerStyles}>
              <Logo />
            </div>
          </Section>

          <Section style={textSectionStyles}>
            <Heading style={headingStyles}>Verify your email address</Heading>

            <Text style={{ ...textStyles, margin: "40px 0 20px" }}>
              You&apos;re almost there!
            </Text>

            <Text style={{ ...textStyles, margin: 0 }}>
              We need to make sure it&apos;s really you to finish your
              onboarding. Click on the link below to verify your email address.
            </Text>
          </Section>

          <Section style={ctaSectionStyles}>
            <Link style={ctaButtonStyles} role="button" href={link}>
              Verify Email
            </Link>
          </Section>

          <Section style={linkSectionStyles}>
            <Text style={linkTextStyles}>
              Or, copy and paste the following link in your browser.
            </Text>
            <Link style={linkStyles}>{link}</Link>
          </Section>

          <Section style={ignoreTextSectionStyles}>
            <Text style={ignoreTextStyles}>
              If you did not request this email, you can safely ignore this
              message.
            </Text>
          </Section>

          <Footer />
        </Container>
      </Body>
    </Html>
  );
}

ConfirmUserEmail.PreviewProps = {
  link: "https://modernlivinglifestyle.com/onboarding/confirm?token=HzFW44HxFYfYVhls9yP-rIWLnKA8JslElr3f",
} satisfies ConfirmUserEmailProps;

const baseStyles: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
};

const noSpaceStyles: React.CSSProperties = {
  margin: 0,
  padding: 0,
};

const htmlStyles: React.CSSProperties = {
  ...noSpaceStyles,
  ...baseStyles,
};

const bodyStyles: React.CSSProperties = {
  height: "100%",
  lineHeight: 1.5,
  fontFamily:
    'ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
  ...noSpaceStyles,
  ...baseStyles,
};

const containerStyles: React.CSSProperties = {
  padding: "10px",
  ...baseStyles,
};

const logoSectionStyles: React.CSSProperties = {
  margin: "40px auto",
  ...baseStyles,
};

const logoContainerStyles: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ...baseStyles,
};

const textSectionStyles: React.CSSProperties = {
  width: "100%",
  margin: "96px 0 0",
};

const headingStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: 1.5,
  ...noSpaceStyles,
  ...baseStyles,
};

const textStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.5,
  ...baseStyles,
};

const ctaSectionStyles: React.CSSProperties = {
  margin: "80px auto 40px",
  ...baseStyles,
};

const ctaButtonStyles: React.CSSProperties = {
  display: "block",
  cursor: "pointer",
  userSelect: "none",
  backgroundColor: "#7C3AED",
  color: "#fff",
  padding: "20px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: 600,
  ...baseStyles,
};

const linkSectionStyles: React.CSSProperties = {
  margin: "40px 0",
  padding: 0,
  ...baseStyles,
};

const linkTextStyles: React.CSSProperties = {
  ...textStyles,
  ...baseStyles,
};

const linkStyles: React.CSSProperties = {
  display: "block",
  textDecoration: "underline",
  margin: "16px 0",
  cursor: "pointer",
  ...textStyles,
  ...baseStyles,
};

const ignoreTextSectionStyles: React.CSSProperties = {
  margin: "40px 0",
  ...baseStyles,
};

const ignoreTextStyles: React.CSSProperties = {
  color: "#4b5563",
  ...textStyles,
};
