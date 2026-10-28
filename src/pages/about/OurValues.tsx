import { InteriorHero } from "@/components/sections/InteriorHero";
import { IconFeatureGrid } from "@/components/sections/IconFeatureGrid";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { schoolValues, siteInfo } from "@/data/site";

export default function OurValues() {
  return (
    <>
      <InteriorHero
        eyebrow="About MGGS"
        title="Our Values"
        description={`Discipline, dedication and excellent performance sit behind our motto, “${siteInfo.motto}”, and behind everything we ask of our pupils.`}
        trail={[{ label: "About", to: "/about/the-mggs-difference" }, { label: "Our Values" }]}
        tone="gold"
      />

      <IconFeatureGrid
        title="What We Stand For"
        description="Three values guide the way we teach, the way we correct and encourage, and the way we work with families."
        features={schoolValues}
      />

      <ImageTextSplit
        eyebrow="Motto"
        title="Towards Greatness, Every Day"
        image="/images/campus-courtyard.jpg"
        imageAlt="A quiet, well-kept school courtyard."
        tone="sky"
        actions={
          <LinkButton to="/academics/character-and-moral-instruction" variant="outline-green">
            Moral Instruction
          </LinkButton>
        }
      >
        <p>
          Greatness is rarely a single moment. It is built from small, repeated choices: arriving on time,
          finishing the work, telling the truth, listening to a classmate and trying again after a setback.
        </p>
        <p>
          We teach those choices explicitly and we model them consistently, so that our pupils leave with
          habits of character they can rely on wherever they go next.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="green"
        title="Values Are Caught as Well as Taught"
        description="Teachers, pupils and families share the work. If our values sound like the kind of school you want for your child, we would love to meet you."
        actions={
          <LinkButton to="/admissions/visit-us" variant="outline-white">
            Visit Us
          </LinkButton>
        }
      />
    </>
  );
}
