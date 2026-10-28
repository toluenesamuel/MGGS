import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { Link } from "@/router/router";
import { InquiryForm } from "@/components/forms/InquiryForm";
import { siteInfo } from "@/data/site";

export default function ContactUs() {
  const { address, contact, location } = siteInfo;
  return (
    <>
      <InteriorHero
        eyebrow="About MGGS"
        title="Contact Us"
        description={`Marvellous Greatness Group of Schools, ${location.area}, ${location.city}, ${location.state}. We are always glad to hear from families.`}
        trail={[{ label: "About", to: "/about/the-mggs-difference" }, { label: "Contact Us" }]}
        tone="sky"
        image="/images/campus-courtyard.jpg"
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-green-900">Where to Find Us</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
              The school is located in {address.line1}, {address.line2}, {address.country}. Our office will be
              happy to share directions and arrange a convenient time for you to visit.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
              <span className="font-semibold text-brand-green-900">Street address:</span>{" "}
              <span className="rounded bg-brand-green-100/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green-900">
                To be confirmed
              </span>
            </p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Akobo+Ojurin+Ibadan+Oyo+State+Nigeria"
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral-ink hover:underline"
            >
              View the area on the map →
            </a>

            <div className="mt-10 overflow-hidden rounded-lg border border-black/10">
              <img
                src="/images/hero-campus.jpg"
                alt="Exterior of a school building with trees and open grounds."
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">School Office</h3>
              <p className="mt-2 text-sm text-ink/70">
                Telephone: {" "}
                <span className="rounded bg-brand-green-100/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green-900">
                  {contact.phonePlaceholder}
                </span>
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Email: {" "}
                <span className="rounded bg-brand-green-100/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green-900">
                  {contact.emailPlaceholder}
                </span>
              </p>
              <p className="mt-2 text-sm text-ink/70">
                Office hours: {" "}
                <span className="rounded bg-brand-green-100/70 px-1.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-brand-green-900">
                  {contact.hoursPlaceholder}
                </span>
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">Admissions Enquiries</h3>
              <p className="mt-2 text-sm text-ink/70">
                Questions about joining the school?{" "}
                <Link to="/admissions/connect-with-admissions" className="font-bold text-brand-coral-ink hover:underline">
                  Connect with Admissions
                </Link>{" "}
                or{" "}
                <Link to="/admissions/visit-us" className="font-bold text-brand-coral-ink hover:underline">
                  arrange a visit
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">Careers</h3>
              <p className="mt-2 text-sm text-ink/70">
                Teachers and school professionals who share our values are always welcome to introduce
                themselves. See{" "}
                <Link to="/about/career-opportunities" className="font-bold text-brand-coral-ink hover:underline">
                  Career Opportunities
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-brand-green-900/10 bg-paper py-14 sm:py-16">
        <Container className="max-w-2xl">
          <InquiryForm
            heading="Send us a message"
            description="Tell us how we can help. This form is a demonstration and does not send your information."
                submitLabel="Send Message"
          />
        </Container>
      </section>
    </>
  );
}
