import type { ReactElement } from "react";
import { Link } from "@/router/router";
import { footerColumns } from "@/data/navigation";
import { siteInfo } from "@/data/site";
import { Container } from "@/components/ui/Primitives";

const socialIcons: Record<string, ReactElement> = {
  Instagram: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M3 3l7.5 9.5L3.4 21h2.3l6-6.9 4.7 6.9H21l-7.8-9.9L20.3 3h-2.3l-5.6 6.4L7.3 3H3z" />
    </svg>
  ),
  Facebook: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.9.3-1.5 1.6-1.5h1.6V4.2C16.4 4.1 15.3 4 14.1 4c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.3v3h2.6V21h3.6z" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM3.5 9.5h3v11h-3v-11zM9.5 9.5h2.9v1.5h.04c.4-.76 1.4-1.56 2.9-1.56 3.1 0 3.66 2 3.66 4.6v6.46h-3v-5.73c0-1.37-.03-3.14-1.92-3.14-1.92 0-2.22 1.5-2.22 3.04v5.83h-3v-11z" />
    </svg>
  ),
};

export function Footer() {
  return (
    <footer className="bg-brand-green-900 text-white">
      <Container className="py-14">
        <div className="grid gap-10 border-b border-white/15 pb-10 lg:grid-cols-[1.2fr_2.8fr]">
          <div>
            <Link to="/" className="focus-ring inline-flex items-center gap-2.5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white p-0.5">
                <img src="/images/mggs-logo.png" alt="" width={40} height={40} className="h-full w-full rounded-full" />
              </span>
              <span className="font-display text-sm font-extrabold uppercase tracking-wide">
                {siteInfo.name}
              </span>
            </Link>
            <address className="mt-4 text-sm not-italic leading-relaxed text-white/75">
              {siteInfo.address.line1}
              <br />
              {siteInfo.address.line2}
              <br />
              {siteInfo.address.country}
            </address>
            <p className="mt-2 max-w-xs text-xs leading-relaxed text-white/55">
              Street address, telephone and email to be confirmed by the school office.
            </p>
            <p className="mt-4 text-sm text-white/75">
              <Link to="/about/contact-us" className="focus-ring underline decoration-white/40 underline-offset-4 hover:decoration-white">
                School Contacts
              </Link>
            </p>
            <p className="mt-6 max-w-xs text-xs leading-relaxed text-white/60">
              “{siteInfo.motto}” — our motto is a daily commitment for our pupils, our teachers and our
              families.
            </p>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.label}>
                <h3 className="font-display text-xs font-bold uppercase tracking-wide text-brand-gold">
                  {col.label}
                </h3>
                <ul className="mt-3 space-y-2">
                  {col.links.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className="focus-ring text-sm text-white/80 hover:text-white hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            {siteInfo.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white/80 hover:border-white hover:text-white"
              >
                {socialIcons[s.label]}
              </a>
            ))}
          </div>
          <p className="text-xs text-white/60">
            © {new Date().getFullYear()} {siteInfo.name} ({siteInfo.shortName}), {siteInfo.location.area},{" "}
            {siteInfo.location.city}, {siteInfo.location.state}. All rights reserved.{" "}
            <Link to="/about/contact-us" className="underline hover:text-white">
              Contact &amp; accessibility
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
