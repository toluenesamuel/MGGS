import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";

export default function OurHistory() {
  return (
    <>
      <InteriorHero
        eyebrow="About Branksome"
        title="Our History"
        description="Celebrating Branksome Hall's legacy of success since 1903."
        trail={[{ label: "About", to: "/about/the-branksome-difference" }, { label: "Our History" }]}
        tone="green"
      />

      <ImageTextSplit
        eyebrow="Branksome's founding"
        title="A School Founded on Ambition"
        image="/images/campus-courtyard.jpg"
        imageAlt="A heritage school building with mature trees."
      >
        <p>
          The school was founded by Miss Margaret Scott, who served as the first Principal from 1903 to 1910.
          Branksome Hall was originally located in a rental property at 102 Bloor Street East, with an enrolment
          of 70 girls. Seven years later, that property was purchased by the province and Branksome relocated to
          592 Sherbourne Street. Miss Edith Read was appointed Principal in 1910.
        </p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Through the years"
        title="A Growing Campus and Community"
        image="/images/hero-campus.jpg"
        imageAlt="A historic collegiate-gothic school building."
        tone="sky"
        reverse
        actions={
          <>
            <LinkButton to="/the-campus/virtual-tours" variant="outline-green">
              Virtual Tours
            </LinkButton>
            <LinkButton to="/admissions/boarding-program/our-toronto-advantage" variant="outline-green">
              Our Toronto Advantage
            </LinkButton>
          </>
        }
      >
        <p>
          In 1912, the school purchased Hollydene, the elegant property at 10 Elm Avenue. Between 1912 and 1948,
          Principal Read added five homes to the campus and built a gymnasium and pool. She also introduced the
          Prefect and Clan systems and adopted the Hunting Stewart tartan for the school uniform.
        </p>
        <p>
          Over the years, both the campus and student enrolment have expanded. Branksome's campus now includes
          more than a dozen buildings, ranging from heritage mansions to modern structures, all linked by
          state-of-the-art technology.
        </p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Sherborne Girls' School partnership"
        title="An Exchange That Continues Today"
        image="/images/student-life-sports.jpg"
        imageAlt="A group of students in athletic uniforms."
        tone="gold"
        actions={
          <LinkButton to="/learning/student-life" variant="outline-green">
            Student Life
          </LinkButton>
        }
      >
        <p>
          In 1940, a small group of girls and staff from Sherborne Girls' School in England was evacuated to
          Branksome Hall. This relationship continues, with students from both schools participating in an annual
          exchange.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="Experience Branksome"
        description="Learn why our school stands apart with global programs, a focus on leadership and a legacy of excellence."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-white">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
