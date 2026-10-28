import { useEffect, useRef, useState } from "react";
import { Link } from "@/router/router";
import { primaryNav, newsNavLink } from "@/data/navigation";
import { cn } from "@/utils/cn";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Site menu">
      <div className="absolute inset-0 bg-brand-green-900/50" onClick={onClose} aria-hidden="true" />
      <div
        id="mobile-menu"
        ref={panelRef}
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col overflow-y-auto bg-white p-5 shadow-2xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-sm font-extrabold uppercase tracking-wide text-brand-green-900">
            Menu
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="focus-ring flex h-11 w-11 items-center justify-center rounded-full text-brand-green-900 hover:bg-brand-green-100"
            aria-label="Close menu"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <ul className="space-y-1">
          {primaryNav.map((group) => {
            const isOpen = openGroup === group.label;
            return (
              <li key={group.label} className="border-b border-brand-green-900/10">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenGroup(isOpen ? null : group.label)}
                  className="focus-ring flex w-full items-center justify-between py-3.5 text-left font-display text-base font-bold text-brand-green-900"
                >
                  {group.label}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 12 8"
                    className={cn("h-3 w-3 transition-transform", isOpen && "rotate-180")}
                  >
                    <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
                {isOpen && (
                  <ul className="space-y-0.5 pb-3 pl-2">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link
                          to={link.to}
                          onClick={onClose}
                          className="focus-ring block rounded px-2 py-2.5 text-sm font-medium text-ink/80 hover:text-brand-coral"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
          <li className="border-b border-brand-green-900/10">
            <Link
              to={newsNavLink.to}
              onClick={onClose}
              className="focus-ring block py-3.5 font-display text-base font-bold text-brand-green-900"
            >
              {newsNavLink.label}
            </Link>
          </li>
        </ul>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/admissions/connect-with-admissions"
            onClick={onClose}
            className="focus-ring rounded border-2 border-brand-green-900 px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-brand-green-900"
          >
            Request Info
          </Link>
          <Link
            to="/admissions/how-to-apply"
            onClick={onClose}
            className="focus-ring rounded bg-brand-coral px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
