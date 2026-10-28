import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { Timeline } from "@/components/sections/Timeline";
import { CTABanner } from "@/components/sections/CTABanner";
import { PageMenu } from "@/components/layout/PageMenu";
import { LinkButton } from "@/components/ui/Button";
import { importantDates } from "@/data/site";

export default function StartHere() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Start Here"
        description="Toronto's Only Independent IB World School for Girls."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Start Here" }]}
        tone="coral"
        image="/images/students-collaborating.jpg"
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-white">How to Apply</LinkButton>}
      />

      <PageMenu
        items={[
          { id: "why-branksome", label: "Why Choose Branksome" },
          { id: "programs", label: "Our Programs" },
          { id: "dates", label: "Important Dates" },
        ]}
      />

      <ImageTextSplit
        id="why-branksome"
        eyebrow="Why choose Branksome Hall"
        title="Toronto's Only Independent IB World School for Girls"
        image="/images/classroom-science.jpg"
        imageAlt="A teacher helping students with an interactive classroom activity."
      >
        <p>
          As Toronto's only independent school for girls offering the IB curriculum from JK to Grade 12,
          including more than 40 Boarding students from around the world, we're giving our students the
          confidence to take their futures by storm — making us proud to say: "A Branksome girl did that."
        </p>
        <p>
          As an IB World School, Branksome Hall values multiple perspectives, welcoming students from many
          different countries, cultures and backgrounds. We are committed to international-mindedness, fostering
          an innovation mindset and putting collaborative learning into action.
        </p>
      </ImageTextSplit>

      <section id="programs" className="scroll-mt-24 bg-brand-green-100/50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <h2 className="font-display text-center text-2xl font-extrabold text-brand-green-900 sm:text-3xl">
            Our Programs
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-ink/70 sm:text-base">
            We prepare students to lead in an ever-changing world, emphasizing critical, creative and
            collaborative thinking, diverse perspectives and effective communication in a global context.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { title: "Our Branksome Difference", to: "/about/the-branksome-difference" },
              { title: "Our IB Advantage", to: "/learning/our-ib-advantage" },
              { title: "Boarding Program", to: "/admissions/boarding-program" },
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

      <Timeline id="dates" eyebrow="Plan ahead" title="Important Dates" items={importantDates.map((d) => ({ title: d.title, detail: d.detail }))} />

      <CTABanner
        tone="coral"
        title="Her Future Starts Here"
        description="At Branksome Hall, innovation powers learning. Through cutting-edge programs, global opportunities, and creative problem-solving, we nurture bold thinkers who will shape the future."
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-white">How to Apply</LinkButton>}
      />
    </>
  );
}
