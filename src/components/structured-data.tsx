import * as React from "react";
import Script from "next/script";
import {
  AboutPage,
  BlogPosting,
  CollectionPage,
  Organization,
  WebPage,
  WebSite,
  WithContext,
} from "schema-dts";

type Props = {
  data: WithContext<
    BlogPosting | WebPage | WebSite | AboutPage | CollectionPage | Organization
  >;
};

const StructuredData: React.FC<Props> = ({ data }): React.JSX.Element => {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default StructuredData;
