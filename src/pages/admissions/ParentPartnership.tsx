import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { IconFeatureGrid } from "@/components/sections/IconFeatureGrid";
import { CTABanner } from "@/components/sections/CTABanner";
import { LinkButton } from "@/components/ui/Button";

export default function ParentPartnership() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Parent Partnership"
        description="Children do best when home and school pull in the same direction. At MGGS, families are part of the team from the first day."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Parent Partnership" }]}
        tone="green"
        image="/images/student-life-sports.jpg"
      />

      <ImageTextSplit
        eyebrow="Working together"
        title="A Shared Standard for Every Child"
        image="/images/students-collaborating.jpg"
        imageAlt="Pupils and a teacher working together at a table."
        actions={<LinkButton to="/admissions/how-to-apply" variant="outline-green">How to Apply</LinkButton>}
      >
        <p>
          We ask families to support the habits that make school work: regular attendance, punctuality,
          completing homework, reading at home and treating teachers and classmates with respect. In return,
          we keep you informed about how your child is doing and talk with you early if something needs
          attention.
        </p>
        <p>
          Discipline at MGGS is consistent and corrective rather than punitive. When a pupil makes a mistake,
          we say so clearly, agree what changes and move on — and we tell you what happened.
        </p>
      </ImageTextSplit>

      <IconFeatureGrid
        tone="green"
        eyebrow="What you can expect"
        title="Our Commitment to Families"
        features={[
          { icon: "📬", title: "Clear Communication", description: "Updates on progress, conduct and school events through the channels the school confirms." },
          { icon: "🤝", title: "Accessible Teachers", description: "Opportunities to speak with the people who teach your child." },
          { icon: "🧭", title: "Consistent Standards", description: "The same expectations applied fairly to every pupil, every day." },
          { icon: "🌟", title: "Encouragement", description: "Recognition of effort and good conduct, not only of high marks." },
        ]}
      />

      <ImageTextSplit
        eyebrow="Getting involved"
        title="There Are Many Ways to Help"
        image="/images/giving-community.jpg"
        imageAlt="A group of people working together in a bright room."
        reverse
        tone="gold"
        actions={<LinkButton to="/community/parents-and-families" variant="outline-green">Parents &amp; Families</LinkButton>}
      >
        <p>
          Some families help with reading, some support school events, others share professional experience
          with our pupils. Whatever time you can offer, it strengthens the school.
        </p>
        <p>
          Speak with the school office about how you would like to be involved — and about anything that is
          making school life harder for your child.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="Have a question about partnership or pastoral care?"
        description="Our school office can explain how we keep in touch with families and how concerns are handled."
        actions={<LinkButton to="/admissions/connect-with-admissions" variant="outline-white">Connect with Admissions</LinkButton>}
      />
    </>
  );
}
