import type { Metadata } from "next";
import { NextRoute } from "@/components/NextRoute";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Language and Assessment Qualifications",
  description:
    "Mandarin and English language qualifications plus reported Praxis assessment scores, presented without licensure claims.",
  path: "/qualifications",
});

const scores = [
  {
    score: "196",
    title: "Chinese (Mandarin): World Language",
    test: "Praxis 5665",
  },
  {
    score: "175",
    title: "Elementary Education: Mathematics CKT",
    test: "Praxis 7813",
  },
  {
    score: "166",
    title: "Special Education: Foundational Knowledge",
    test: "Praxis 5355",
  },
] as const;

export default function QualificationsPage() {
  return (
    <>
      <article className="page-shell page-enter">
        <PageIntro
          title="Language proficiency and assessment scores."
          description="Reported qualifications and assessment scores that support continuing preparation for work in education."
        />

        <section
          className="qualification-layout container"
          aria-label="Language proficiency and reported scores"
        >
          <div className="language-column">
            <article>
              <h2>Mandarin</h2>
              <p>Native speaker</p>
              <p>Putonghua Shuiping Ceshi, Grade 2 Level A</p>
            </article>
            <article>
              <h2>English</h2>
              <p>Duolingo English Test</p>
              <p>Overall score: 120</p>
            </article>
          </div>

          <div className="score-composition">
            {scores.map((result, index) => (
              <article
                className={index === 0 ? "score-entry score-featured" : "score-entry"}
                key={result.test}
              >
                <strong>{result.score}</strong>
                <h2>{result.title}</h2>
                <p>{result.test}</p>
                <span>Reported score</span>
              </article>
            ))}
          </div>
        </section>

        <p className="assessment-note container">
          These values are reported assessment scores. Teaching licensure remains part of the planned U.S.
          professional pathway.
        </p>
      </article>
      <NextRoute href="/service" label="Continue" title="See volunteer service" />
    </>
  );
}
