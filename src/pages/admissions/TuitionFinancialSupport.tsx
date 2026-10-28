import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { Container } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";

export default function TuitionFinancialSupport() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Tuition & Financial Support"
        description="An educational investment — understanding the costs and affordability options for a Branksome education."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Tuition & Financial Support" }]}
        tone="sky"
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-ink/80">
            Most families have questions about the costs of independent school. We strongly believe that a
            Branksome education is an investment — one that will continue to pay off for an entire lifetime.
          </p>
          <a
            href="mailto:admissions@branksome.on.ca"
            className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral hover:underline"
          >
            Email Admissions team →
          </a>
        </Container>
      </section>

      <ImageTextSplit
        eyebrow="Annual tuition setting"
        title="Tuition and Other Costs"
        image="/images/campus-courtyard.jpg"
        imageAlt="A campus building with mature trees."
        actions={
          <LinkButton to="/admissions/tuition-and-financial-support/financial-assistance" variant="outline-green">
            Learn More
          </LinkButton>
        }
      >
        <p>
          Annually in January, the Branksome Hall Board of Governors sets tuition and fees for the following
          year. Monthly and early payment plans are available for families.
        </p>
        <p>Items such as uniforms, textbooks, lunches and activity fees are not included in tuition.</p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Financial assistance"
        title="Partnering with Families"
        image="/images/students-collaborating.jpg"
        imageAlt="Two students reviewing notes together."
        tone="sky"
        reverse
        actions={
          <LinkButton to="/admissions/tuition-and-financial-support/scholarships" variant="outline-green">
            View Scholarships
          </LinkButton>
        }
      >
        <p>
          Branksome Hall is pleased to offer financial support (bursaries) to students in the Senior & Middle
          School through our Financial Assistance Program. Our philosophy is to partner with as many families as
          possible as they look to finance a Branksome Hall education from Grades 7 to 12.
        </p>
        <p>Branksome also offers a variety of entrance merit scholarships for new day or Boarding students in Grades 7–11.</p>
      </ImageTextSplit>
    </>
  );
}
