import { useId, useState } from "react";
import { Icon } from "@/components/ui/Icon";
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
      className={cn("space-y-1", className)}
    >
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <li
            key={item.title}
            className={cn(
              "rounded-lg transition-colors duration-200",
              dark ? "hover:bg-white/6" : "hover:bg-surface-muted",
              isOpen && (dark ? "bg-white/6" : "bg-surface-muted"),
              itemClassName,
            )}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "focus-ring flex w-full items-center justify-between gap-4 px-4 py-4 text-left font-display text-base font-bold sm:px-5 sm:text-lg",
                  dark ? "text-white" : "text-brand-green-900",
                )}
              >
                <span>{item.title}</span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-[transform,background-color,color] duration-200 ease-[var(--motion-ease)]",
                    dark ? "bg-white/12 text-white" : "bg-brand-green-100 text-brand-green-900",
                    isOpen && "rotate-180",
                  )}
                >
                  <Icon name="chevron-down" className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn("grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--motion-ease)]", isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <div className="overflow-hidden">
                <p className={cn("px-4 pb-5 text-sm leading-relaxed sm:px-5 sm:text-base", dark ? "text-white/75" : "text-ink/75")}>
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
