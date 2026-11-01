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
      <span className="block text-[11px] font-extrabold uppercase leading-tight tracking-[0.04em] text-brand-green-900 sm:text-[13px]">
        Marvellous Greatness
      </span>
      <span className="block text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] text-brand-coral-ink sm:text-[11px]">
        Group of Schools
      </span>
    </span>
  </Link>;
}
