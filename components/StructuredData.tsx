import { PUBLIC_EMAIL, SITE_NAME, SITE_URL } from "@/lib/site";

export function StructuredData() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: SITE_NAME,
      alternateName: "Shirleen Xu",
      url: SITE_URL,
      email: `mailto:${PUBLIC_EMAIL}`,
      jobTitle: "Early Childhood Educator",
      knowsLanguage: ["Mandarin Chinese", "English"],
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "The Education University of Hong Kong",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Changzhou University",
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: `${SITE_NAME} Educator Portfolio`,
      url: SITE_URL,
      inLanguage: "en-US",
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
