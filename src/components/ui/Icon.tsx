/**
 * Drawn icon set.
 *
 * Every glyph is authored here as a 24×24 stroke icon (1.6 stroke, round caps)
 * so the whole site speaks one icon language. Emoji are deliberately not used:
 * they render differently on every platform, cannot inherit the palette, and
 * read as placeholders rather than design.
 *
 * Data files and CMS entries refer to an icon by name (`"discipline"`), which
 * keeps content decoupled from markup. `Icon` falls back to a neutral mark for
 * unknown names so new content never renders an empty box.
 */
import type { SVGProps } from "react";
import { cn } from "@/utils/cn";

export type IconName =
  | "discipline"
  | "dedication"
  | "achievement"
  | "greatness"
  | "learning"
  | "target"
  | "compass"
  | "partnership"
  | "communication"
  | "star"
  | "search"
  | "arrow-right"
  | "menu"
  | "close"
  | "chevron-down";

type Paths = { d: string; dashed?: boolean }[];

const paths: Record<IconName, Paths> = {
  // A bell: order and routine.
  discipline: [
    { d: "M6 16v-4a6 6 0 0 1 12 0v4l1.6 2.4H4.4L6 16Z" },
    { d: "M10 19.5a2.2 2.2 0 0 0 4 0" },
  ],
  // Hands joined: commitment and effort shared.
  dedication: [
    { d: "M3 12.5 7 9l3.4 2.6a1.9 1.9 0 0 0 2.4 0L16 9l5 3.5" },
    { d: "M3 12.5V17l4.5 3h9L21 17v-4.5" },
  ],
  // A rising bar chart under a rule: measured progress.
  achievement: [
    { d: "M4 19h16" },
    { d: "M7 19v-5" },
    { d: "M12 19v-9" },
    { d: "M17 19v-13" },
  ],
  // A laurel-wrapped star: the motto.
  greatness: [
    { d: "m12 4 2.1 4.6 5 .6-3.7 3.4 1 5-4.4-2.5-4.4 2.5 1-5L4.9 9.2l5-.6L12 4Z" },
  ],
  // An open book.
  learning: [
    { d: "M12 7.2C10.4 5.9 8.3 5.2 5 5.2v11.4c3.3 0 5.4.7 7 2 1.6-1.3 3.7-2 7-2V5.2c-3.3 0-5.4.7-7 2Z" },
    { d: "M12 7.2v11.4" },
  ],
  // Concentric rings: aim and precision.
  target: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" },
    { d: "M12 13.2a1.2 1.2 0 1 0 0-2.4 1.2 1.2 0 0 0 0 2.4Z" },
  ],
  // Compass needle: steady direction.
  compass: [
    { d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" },
    { d: "m15.2 8.8-2 4.4-4.4 2 2-4.4 4.4-2Z" },
  ],
  // Two figures: school and home side by side.
  partnership: [
    { d: "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" },
    { d: "M3.5 19.5v-1.2A4.3 4.3 0 0 1 7.8 14h2.4a4.3 4.3 0 0 1 4.3 4.3v1.2" },
    { d: "M16 10.4a2.6 2.6 0 1 0 0-5.2" },
    { d: "M17 14h.4a3.6 3.6 0 0 1 3.6 3.6v1.9" },
  ],
  // Two speech marks: keeping families informed.
  communication: [
    { d: "M4 6.5h11a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H8l-4 3.2V6.5Z" },
    { d: "M20 9.5v5.9L17 13" },
  ],
  star: [{ d: "m12 4.5 2.2 4.8 5.3.7-3.9 3.6 1 5.2-4.6-2.6-4.6 2.6 1-5.2L4.5 10l5.3-.7L12 4.5Z" }],
  search: [
    { d: "M10.8 17.6a6.8 6.8 0 1 0 0-13.6 6.8 6.8 0 0 0 0 13.6Z" },
    { d: "m15.8 15.8 4.2 4.2" },
  ],
  "arrow-right": [
    { d: "M4 12h15" },
    { d: "m13 6 6 6-6 6" },
  ],
  menu: [
    { d: "M3.5 7h17" },
    { d: "M3.5 12h17" },
    { d: "M3.5 17h17" },
  ],
  close: [
    { d: "m6 6 12 12" },
    { d: "m18 6-12 12" },
  ],
  "chevron-down": [{ d: "m6 9.5 6 6 6-6" }],
};

const fallback: Paths = [{ d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" }];

/** Look up an icon by name; unknown names get a neutral ring. */
export function Icon({
  name,
  className,
  ...rest
}: { name: IconName | (string & {}) } & SVGProps<SVGSVGElement>) {
  const shape = paths[name as IconName] ?? fallback;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={cn("h-6 w-6", className)}
      {...rest}
    >
      {shape.map((path) => (
        <path key={path.d} d={path.d} />
      ))}
    </svg>
  );
}
