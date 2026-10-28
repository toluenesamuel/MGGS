import { InteriorHero } from "@/components/sections/InteriorHero";
import { ImageTextSplit } from "@/components/sections/ImageTextSplit";
import { CTABanner } from "@/components/sections/CTABanner";
import { Container } from "@/components/ui/Primitives";
import { LinkButton } from "@/components/ui/Button";
import { Link } from "@/router/router";
import { siteInfo } from "@/data/site";

export default function FeesAndFinancialInformation() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Fees & Financial Information"
        description="Clear information about school fees and payment, so that families can plan with confidence."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Fees & Financial Information" }]}
        tone="sky"
      />

      <section className="py-14 sm:py-16">
        <Container className="max-w-3xl">
          <p className="text-base leading-relaxed text-ink/80">
            We know that fees are one of the first questions families ask, and that a school should be
            straightforward about them. The current fee schedule is provided directly by the school office,
            along with the payment arrangements that apply to your child's class.
          </p>
          <div className="mt-6 rounded-lg border border-dashed border-brand-green-900/25 bg-brand-green-100/60 p-5">
            <p className="font-display text-sm font-bold uppercase tracking-wide text-brand-green-900">
              Fee schedule — awaiting confirmation
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink/70">
              The school will publish its fee schedule, payment terms and any additional costs (such as
              uniforms, books or activities) here. Until then, please contact the school office for current
              figures — telephone and email details are on our{" "}
              <Link to="/about/contact-us" className="font-bold text-brand-coral-ink hover:underline">
                contact page
              </Link>
              .
            </p>
          </div>
          <Link
            to="/admissions/connect-with-admissions"
            className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral-ink hover:underline"
          >
            Ask about fees →
          </Link>
        </Container>
      </section>

      <ImageTextSplit
        eyebrow="How fees are set"
        title="Fees and What They Cover"
        image="/images/campus-courtyard.jpg"
        imageAlt="A school courtyard with mature trees."
        actions={
          <LinkButton to="/admissions/connect-with-admissions" variant="outline-green">
            Speak to the Office
          </LinkButton>
        }
      >
        <p>
          School fees are reviewed by the school's leadership and confirmed for each session. The office will
          explain what is included in the fee for your child's class and what is charged separately, so that
          there are no surprises.
        </p>
        <p>
          We ask families to settle fees within the arrangements agreed with the office. If circumstances make
          that difficult, please speak with us early rather than late.
        </p>
      </ImageTextSplit>

      <ImageTextSplit
        eyebrow="Supporting families"
        title="Working Together Where There Is Need"
        image="/images/students-collaborating.jpg"
        imageAlt="Pupils reviewing notes together."
        tone="sky"
        reverse
        actions={
          <LinkButton to="/about/contact-us" variant="outline-green">
            Contact Us
          </LinkButton>
        }
      >
        <p>
          Families sometimes face unexpected difficulty. Where we can help, we would rather have an honest
          conversation than lose a child's place in school. Any support available is agreed privately between
          the family and the school.
        </p>
        <p>
          The school will publish details of any scholarship or support arrangements once they are confirmed —
          no eligibility criteria are stated here in the meantime.
        </p>
      </ImageTextSplit>

      <CTABanner
        tone="coral"
        title="Need the current fee schedule?"
        description={`Call or visit the school office in ${siteInfo.location.area}, ${siteInfo.location.city} — we will send you the confirmed figures for your child's class.`}
        actions={
          <LinkButton to="/admissions/connect-with-admissions" variant="outline-white">
            Contact Admissions
          </LinkButton>
        }
      />
    </>
  );
}
