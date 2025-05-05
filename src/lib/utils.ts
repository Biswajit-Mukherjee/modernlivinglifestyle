import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";
import { sanityClient } from "./sanity";
import { Footer, Navlinks, type SanityTypes } from "@/@types";
import { MOST_RECENT_BLOGS, NUMBER_OF_BLOGS_PER_PAGE } from "./data";

/** Merge tailwind classes */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Get base url */
export function getBaseUrl(): string {
  const baseUrl =
    process.env.NODE_ENV === "development"
      ? process.env.SITE_URL_DEV!
      : process.env.SITE_URL!;
  return baseUrl;
}

/** Generate nanoid random number */
export function generateID(): string {
  const customNanoid = customAlphabet("1234567890qKORTVWXYZ", 20);
  const id = customNanoid();
  return id;
}

/** Generate nanoid otp */
export function generateOtp(): string {
  const customNanoid = customAlphabet("1234567890", 6);
  const otp = customNanoid();
  return otp;
}

/** Generate nanoid token */
export function generateToken(): string {
  const customNanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-",
    36
  );
  const token = customNanoid();
  return token;
}

/** Fetch most recent blogs from Sanity in descending order of creation date */
export async function getMostRecentBlogs(): Promise<SanityTypes.Blog[]> {
  const blogs: SanityTypes.Blog[] = await getBlogs();
  const recentBlogs: SanityTypes.Blog[] = blogs.slice(0, MOST_RECENT_BLOGS);
  return recentBlogs;
}

/** Fetch all blogs from Sanity in descending order of creation date */
export async function getBlogs(): Promise<SanityTypes.Blog[]> {
  const query = `
    *[_type == 'blog'] | order(_createdAt desc) {
      "id": _id,
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      "slug": slug.current,
      description,
      title,
      image,
      author -> { name },
    }`;

  const data: SanityTypes.Blog[] = await sanityClient.fetch(query);
  return data;
}

/** Fetch blog by slug from Sanity */
export async function getBlog(slug: string): Promise<SanityTypes.BlogDetails> {
  const query = `
    *[_type == 'blog' && slug.current == $slug][0] {
      "id": _id,
      "createdAt": _createdAt,
      "slug": slug.current,
      description,
      content,
      title,
      image,
      author -> { name, image },
      seo,
      "numberOfCharacters": length(pt::text(content)),
      "estimatedWordCount": round(length(pt::text(content)) / 5),
      "estimatedReadingTimeInMins": round(length(pt::text(content)) / 5 / 180 ),
    }`;

  const data: SanityTypes.BlogDetails = await sanityClient.fetch(query, {
    slug,
  });
  return data;
}

/** Fetch user profile details from Sanity */
export async function getProfile() {
  const query = `
    *[_type == 'profile'] {
      name,
      jobTitle,
      description,
      image,
      email,
      facebook,
      youtube
    }`;

  const data: SanityTypes.Profile[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch blogs by search query */
export async function getBlogsByQuery(
  searchQuery: string,
  startIndex: number = 0
): Promise<SanityTypes.Blog[]> {
  const endIndex = startIndex + NUMBER_OF_BLOGS_PER_PAGE;

  // GROQ query to fetch blogs that contains the queried string
  const query = searchQuery
    ? `
    *[_type == 'blog' && (title match "*${searchQuery}*" || description match "*${searchQuery}*")] | order(_createdAt desc) [${startIndex}...${endIndex}] {
    "id": _id,
    "createdAt": _createdAt,
    "slug": slug.current,
    description,
    title,
    image
  }`
    : `
    *[_type == 'blog'] | order(_createdAt desc) [${startIndex}...${endIndex}] {
    "id": _id,
    "createdAt": _createdAt,
    "slug": slug.current,
    description,
    title,
    image
  }`;

  const data: SanityTypes.Blog[] = await sanityClient.fetch(query);
  return data;
}

/** Fetch privacy policy from Sanity */
export async function getPrivacyPolicy() {
  const query = `
    *[_type == 'privacy'] {
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      title,
      description,
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.PrivacyPolicy[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch terms & conditions from Sanity */
export async function getTermsAndConditions() {
  const query = `
    *[_type == 'terms'] {
      "createdAt": _createdAt,
      "updatedAt": _updatedAt,
      title,
      description,
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.Terms[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch disclaimer from Sanity */
export async function getDisclaimer() {
  const query = `
    *[_type == 'disclaimer'] {
      "createdAt": _createdAt,
      title,
      description,
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.Disclaimer[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch about us details from Sanity */
export async function getSiteInfo() {
  const query = `
    *[_type == 'about'] {
      title,
      subtitle,
      description,
      hero,
      about,
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.AboutSite[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch contact us details from Sanity */
export async function getContactUsDetails() {
  const query = `
    *[_type == 'contact'] {
      hero,
      title,
      description,
      modal -> { name, title, subtitle, body },
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.Contact[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch homepage details from Sanity */
export async function getHomepageDetails() {
  const query = `
    *[_type == 'home'] {
      title,
      image,
      intro,
      "metadata":pageMeta->{
        title,
        description,
        image,
        applicationName,
        creator,
        metadataBase,
        robots,
        keywords
      },
    }`;

  const data: SanityTypes.Homepage[] = await sanityClient.fetch(query);
  return data[0];
}

/** Fetch homepage navlinks from Sanity */
export async function getHomepageNavlinks() {
  const query = `
    *[_type == 'navlink'] {
      label,
      navlinks
    }`;

  const data = await sanityClient.fetch(query);
  return data[0] as Navlinks;
}

/** Fetch footer details from Sanity */
export async function getFooterDetails() {
  const query = `
    *[_type == 'footer'] {
      label,
      helpText,
      copyrightMsg,
      links,
    }`;

  const data: Footer[] = await sanityClient.fetch(query);
  return data[0];
}
