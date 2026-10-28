import { InteriorHero } from "@/components/sections/InteriorHero";
import { Container } from "@/components/ui/Primitives";
import { Link } from "@/router/router";
import { siteInfo } from "@/data/site";

export default function ContactUs() {
  return (
    <>
      <InteriorHero
        eyebrow="About Branksome"
        title="Contact Us"
        description="Toronto's leading IB World School — here's how to reach us."
        trail={[{ label: "About", to: "/about/the-branksome-difference" }, { label: "Contact Us" }]}
        tone="sky"
      />

      <section className="py-14 sm:py-20">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-xl font-bold text-brand-green-900">Directions</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
              Branksome Hall is located at {siteInfo.address.street} in {siteInfo.address.neighbourhood}, one of
              downtown Toronto's most historic residential neighbourhoods.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink/75 sm:text-base">
              The closest subway stations are Bloor-Yonge Station and Sherbourne Station.
            </p>
            <a
              href="https://www.google.com/maps/place/10+Elm+Ave,+Toronto,+ON+M4W+1N4,+Canada"
              target="_blank"
              rel="noreferrer"
              className="focus-ring mt-4 inline-flex items-center gap-1 text-sm font-bold text-brand-coral-ink hover:underline"
            >
              Get Directions →
            </a>

            <div className="mt-10 overflow-hidden rounded-lg border border-black/10">
              <img
                src="/images/hero-campus.jpg"
                alt="Exterior of a historic collegiate school building representative of the campus."
                className="h-56 w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">General Inquiries</h3>
              <p className="mt-2 text-sm text-ink/70">
                Current Branksome Hall families can find school information on the Branksome Portal.
              </p>
              <a
                href="https://branksome.myschoolapp.com/app/#login"
                target="_blank"
                rel="noreferrer"
                className="focus-ring mt-2 inline-flex items-center gap-1 text-sm font-bold text-brand-coral-ink hover:underline"
              >
                Log in to the Portal →
              </a>
            </div>
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">Security</h3>
              <p className="mt-2 text-sm text-ink/70">
                To contact Security, please call{" "}
                <a href={`tel:${siteInfo.phoneSecurity}`} className="font-bold text-brand-coral-ink hover:underline">
                  {siteInfo.phoneSecurity}
                </a>
                .
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">Careers</h3>
              <p className="mt-2 text-sm text-ink/70">
                To join our employee community of global thinkers and innovators, please visit{" "}
                <Link to="/about/career-opportunities" className="font-bold text-brand-coral-ink hover:underline">
                  Career Opportunities
                </Link>
                .
              </p>
            </div>
            <div className="rounded-lg border border-black/5 bg-white p-6 shadow-sm">
              <h3 className="font-display text-lg font-bold text-brand-green-900">Location Rentals</h3>
              <p className="mt-2 text-sm text-ink/70">
                To inquire about fees and availability, please visit the{" "}
                <Link to="/the-campus/venue-rentals" className="font-bold text-brand-coral-ink hover:underline">
                  Venues page
                </Link>
                .
              </p>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
