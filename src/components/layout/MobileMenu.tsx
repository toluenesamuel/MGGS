import { useExitPresence } from "@/hooks/useExitPresence";
import { useEffect, useRef, useState } from "react";
import { Link } from "@/router/router";
import { primaryNav, newsNavLink, type NavGroup } from "@/data/navigation";
import { Container } from "@/components/ui/Primitives";
import { HeaderBrand } from "@/components/layout/HeaderBrand";
import { cn } from "@/utils/cn";

const quickLinks: NavGroup = { label: "Quick Links", to: "/branksome-news", links: [
  { label: "Branksome News", to: newsNavLink.to },
  { label: "Contact Us", to: "/about/contact-us" },
  { label: "Visit Us", to: "/admissions/visit-us" },
  { label: "How to Apply", to: "/admissions/how-to-apply" },
] };
const order = ["About", "Admissions", "Learning", "Innovation", "Community", "The Campus", "Giving"];
const groups = [quickLinks, ...order.flatMap(label => primaryNav.filter(group => group.label === label))];

export function MobileMenu({ open, onClose, onSearch }: { open: boolean; onClose: () => void; onSearch: () => void }) {
  const present = useExitPresence(open);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { setOpenGroup(null); return; }
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(el => el.getClientRects().length > 0);
      const first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); previousFocus?.focus(); };
  }, [open, onClose]);

  if (!present) return null;
  return <div id="site-menu" ref={panelRef} role="dialog" aria-modal={open ? "true" : undefined} aria-label="Site menu" aria-hidden={!open} inert={!open} className={cn("site-menu fixed inset-0 z-50 flex flex-col", !open && "is-closing pointer-events-none")}>
    <div className="relative z-10 shrink-0 bg-white">
      <Container className="flex h-18 items-center justify-between gap-3 py-3 lg:h-24">
        <HeaderBrand onClick={onClose} />
        <div className="flex shrink-0 items-center gap-2 sm:gap-4 lg:gap-7">
          <button type="button" onClick={onSearch} className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-brand-green-900 hover:bg-brand-green-100" aria-label="Open search"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5" strokeLinecap="round"/></svg></button>
          <Link to="/admissions/connect-with-admissions" onClick={onClose} className="focus-ring hidden text-sm font-bold uppercase tracking-wide text-brand-green-900 hover:underline md:block">Request Info</Link>
          <Link to="/admissions/how-to-apply" onClick={onClose} className="focus-ring hidden min-h-11 items-center bg-brand-green-900 px-4 py-2 text-sm font-bold uppercase text-white hover:bg-brand-green-700 sm:inline-flex">Apply Now</Link>
          <button ref={closeButtonRef} type="button" onClick={onClose} className="focus-ring flex h-11 items-center gap-2 px-2 text-sm font-bold uppercase text-ink" aria-label="Close menu"><svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l14 14M19 5 5 19" strokeLinecap="round"/></svg><span className="hidden min-[400px]:inline">Menu</span></button>
        </div>
      </Container>
    </div>
    <div className="site-menu-body relative flex-1 overflow-y-auto bg-brand-green-900 text-white">
      <div className="site-menu-image pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden md:block" aria-hidden="true"><img src="/images/menu-community-cropped.png" alt="" className="h-full w-full object-contain object-right-bottom"/><div className="absolute inset-0 bg-gradient-to-r from-brand-green-900 via-transparent to-transparent" /></div>
      <Container className="relative min-h-full py-7 sm:py-9">
        <nav aria-label="Main navigation" className="relative md:flex md:gap-12">
          <ul className="site-menu-list relative z-10 w-full max-w-sm shrink-0">
            {groups.map((group, index) => {
              const active = openGroup === group.label;
              return <li key={group.label} className="site-menu-item" style={{ "--item-index": index } as React.CSSProperties}>
                <button type="button" aria-expanded={active} onClick={() => setOpenGroup(active ? null : group.label)} className="site-menu-link focus-ring flex w-full items-center justify-between gap-5 py-1 text-left uppercase">
                  <span>{group.label}</span><span className={cn("site-menu-arrow", active && "is-active")} aria-hidden="true">→</span>
                </button>
                <div id={`site-menu-group-${index}`} className="md:hidden" hidden={!active}>
                  <ul className="space-y-2 pb-5 pt-2">{group.links.map(link => <li key={link.to}><Link to={link.to} onClick={onClose} className="focus-ring inline-block py-1 text-base font-semibold text-white/90 hover:text-brand-gold">{link.label}</Link></li>)}</ul>
                </div>
              </li>;
            })}
          </ul>
          {openGroup && <div key={openGroup} className="site-menu-submenu relative z-10 hidden max-w-sm self-start border-l border-white/25 bg-brand-green-900/95 px-8 py-3 md:block">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-gold">Explore {openGroup}</p>
            <ul className="mt-5 space-y-3">{groups.find(group => group.label === openGroup)?.links.map(link => <li key={link.to}><Link to={link.to} onClick={onClose} className="focus-ring inline-block py-1 text-lg font-semibold leading-snug text-white hover:text-brand-gold">{link.label}</Link></li>)}</ul>
          </div>}
        </nav>
      </Container>
    </div>
  </div>;
}
