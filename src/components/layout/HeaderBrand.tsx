import { Link } from "@/router/router";

export function HeaderBrand({ onClick }: { onClick?: () => void }) {
  return <Link to="/" onClick={onClick} className="focus-ring flex items-center gap-2.5">
    <img
      src="/images/mggs-logo.png"
      alt=""
      width={44}
      height={44}
      className="h-10 w-10 shrink-0 rounded-full sm:h-11 sm:w-11"
    />
    <span className="font-display leading-tight">
      <span className="block text-[10px] font-extrabold uppercase tracking-[0.05em] text-brand-green-900 sm:text-xs">
        Marvellous Greatness
      </span>
      <span className="block text-[9px] font-semibold uppercase tracking-[0.1em] text-brand-coral-ink sm:text-[10px]">
        Group of Schools
      </span>
    </span>
  </Link>;
}
