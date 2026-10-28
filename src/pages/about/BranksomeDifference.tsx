import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { IconFeatureGrid } from "@/components/sections/IconFeatureGrid";
import { StatGrid } from "@/components/sections/StatGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";
import { admissionsStats } from "@/data/site";

export default function BranksomeDifference() {
  return (
    <>
      <InteriorHero
        eyebrow="About Branksome"
        title="The Branksome Difference"
        description="Branksome Hall stands out for its innovative approach to education, empowering girls with global perspectives, high academic standards, leadership opportunities and a focus on inclusion."
        trail={[{ label: "The Branksome Difference" }]}
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
          { icon: "🌍", title: "IB Curriculum", description: "Globally focused learning from JK to Grade 12." },
          { icon: "🧭", title: "Leaders and Innovators", description: "Cutting-edge facilities and faculty who lead by example." },
          { icon: "🤝", title: "Inspiring Campus", description: "13 acres in the heart of Toronto, built for discovery." },
          { icon: "💡", title: "Inclusive Community", description: "A diverse, international community rooted in belonging." },
        ]}
      />

      <ImageTextSplit
        id="history"
        eyebrow="Inspiring excellence since 1903"
        title="Empowering Girls to Lead, Innovate and Thrive"
        image="/images/campus-courtyard.jpg"
        imageAlt="A leafy private school courtyard with heritage and modern buildings."
        actions={
          <LinkButton to="/about/our-history" variant="outline-green">
            Our History
          </LinkButton>
        }
      >
        <p>
          With a globally focused IB curriculum, world-class faculty and cutting-edge facilities, Branksome Hall
          fosters intellectual curiosity and innovative thinking. Our diverse, international community and
          commitment to social-emotional learning ensure that every student feels supported, empowered and ready
          to make her mark on the world.
        </p>
        <p>
          For more than a century, Branksome Hall has shaped leaders through its commitment to academic
          excellence, innovation and character development.
        </p>
      </ImageTextSplit>

      <IconFeatureGrid
        id="ib-curriculum"
        tone="green"
        eyebrow="World-class IB curriculum"
        title="Our World-Class IB Curriculum"
        description="With a focus on academic excellence, personal growth and inquiry-based learning, Branksome prepares students for success in higher education and beyond."
        features={[
          { icon: "🙋", title: "Creativity, Activity & Service", description: "Experiential learning opportunities outside the classroom for Grades 7–12." },
          { icon: "🔍", title: "Inquiry-Based Learning", description: "Students ask questions, explore deeply and think critically." },
          { icon: "🌐", title: "International Perspectives", description: "Global awareness, critical thinking and cultural understanding." },
          { icon: "🎓", title: "IB Select Option", description: "Personalized course selection for Grades 11 and 12." },
        ]}
      />

      <StatGrid title="Heading to University" stats={admissionsStats} />

      <ImageTextSplit
        eyebrow="Innovation and leadership"
        title="Innovation at the Heart of Everything We Do"
        image="/images/innovation-studio.jpg"
        imageAlt="Students working in a bright innovation studio with laptops and prototyping tools."
        reverse
        tone="gold"
        actions={
          <LinkButton to="/innovation/icast" variant="outline-green">
            Learn More About Innovation
          </LinkButton>
        }
      >
        <p>
          Our students are encouraged to bring their ideas to life, solve complex problems and take risks. Our
          educators lead with data-driven research, supporting student entrepreneurship through Noodle, our
          groundbreaking accelerator program.
        </p>
        <p>
          The entire community collaborates to advance girls' education with initiatives such as the new Karen L.
          Jurjevich Innovation Centre and Studio Theatre (iCAST).
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="Start Your Journey"
        description="From important dates, entry grades and details on the application process by grade, find everything you need to get ready to apply to Branksome Hall."
        actions={
          <LinkButton to="/admissions/how-to-apply" variant="outline-white">
            How to Apply
          </LinkButton>
        }
      />
    </>
  );
}
