import type { Metadata } from "next";

export const SITE_URL = "https://www.xuqiaolin.com";
export const SITE_NAME = "Qiaolin XU (Shirleen)";
export const PUBLIC_EMAIL = "shirleenxql@gmail.com";
export const CV_HREF = "/Qiaolin-XU-Shirleen-CV.pdf";

export const navigation = [
  { href: "/teaching", label: "Teaching" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/qualifications", label: "Qualifications" },
  { href: "/service", label: "Service" },
  { href: "/contact", label: "Contact" },
] as const;

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
};

export function createPageMetadata({ title, description, path }: MetadataOptions): Metadata {
  const canonical = path === "/" ? SITE_URL : `${SITE_URL}${path}`;

  return {
    title: path === "/" ? { absolute: `${SITE_NAME} | ${title}` } : title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      title: `${title} | ${SITE_NAME}`,
      description,
      siteName: SITE_NAME,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${SITE_NAME}`,
      description,
    },
  };
}
