import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { Link } from "@/router/router";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteInfo } from "@/data/site";

export default function VisitUs() {
  return (
    <>
      <InteriorHero
        eyebrow="Admissions"
        title="Visit Us"
        description={`Come and see Marvelous Greatness Schools for yourself. We welcome prospective families to ${siteInfo.location.area}, ${siteInfo.location.city}.`}
        trail={[{ label: "Admissions", to: "/admissions/start-here" }, { label: "Visit Us" }]}
        tone="gold"
        image="/images/campus-courtyard.jpg"
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-green-900">Ways to Visit</h2>
            <ul className="mt-4 space-y-4 text-sm leading-relaxed text-ink/75 sm:text-base">
              <li>
                <strong className="text-brand-green-900">A school tour</strong> — arranged with the school office
                at a time that suits your family. Walk the classrooms, meet teachers and see a normal school day.
              </li>
              <li>
                <strong className="text-brand-green-900">Open days</strong> — when the school holds an open day,
                the details are announced on our{" "}
                <Link to="/mggs-news" className="font-bold text-brand-coral-ink hover:underline">
                  news page
                </Link>
                .
              </li>
              <li>
                <strong className="text-brand-green-900">A conversation with us</strong> — bring your questions
                about teaching, discipline, activities and fees. We would rather answer them in person.
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-ink/70">
              Prefer to write first? Send us a message using the form, or use our{" "}
              <Link to="/admissions/connect-with-admissions" className="font-bold text-brand-coral-ink hover:underline">
                admissions enquiry form
              </Link>
              .
            </p>
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
