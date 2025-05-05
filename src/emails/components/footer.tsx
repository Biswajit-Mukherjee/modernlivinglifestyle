import * as React from "react";
import { Link, Section, Text } from "@react-email/components";

export default function Footer() {
  return (
    <Section style={footerSectionStyles}>
      <Text style={{ ...copyrightTextStyles, margin: 0 }}>
        Copyright &copy; 2025 &nbsp; | &nbsp;{" "}
        <Link href="https://modernlivinglifestyle.com">
          Modern Living Lifestyle
        </Link>
      </Text>

      <Text style={rightsTextStyles}>All rights reserved</Text>
    </Section>
  );
}

const baseStyles: React.CSSProperties = {
  boxSizing: "border-box",
  width: "100%",
};

const footerSectionStyles: React.CSSProperties = {
  margin: "20px 0 0",
  textAlign: "center",
  ...baseStyles,
};

const textStyles: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: 1.5,
  ...baseStyles,
};

const copyrightTextStyles: React.CSSProperties = {
  color: "#4b5563",
  ...textStyles,
};

const rightsTextStyles: React.CSSProperties = {
  margin: "16px 0 32px",
  ...copyrightTextStyles,
};
