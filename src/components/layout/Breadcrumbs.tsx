import { Link } from "@/router/router";

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex flex-wrap items-center gap-1.5 text-white/80">
        <li>
          <Link to="/" className="focus-ring hover:text-white hover:underline">
            Home
          </Link>
        </li>
        {trail.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-1.5">
            <span aria-hidden="true">/</span>
            {crumb.to && i !== trail.length - 1 ? (
              <Link to={crumb.to} className="focus-ring hover:text-white hover:underline">
                {crumb.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-white">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
