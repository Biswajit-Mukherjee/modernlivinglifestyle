/* eslint-disable @typescript-eslint/no-namespace */

import * as React from "react";
import type { SanityImageAssetDocument } from "next-sanity";
import type { Robots } from "next/dist/lib/metadata/types/metadata-types";

// Next types
export namespace NextTypes {
  export type Layout = Readonly<{
    children: React.ReactNode;
  }>;
}

// Sanity types
export namespace SanityTypes {
  export type Metadata = Readonly<{
    title: string;
    description: string;
    metadataBase: string;
    robots: string | Robots | null | undefined;
    image: SanityImageAssetDocument;
    keywords: string[] | null | undefined;
    applicationName: string;
    creator: string;
  }>;

  export type Blog = Readonly<{
    id: string;
    slug: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    description: string;
    image: SanityImageAssetDocument;
    author: { name: string };
    seo: string | string[];
    numberOfCharacters: number;
    estimatedWordCount: number;
    estimatedReadingTimeInMins: number;
  }>;

  export type Profile = Readonly<{
    name: string;
    jobTitle: string;
    description: never;
    image: SanityImageAssetDocument;
    email: string;
    facebook: string;
    youtube: string;
  }>;

  export type Author<T> = Readonly<{
    _id: string;
    name: string;
    image: T;
  }>;

  export type BlogDetails = Blog &
    Readonly<{
      content: never;
      author: SanityImageAssetDocument | undefined;
      seo: string[] | null | undefined;
    }>;

  export type PrivacyPolicy = Readonly<{
    title: string;
    description: never;
    createdAt: Date;
    updatedAt: Date;
    metadata: Metadata;
  }>;

  export type Terms = Readonly<{
    title: string;
    description: never;
    createdAt: Date;
    updatedAt: Date;
    metadata: Metadata;
  }>;

  export type Disclaimer = Readonly<{
    title: string;
    description: never;
    createdAt: Date;
    metadata: Metadata;
  }>;

  export type AboutSite = Readonly<{
    title: string;
    description: never;
    hero: SanityImageAssetDocument;
    about: SanityImageAssetDocument;
    metadata: Metadata;
  }>;

  export type Contact = Readonly<{
    hero: SanityImageAssetDocument;
    title: string;
    description: never;
    modal: { name: string; title: string; body: never };
    metadata: Metadata;
  }>;

  export type Homepage = Readonly<{
    title: string;
    image: SanityImageAssetDocument;
    intro: never;
    metadata: Metadata;
  }>;
}

// Navlink types
export type Navlinks = Readonly<{ label: string; navlinks: Navlink[] }>;

export type Navlink = Readonly<{
  _key: string;
  label: string;
  pathname: string;
  href: string;
}>;

// Footer types
export type FooterLink = Readonly<{
  _key: string;
  label: string;
  ariaLabel: string;
  href: string;
}>;

export type Footer = Readonly<{
  label: string;
  helpText: never;
  links: FooterLink[];
  copyrightMsg: string;
}>;
