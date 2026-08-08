import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata, CV_HREF, PUBLIC_EMAIL } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Contact",
  description:
    "Contact Qiaolin XU (Shirleen) about future U.S. school opportunities aligned with early childhood education and Mandarin proficiency.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <article className="page-shell contact-page page-enter">
      <PageIntro
        title="Start a professional conversation."
        description="I welcome inquiries from U.S. schools about future opportunities aligned with my early childhood experience and developing licensure pathway."
      />

      <section className="contact-layout container" aria-label="Professional contact options">
        <div>
          <h2>{PUBLIC_EMAIL}</h2>
          <p>Public contact is kept to email for privacy.</p>
        </div>
        <div className="contact-actions">
          <a className="button primary" href={`mailto:${PUBLIC_EMAIL}`}>
            Email Shirleen
          </a>
          <a className="button secondary" href={CV_HREF} download>
            Download CV
          </a>
        </div>
      </section>
    </article>
  );
}
