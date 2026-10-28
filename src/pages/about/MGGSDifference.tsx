import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { IconFeatureGrid } from "@/components/sections/IconFeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { schoolValues, siteInfo } from "@/data/site";

export default function MGGSDifference() {
  return (
    <>
      <InteriorHero
        eyebrow="About MGGS"
        title="The MGGS Difference"
        description="Marvelous Greatness Schools combines academic seriousness with moral instruction and character formation — so that pupils leave us well prepared for further study, for work and for life."
        trail={[{ label: "The MGGS Difference" }]}
        tone="coral"
        image="/images/students-collaborating.jpg"
        actions={
          <>
            <LinkButton to="/admissions/how-to-apply" variant="outline-white">
              How to Apply
            </LinkButton>
          </>
        }
      />

      <IconFeatureGrid
        title="Our Difference: A Summary"
        features={[
          { icon: "📚", title: "Quality Education", description: "A well-planned curriculum taught with care and high expectations." },
          { icon: "🎯", title: "Excellent Performance", description: "Regular assessment and feedback that keep progress honest and visible." },
          { icon: "🧭", title: "Discipline", description: "An orderly, respectful school culture where learning can flourish." },
          { icon: "🤝", title: "Family Partnership", description: "Close communication between school and home at every stage." },
        ]}
      />

      <ImageTextSplit
        id="values"
        eyebrow={`Our motto: “${siteInfo.motto}”`}
        title="Educating the Whole Child"
        image="/images/campus-courtyard.jpg"
        imageAlt="A calm, leafy school courtyard with mature trees."
        actions={
          <LinkButton to="/about/our-values" variant="outline-green">
            Our Values
          </LinkButton>
        }
      >
        <p>
          We believe that academic development and personal growth belong together. Alongside strong literacy,
          numeracy and reasoning, our pupils are guided in honesty, respect, responsibility and self-control —
          qualities that shape the way a young person meets the world.
        </p>
        <p>
          Dedicated teachers, a supportive learning environment and families who work with us make that
          possible. It is why our pupils grow in confidence, curiosity and the willingness to keep learning
          throughout their lives.
        </p>
      </ImageTextSplit>

      <IconFeatureGrid
        id="values-grid"
        tone="green"
        eyebrow="What we stand for"
        title="Our Guiding Values"
        description="Discipline, dedication and excellent performance are not slogans at MGGS. They are the standard we hold ourselves to, day by day, on the way towards greatness."
        features={schoolValues}
      />

      <ImageTextSplit
        eyebrow="Beyond the classroom"
        title="Confidence Grows Where Pupils Take Part"
        image="/images/innovation-studio.jpg"
        imageAlt="Pupils working together in a bright, well-resourced classroom."
        reverse
        tone="gold"
        actions={
          <LinkButton to="/student-life" variant="outline-green">
            Explore Student Life
          </LinkButton>
        }
      >
        <p>
          Co-curricular activities, leadership responsibilities and service give every pupil a way to
          contribute and to be seen. That participation is where confidence, teamwork and initiative begin to
          grow.
        </p>
        <p>
          Our teachers notice effort as readily as attainment, so pupils learn that consistent dedication is
          itself an achievement.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="See MGGS for Yourself"
        description="Visit the school, meet our teachers and ask the questions that matter to your family. We will explain how admissions work and what happens next."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-white">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
