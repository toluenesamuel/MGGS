import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { siteInfo } from "@/data/site";

export default function OurStory() {
  return (
    <>
      <InteriorHero
        eyebrow="About MGGS"
        title="Our Story"
        description={`Marvelous Greatness Schools serves families in ${siteInfo.location.area}, ${siteInfo.location.city}, with one consistent purpose: to help every pupil move towards greatness.`}
        trail={[{ label: "About", to: "/about/the-mggs-difference" }, { label: "Our Story" }]}
        tone="green"
        image="/images/hero-campus.jpg"
      />

      <ImageTextSplit
        eyebrow="Why the school exists"
        title="A School Built Around the Child"
        image="/images/campus-courtyard.jpg"
        imageAlt="A heritage school building framed by mature trees."
      >
        <p>
          MGGS was founded on a straightforward conviction: that a good school develops the mind and the
          character together. Academic work, moral instruction and personal growth are treated as one
          responsibility rather than separate ones.
        </p>
        <p>
          That conviction shapes daily life here — in the standard of work we expect, the courtesy we practise
          and the encouragement we give a pupil who is finding something difficult.
        </p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Rooted in Ibadan"
        title="A Community School in Akobo–Ojurin"
        image="/images/hero-campus.jpg"
        imageAlt="A quiet school building with trees and open grounds."
        tone="sky"
        reverse
        actions={
          <LinkButton to="/campus/our-campus" variant="outline-green">
            Our Campus
          </LinkButton>
        }
      >
        <p>
          The school is part of the Akobo–Ojurin community in Ibadan, Oyo State. Families who choose MGGS join
          a school community that values respect, diligence and a genuine partnership between home and
          classroom.
        </p>
        <p>
          A fuller account of the school's history will be published here once it has been compiled from the
          school's own records.
        </p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Looking ahead"
        title="Steady Steps Towards Greatness"
        image="/images/student-life-sports.jpg"
        imageAlt="Pupils taking part in a group activity outdoors."
        tone="gold"
        actions={
          <LinkButton to="/student-life" variant="outline-green">
            Student Life
          </LinkButton>
        }
      >
        <p>
          Our motto is a direction rather than a destination. Each session we aim to teach a little better,
          support families a little more closely and give pupils a little more confidence than the year before.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="Meet Marvelous Greatness Schools"
        description="Visit us to see the school at work and to talk with the people who will teach your child."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-white">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
