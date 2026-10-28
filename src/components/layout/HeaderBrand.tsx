import { Link } from "@/router/router";

export function HeaderBrand({ onClick }: { onClick?: () => void }) {
  return <Link to="/" onClick={onClick} className="focus-ring flex items-center gap-2.5">
    <span aria-hidden="true" className="font-display flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green-900 text-sm font-extrabold text-white">BH</span>
    <span className="font-display leading-tight"><span className="block text-sm font-extrabold uppercase tracking-wide text-brand-green-900">Branksome Hall</span><span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-coral-ink">Design-study reconstruction</span></span>
  </Link>;
}

