import { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "@/router/router";
import { primaryNav, newsNavLink } from "@/data/navigation";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Primitives";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { cn } from "@/utils/cn";

export function Header() {
  const { path } = useRouter();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setOpenGroup(null);
    setMobileOpen(false);
  }, [path]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenGroup(null);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-white shadow-sm">
      <Container className="flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="focus-ring flex items-center gap-2.5" aria-label="Branksome Hall reconstruction — home">
          <span
            aria-hidden="true"
            className="font-display flex h-10 w-10 items-center justify-center rounded-full bg-brand-green-900 text-sm font-extrabold text-white"
          >
            BH
          </span>
          <span className="font-display leading-tight">
            <span className="block text-sm font-extrabold uppercase tracking-wide text-brand-green-900">
              Branksome Hall
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-coral">
              Design-study reconstruction
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((group) => {
            const isOpen = openGroup === group.label;
            return (
              <div key={group.label} className="relative">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  aria-controls={`menu-${group.label}`}
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className={cn(
                    "focus-ring flex items-center gap-1 rounded px-3 py-2 text-sm font-semibold text-brand-green-900 hover:text-brand-coral",
                    isOpen && "text-brand-coral",
                  )}
                >
                  {group.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 8"
                    className={cn("h-2.5 w-2.5 transition-transform", isOpen && "rotate-180")}
                  >
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <div
                    id={`menu-${group.label}`}
                    className="absolute left-0 top-full z-50 mt-1 w-72 rounded-lg border border-black/5 bg-white p-4 shadow-xl"
                  >
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-ink/50">
                      {group.description}
                    </p>
                    <ul className="space-y-0.5">
                      {group.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className="focus-ring block rounded px-2 py-2 text-sm font-medium text-brand-green-900 hover:bg-brand-green-100 hover:text-brand-coral"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
          <Link
            to={newsNavLink.to}
            className="focus-ring rounded px-3 py-2 text-sm font-semibold text-brand-green-900 hover:text-brand-coral"
          >
            {newsNavLink.label}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-brand-green-900 hover:bg-brand-green-100"
            aria-label="Open search"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </button>
          <Link
            to="/admissions/connect-with-admissions"
            className="focus-ring hidden text-sm font-semibold uppercase tracking-wide text-brand-green-900 hover:text-brand-coral md:block"
          >
            Request Info
          </Link>
          <LinkButton to="/admissions/how-to-apply" size="sm" className="hidden sm:inline-flex">
            Apply Now
          </LinkButton>
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="focus-ring flex h-11 items-center gap-1.5 rounded px-2 text-sm font-semibold uppercase text-brand-green-900 lg:hidden"
            aria-haspopup="true"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
            Menu
          </button>
        </div>
      </Container>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
