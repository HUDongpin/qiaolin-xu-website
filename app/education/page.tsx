import type { Metadata } from "next";
import { NextRoute } from "@/components/NextRoute";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Education and U.S. Teaching Pathway",
  description:
    "Completed education in early childhood and public affairs management, with a separately identified planned U.S. MAT and licensure pathway.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <>
      <article className="page-shell page-enter">
        <PageIntro
          title="Education and planned U.S. pathway."
          description="Completed qualifications remain clearly separated from future study and licensure plans."
        />

        <section className="education-layout container" aria-label="Completed education">
          <article className="degree-entry degree-masters">
            <span>Aug 2014 - May 2015</span>
            <h2>Master of Education in Early Childhood Education</h2>
            <p>The Education University of Hong Kong</p>
          </article>
          <article className="degree-entry degree-bachelors">
            <span>Sep 2010 - Jun 2014</span>
            <h2>Bachelor of Management in Public Affairs Management</h2>
            <p>Changzhou University</p>
          </article>
        </section>

        <section className="planned-pathway" aria-labelledby="planned-pathway-title">
          <div className="planned-pathway-inner container">
            <span>Planned professional pathway</span>
            <div>
              <h2 id="planned-pathway-title">U.S. Master of Arts in Teaching and teaching licensure</h2>
              <p>Program, enrollment, and licensure details will be updated when formally confirmed.</p>
            </div>
          </div>
        </section>
      </article>
      <NextRoute href="/qualifications" label="Continue" title="View qualifications" />
    </>
  );
}
