import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { Timeline } from "@/components/sections/Timeline";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageMenu } from "@/components/layout/PageMenu";
import { LinkButton } from "@/components/ui/Button";
import { admissionsSteps, siteInfo } from "@/data/site";

export default function StartHere() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Start Here"
        description={`Everything a family needs to begin the conversation about joining ${siteInfo.name}.`}
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Start Here" }]}
        tone="coral"
        image="/images/students-collaborating.jpg"
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-white">How to Apply</LinkButton>}
      />

      <PageMenu
        items={[
          { id: "why-mggs", label: "Why Choose MGGS" },
          { id: "programs", label: "What We Offer" },
          { id: "process", label: "How Admissions Works" },
        ]}
      />

      <ImageTextSplit
        id="why-mggs"
        eyebrow="Why choose Marvellous Greatness Group of Schools"
        title="A School That Takes Your Child's Future Seriously"
        image="/images/classroom-science.jpg"
        imageAlt="A teacher helping pupils with an interactive classroom activity."
      >
        <p>
          Choosing a school is one of the most important decisions a family makes. At MGGS, that decision is
          supported by clear expectations, committed teachers and a school culture built on discipline,
          dedication and excellent performance.
        </p>
        <p>
          We keep our promises modest and specific: your child will be taught well, known well and encouraged
          to grow in character as well as attainment. Families are treated as partners in that work.
        </p>
      </ImageTextSplit>

      <section id="programs" className="scroll-mt-24 bg-brand-green-100/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-display text-center text-2xl font-extrabold text-brand-green-900 sm:text-3xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70 sm:text-base">
            Quality education, moral instruction, co-curricular opportunity and a close partnership with
            families — brought together in one supportive learning environment.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "The MGGS Difference", to: "/about/the-mggs-difference" },
              { title: "Our Academic Approach", to: "/academics/our-academic-approach" },
              { title: "Parent Partnership", to: "/admissions/parent-partnership" },
            ].map((p) => (
              <div key={p.title} className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-brand-green-900">{p.title}</h3>
                <LinkButton to={p.to} variant="text" className="mt-3">
                  Learn more →
                </LinkButton>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Timeline
        id="process"
        eyebrow="Plan ahead"
        title="How Admissions Works"
        description="Our process is deliberately simple. The school office will confirm dates, requirements and any assessment arrangements directly with your family."
        items={admissionsSteps}
      />

      <CTABanner
        tone="coral"
        title="Your Child's Future Starts Here"
        description="At MGGS, learning is purposeful and personal. Through careful teaching, moral guidance and a supportive community, we help every pupil grow into a confident, capable young person."
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-white">How to Apply</LinkButton>}
      />
    </>
  );
}
