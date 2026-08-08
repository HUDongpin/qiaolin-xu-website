import type { Metadata } from "next";
import { NextRoute } from "@/components/NextRoute";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Volunteer Service",
  description: "Volunteer participation in kindergarten and community settings beyond paid employment.",
  path: "/service",
});

const serviceEntries = [
  {
    period: "Sep 2023 - May 2024",
    role: "Parent Volunteer",
    organization: "Tai Po Baptist Kindergarten",
  },
  {
    period: "Oct 2014",
    role: "Volunteer",
    organization: "38th Hong Kong Special Olympics Indoor Rowing Competition",
  },
] as const;

export default function ServicePage() {
  return (
    <>
      <article className="page-shell service-page page-enter">
        <PageIntro
          title="Service beyond paid roles."
          description="Volunteer participation in kindergarten and community settings beyond paid employment."
        />

        <section className="service-layout container" aria-label="Volunteer service">
          {serviceEntries.map((entry) => (
            <article className="service-entry" key={`${entry.role}-${entry.period}`}>
              <span>{entry.period}</span>
              <h2>{entry.role}</h2>
              <p>{entry.organization}</p>
            </article>
          ))}
        </section>
      </article>
      <NextRoute href="/contact" label="Continue" title="Contact Shirleen" />
    </>
  );
}
