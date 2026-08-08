import type { Metadata } from "next";
import { NextRoute } from "@/components/NextRoute";
import { PageIntro } from "@/components/PageIntro";
import { createPageMetadata } from "@/lib/site";

export const metadata: Metadata = createPageMetadata({
  title: "Professional Experience",
  description:
    "Early childhood classroom practice and higher-education academic operations experience from 2015 to 2023.",
  path: "/experience",
});

const roles = [
  {
    organization: "Qicai Kindergarten",
    period: "Sep 2021 - Jun 2023",
    title: "Kindergarten Teacher",
    description:
      "Taught language development and social studies to children in a K3 kindergarten class. Assisted the lead teacher with daily classroom management, student supervision, and classroom activities.",
    responsibilities: [
      "Language development",
      "Social studies",
      "Classroom management",
      "Student supervision",
    ],
  },
  {
    organization: "Chongqing Institute of Foreign Studies",
    period: "Jun 2015 - Jan 2018",
    title: "Academic Affairs Officer / Part-time Lecturer",
    description:
      "Coordinated undergraduate academic operations, including course scheduling, classroom allocation, examination administration, and academic timetable management.",
    responsibilities: [
      "Course scheduling",
      "Classroom allocation",
      "Examination administration",
      "Academic timetables",
    ],
  },
] as const;

export default function ExperiencePage() {
  return (
    <>
      <article className="page-shell page-enter">
        <PageIntro
          title="Experience across classrooms and academic operations."
          description="My documented experience spans early childhood classroom practice and higher-education academic operations."
        />

        <section className="roles-layout container" aria-label="Professional roles">
          {roles.map((role) => (
            <article className="role-entry" key={`${role.organization}-${role.period}`}>
              <div className="role-meta">
                <span>{role.organization}</span>
                <span>{role.period}</span>
              </div>
              <div className="role-content">
                <h2>{role.title}</h2>
                <p>{role.description}</p>
                <div className="responsibility-grid" aria-label={`${role.title} responsibilities`}>
                  {role.responsibilities.map((responsibility) => (
                    <span key={responsibility}>{responsibility}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </section>
      </article>
      <NextRoute href="/education" label="Continue" title="Review education and pathway" />
    </>
  );
}
