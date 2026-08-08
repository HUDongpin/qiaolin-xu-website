import type { Metadata } from "next";
import Image from "next/image";
import { NextRoute } from "@/components/NextRoute";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Teaching Practice",
  description:
    "Documented K3 teaching responsibilities in language development, social studies, and daily classroom support.",
  path: "/teaching",
});

const practices = [
  {
    title: "Language development",
    description: "Taught language development to children in a K3 kindergarten class.",
  },
  {
    title: "Social studies",
    description: "Taught social studies as part of the documented K3 curriculum.",
  },
  {
    title: "Classroom support",
    description:
      "Assisted with classroom management, student supervision, and the implementation of classroom activities.",
  },
] as const;

export default function TeachingPage() {
  return (
    <>
      <article className="page-shell page-enter">
        <PageIntro
          title="Classroom practice, clearly defined."
          description="At Qicai Kindergarten, I taught language development and social studies in a K3 class and supported the lead teacher with daily classroom responsibilities."
        />

        <section className="teaching-layout container" aria-label="Documented teaching responsibilities">
          <div className="teaching-image" aria-hidden="true">
            <Image
              src="/images/lesson-planning.webp"
              alt=""
              fill
              sizes="(max-width: 767px) calc(100vw - 32px), 58vw"
            />
          </div>
          <div className="practice-list">
            {practices.map((practice) => (
              <article className="practice-item" key={practice.title}>
                <h2>{practice.title}</h2>
                <p>{practice.description}</p>
              </article>
            ))}
          </div>
        </section>
      </article>
      <NextRoute href="/experience" label="Continue" title="View professional experience" />
    </>
  );
}
