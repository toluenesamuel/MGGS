import { Link } from "@/router/router";

/**
 * Header lockup: the school crest beside the group name.
 *
 * The crest is the official mark (crop of the school's logo without the red
 * wordmark, which the live type sets here instead so it stays selectable text
 * and sharp at every zoom). The name is real text, never baked into an image.
 */
export function HeaderBrand({ onClick }: { onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="focus-ring flex items-center gap-2.5">
      <img
        src="/images/mggs-mark.png"
        alt=""
        width={44}
        height={39}
        className="h-10 w-auto shrink-0 sm:h-11"
      />
      <span className="font-display leading-tight">
        <span className="block text-[11px] font-extrabold uppercase leading-tight tracking-[0.04em] text-brand-green-900 sm:text-[13px]">
          Marvellous Greatness
        </span>
        <span className="block text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-brand-coral-ink sm:text-[11px]">
          Group of Schools
        </span>
      </span>
    </Link>
  );
}
