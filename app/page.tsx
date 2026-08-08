import type { Metadata } from "next";
import Link from "next/link";
import { PhotoDiptych } from "@/components/PhotoDiptych";
import { createPageMetadata, CV_HREF, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Early Childhood Educator",
  description:
    "Meet Qiaolin XU (Shirleen), an early childhood educator with K3 experience, an M.Ed., native Mandarin, and a planned U.S. teaching pathway.",
  path: "/",
});

const highlights = [
  {
    value: "M.Ed.",
    label: "Early Childhood Education",
    href: "/education",
  },
  {
    value: "Sep 2021 - Jun 2023",
    label: "Documented K3 classroom experience",
    href: "/experience",
  },
  {
    value: "Native Mandarin",
    label: "Putonghua Grade 2, Level A",
    href: "/qualifications",
  },
  {
    value: "Planned U.S. pathway",
    label: "MAT study and teaching licensure",
    href: "/education",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <section className="home-hero container">
        <div className="home-copy page-enter">
          <p className="identity">{SITE_NAME}</p>
          <h1>Language builds belonging.</h1>
          <p className="hero-summary">
            Early childhood educator with K3 experience, an M.Ed., native Mandarin, and planned U.S. MAT study
            toward teaching licensure.
          </p>
          <div className="actions">
            <Link className="button primary" href="/teaching">
              Explore teaching
            </Link>
            <a className="button secondary" href={CV_HREF} download>
              Download CV
            </a>
          </div>
        </div>
        <div className="page-enter page-enter-late">
          <PhotoDiptych />
        </div>
      </section>

      <section className="highlight-ledger" aria-label="Professional qualification summary">
        <div className="highlight-grid container">
          {highlights.map((highlight) => (
            <Link
              className="highlight-item"
              href={highlight.href}
              key={`${highlight.value}-${highlight.label}`}
            >
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
