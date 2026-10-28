import { useId, useState } from "react";
import { cn } from "@/utils/cn";

export interface AccordionItemData {
  title: string;
  detail: string;
}

export function Accordion({
  items,
  className,
  itemClassName,
  dark = false,
}: {
  items: AccordionItemData[];
  className?: string;
  itemClassName?: string;
  dark?: boolean;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul
      className={cn(
        dark ? "divide-y divide-white/15 border-y border-white/15" : "divide-y divide-brand-green-900/10 border-y border-brand-green-900/10",
        className,
      )}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <li key={item.title} className={itemClassName}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "focus-ring flex w-full items-center justify-between gap-4 py-4 text-left font-display text-base font-bold sm:text-lg",
                  dark ? "text-white" : "text-brand-green-900",
                )}
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-lg transition-transform",
                    dark ? "border-white/40" : "border-brand-green-900/30",
                    isOpen && (dark ? "rotate-45 bg-white text-brand-green-900" : "rotate-45 bg-brand-green-900 text-white"),
                  )}
                >
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("grid transition-[grid-template-rows,opacity,padding] duration-200", isOpen ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className={cn("text-sm leading-relaxed sm:text-base", dark ? "text-white/75" : "text-ink/75")}>
                  {item.detail}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
