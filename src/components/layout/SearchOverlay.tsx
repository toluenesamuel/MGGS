import { useEffect, useRef, useState } from "react";
import { useRouter } from "@/router/router";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { navigate } = useRouter();
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      inputRef.current?.focus();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = value.trim();
    onClose();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
  }

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Search the site">
      <div className="absolute inset-0 bg-brand-green-900/70" onClick={onClose} aria-hidden="true" />
      <div className="relative mx-auto mt-24 w-[92%] max-w-2xl rounded-xl bg-white p-6 shadow-2xl sm:p-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-brand-green-900">Search Branksome Hall (reconstruction)</h2>
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
            placeholder="Search news, programs, admissions…"
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
          This searches the content modelled in this reconstruction (news, programs, admissions pages) client-side —
          it is not connected to Branksome Hall's real backend search service.
        </p>
      </div>
    </div>
  );
}
