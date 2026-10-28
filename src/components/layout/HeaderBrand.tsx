import { Link } from "@/router/router";
import { siteInfo } from "@/data/site";

export function HeaderBrand({ onClick }: { onClick?: () => void }) {
  return <Link to="/" onClick={onClick} className="focus-ring flex items-center gap-2.5">
    <span aria-hidden="true" className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-900 text-[10px] font-extrabold tracking-tight text-white sm:text-[11px]">{siteInfo.monogram}</span>
    <span className="font-display leading-tight"><span className="block text-[10px] font-extrabold uppercase tracking-[0.06em] text-brand-green-900 sm:text-xs">Marvelous Greatness</span><span className="block text-[9px] font-semibold uppercase tracking-[0.14em] text-brand-coral-ink sm:text-[10px]">Schools · Ibadan</span></span>
  </Link>;
}
