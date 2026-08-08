import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { StructuredData } from "@/components/StructuredData";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Early Childhood Educator`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Professional portfolio of Qiaolin XU (Shirleen), an early childhood educator with K3 experience, an M.Ed., and native Mandarin proficiency.",
  applicationName: `${SITE_NAME} Educator Portfolio`,
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  category: "education",
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${SITE_NAME} | Early Childhood Educator`,
    description:
      "K3 classroom experience, an M.Ed. in Early Childhood Education, native Mandarin, and a planned U.S. MAT and licensure pathway.",
    siteName: SITE_NAME,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Early Childhood Educator`,
    description:
      "K3 classroom experience, an M.Ed. in Early Childhood Education, native Mandarin, and a planned U.S. MAT and licensure pathway.",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f5" },
    { media: "(prefers-color-scheme: dark)", color: "#101619" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <StructuredData />
      </body>
    </html>
  );
}
