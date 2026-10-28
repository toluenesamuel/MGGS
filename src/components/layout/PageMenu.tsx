import { useState } from "react";
import { cn } from "@/utils/cn";

export interface PageMenuItem {
  id: string;
  label: string;
}

export function PageMenu({ items }: { items: PageMenuItem[] }) {
  const [open, setOpen] = useState(false);

  function handleJump(id: string) {
    setOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="border-b border-brand-green-900/10 bg-white">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="page-menu-panel"
          onClick={() => setOpen((v) => !v)}
          className="focus-ring flex items-center gap-2 py-3 text-xs font-bold uppercase tracking-wide text-brand-green-900"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
          </svg>
          Page Menu
          <svg
            aria-hidden="true"
            viewBox="0 0 12 8"
            className={cn("h-2.5 w-2.5 transition-transform", open && "rotate-180")}
          >
            <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {open && (
          <ul id="page-menu-panel" className="flex flex-wrap gap-2 pb-4">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleJump(item.id)}
                  className="focus-ring rounded-full border border-brand-green-900/20 px-3 py-1.5 text-xs font-semibold text-brand-green-900 hover:bg-brand-green-100"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
