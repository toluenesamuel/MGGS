import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { InquiryForm } from "@/components/forms/InquiryForm";

export default function VisitUs() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Visit Us"
        description="Tour our 13-acre Rosedale campus and see Branksome Hall for yourself at an Open House or private visit."
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Visit Us" }]}
        tone="gold"
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-green-900">Ways to Visit</h2>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
              <li>
                <strong className="text-brand-green-900">Open Houses</strong> — seasonal Junior, Middle and Senior
                School Open Houses with tours, info sessions and Q&amp;A with faculty.
              </li>
              <li>
                <strong className="text-brand-green-900">Private Tours</strong> — scheduled individually for
                prospective families through Admissions.
              </li>
              <li>
                <strong className="text-brand-green-900">Virtual Tours</strong> — explore the campus online before
                visiting in person.
              </li>
            </ul>
          </div>
          <InquiryForm
            heading="Request a Visit"
            description="Tell us a little about your family and we'll follow up with available visit dates."
            submitLabel="Request a Visit"
            extraFields={[{ id: "preferredDate", label: "Preferred visit timeframe", type: "textarea-optional" }]}
          />
        </Container>
      </section>
    </>
  );
}
