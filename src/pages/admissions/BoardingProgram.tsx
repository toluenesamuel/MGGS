import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { StatGrid } from "@/components/sections/StatGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { bySheNumbers } from "@/data/site";

export default function BoardingProgram() {
  const boardingStats = bySheNumbers.filter((s) =>
    ["910", "13"].includes(s.value) || s.label.includes("Boarding"),
  );

  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Boarding Program"
        description="Boarding at Branksome Hall welcomes students from Canada and around the world into a close-knit residential community."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Boarding Program" }]}
        tone="green"
        image="/images/student-life-sports.jpg"
      />

      <ImageTextSplit
        eyebrow="Boarding life"
        title="Discover Who They Are"
        image="/images/students-collaborating.jpg"
        imageAlt="Students relaxing together in a residence common room."
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-green">Apply to Boarding</LinkButton>}
      >
        <p>
          Branksome welcomes more than 40 Boarding students from around the world, where they discover who they
          are, develop their interests and passions and build lifelong friendships. Boarding staff work with
          other school departments and outside providers to develop, organize and chaperone activities both on
          and off campus after school and on weekends.
        </p>
      </ImageTextSplit>

      <StatGrid title="Our Boarding Community" stats={boardingStats.length ? boardingStats : bySheNumbers.slice(0, 4)} tone="green" />

      <CTABanner
        tone="coral"
        title="Have questions about Boarding?"
        description="Our Admissions team can walk you through applications, housing and the Toronto advantage of boarding in a world-class city."
        actions={<LinkButton to="/admissions/connect-with-admissions" variant="outline-white">Connect with Admissions</LinkButton>}
      />
    </>
  );
}
