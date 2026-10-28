import { useExitPresence } from "@/hooks/useExitPresence";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/router/router";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const present = useExitPresence(open);
  const { navigate } = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    if (open) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && dialogRef.current) {
        const items = dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), input, a[href]');
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previousFocus?.focus();
    };
  }, [open, onClose]);

  if (!present) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    onClose();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div ref={dialogRef} className={`fixed inset-0 z-50 ${!open ? "motion-closing pointer-events-none" : ""}`} inert={!open} aria-hidden={!open} role="dialog" aria-modal={open ? "true" : undefined} aria-label="Search the site">
      <div className="motion-overlay absolute inset-0 bg-brand-green-900/70" onClick={onClose} aria-hidden="true" />
      <div className="motion-menu relative mx-auto mt-24 w-[92%] max-w-2xl rounded-xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-brand-green-900">Search Marvellous Greatness Group of Schools</h2>
          <button
            type="button"
            onClick={onClose}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-full text-brand-green-900 hover:bg-brand-green-100"
            aria-label="Close search"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <label htmlFor="site-search" className="sr-only">
            Search query
          </label>
          <input
            id="site-search"
            ref={inputRef}
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search news, admissions, academics…"
            className="focus-ring w-full rounded border border-brand-green-900/20 px-4 py-3 text-base"
          />
          <button
            type="submit"
            className="focus-ring shrink-0 rounded bg-brand-green-900 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white hover:bg-brand-green-700"
          >
            Search
          </button>
        </form>
        <p className="mt-3 text-xs text-ink/60">
          This searches the pages and notices published on this site. If you cannot find what you need, please
          contact the school office and we will help.
        </p>
      </div>
    </div>
  );
}
