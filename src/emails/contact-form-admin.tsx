/** This is a email to the user for the contact form
 *  Type — invoice email
 */

import * as React from "react";
import {
  Html,
  Body,
  Container,
  Heading,
  Section,
  Text,
  Hr,
  Head,
  Preview,
} from "@react-email/components";
import Logo from "./components/logo";
import Footer from "./components/footer";

interface ContactFormAdminEmailProps {
  invoiceId: string;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  generatedOn: string;
}

export default function ContactFormAdminEmail({
  invoiceId,
  firstName,
  lastName,
  email,
  subject,
  message,
  generatedOn,
}: ContactFormAdminEmailProps) {
  const name = firstName + " " + lastName;

  return (
    <Html style={htmlStyles} lang="en">
      <Head />
      <Preview>Invoice generated as on {generatedOn}</Preview>
      <Body style={bodyStyles}>
        <Container style={containerStyles}>
          <Section style={logoSectionStyles}>
            <div style={logoContainerStyles}>
              <Logo />
            </div>
          </Section>

          <Container style={wrapperSectionStyles}>
            <Section style={invoiceSectionStyles}>
              <Heading style={invoiceHeadingStyles}>Invoice Number</Heading>

              <Text style={invoiceTextStyles}>{invoiceId}</Text>
            </Section>

            <Section style={baseStyles}>
              <Heading style={headingStyles}>
                Invoice generated as on {generatedOn}
              </Heading>
            </Section>

            <Section style={textSectionStyles}>
              <Text style={{ ...textStyles, margin: "24px 0" }}>
                {name} wants to connect with you. Please find below the invoice
                generated regarding the same.
              </Text>
            </Section>

            <Section style={invoiceDetailsSectionStyles}>
              <Heading style={invoiceDetailsSectionHeadingStyles}>
                Invoice Details
              </Heading>

              <Hr style={invoiceDetailsSectionHrStyles} />

              <Container style={invoiceDetailsSectionContainerStyles}>
                <div style={invoiceDetailsSectionContainerDivStyles}>
                  <strong style={{ fontWeight: 700 }}>Name : </strong>
                  <span style={{ fontWeight: 400 }}>{name}</span>
                </div>
              </Container>

              <Container style={invoiceDetailsSectionContainerStyles}>
                <div style={invoiceDetailsSectionContainerDivStyles}>
                  <strong style={{ fontWeight: 700 }}>Email : </strong>
                  <span style={{ fontWeight: 400 }}>{email}</span>
                </div>
              </Container>

              <Container style={invoiceDetailsSectionContainerStyles}>
                <div style={invoiceDetailsSectionContainerDivStyles}>
                  <strong style={{ fontWeight: 700 }}>Subject : </strong>
                  <span style={{ fontWeight: 400 }}>{subject}</span>
                </div>
              </Container>

              <Container style={invoiceDetailsSectionContainerStyles}>
                <div style={invoiceDetailsSectionContainerDivStyles}>
                  <strong style={{ fontWeight: 700 }}>Message : </strong>
                  <span style={{ fontWeight: 400, margin: "10px 0 0" }}>
                    {message}
                  </span>
                </div>
              </Container>
            </Section>

            <Section style={ignoreTextSectionStyles}>
              <Text style={ignoreTextStyles}>
                This is a system generated email. Please do not reply.
              </Text>
            </Section>

            <Footer />
          </Container>
        </Container>
      </Body>
    </Html>
  );
}

ContactFormAdminEmail.PreviewProps = {
  invoiceId: "VK4Y70Y4T4264730RVYT",
  firstName: "John",
  lastName: "Doe",
  email: "doe.john@mail.com",
  subject: "Test",
  message: "This is a test message!",
  generatedOn: "Mar 7, 2025",
} satisfies ContactFormAdminEmailProps;

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

const wrapperSectionStyles: React.CSSProperties = {
  width: "100%",
  margin: "10px 0 0",
};

const headingStyles: React.CSSProperties = {
  fontSize: "20px",
  fontWeight: 700,
  lineHeight: 1.5,
  margin: "24px 0 32px",
  padding: 0,
  ...baseStyles,
};

const textStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.5,
  ...baseStyles,
};

const invoiceSectionStyles: React.CSSProperties = {
  border: "1px solid #d1d5db",
  margin: "80px auto 16px",
  ...baseStyles,
};

const invoiceHeadingStyles: React.CSSProperties = {
  ...textStyles,
  fontWeight: 700,
  margin: 0,
  padding: "8px 16px",
};

const invoiceTextStyles: React.CSSProperties = {
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: 1.5,
  color: "#4b5563",
  padding: "8px 16px",
  margin: 0,
};

const textSectionStyles: React.CSSProperties = {
  ...noSpaceStyles,
  ...baseStyles,
};

const invoiceDetailsSectionStyles: React.CSSProperties = {
  margin: "4px 0 20px",
  ...baseStyles,
};

const invoiceDetailsSectionHeadingStyles: React.CSSProperties = {
  margin: 0,
  padding: "10px 0",
  fontSize: "18px",
  fontWeight: 600,
  ...baseStyles,
};

const invoiceDetailsSectionHrStyles: React.CSSProperties = {
  display: "block",
  width: "100%",
  borderColor: "#ddd",
  ...noSpaceStyles,
  ...baseStyles,
};

const invoiceDetailsSectionContainerStyles: React.CSSProperties = {
  margin: "10px 0",
  fontSize: "14px",
  lineHeight: 1.5,
  ...baseStyles,
};

const invoiceDetailsSectionContainerDivStyles: React.CSSProperties = {
  padding: "8px 0",
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
