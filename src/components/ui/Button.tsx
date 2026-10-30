import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link } from "@/router/router";
import { cn } from "@/utils/cn";

type Variant = "solid-coral" | "solid-green" | "outline-white" | "outline-green" | "text";
type Size = "sm" | "md";

const variantClasses: Record<Variant, string> = {
  "solid-coral":
    "bg-brand-coral text-white hover:bg-brand-coral-light focus-visible:ring-brand-green-900",
  "solid-green":
    "bg-brand-green-900 text-white hover:bg-brand-green-700 focus-visible:ring-brand-gold",
  "outline-white":
    "border-2 border-white text-white hover:bg-white hover:text-brand-green-900",
  "outline-green":
    "border-2 border-brand-green-900 text-brand-green-900 hover:bg-brand-green-900 hover:text-white",
  text: "text-brand-green-900 hover:text-brand-coral-ink underline-offset-4 hover:underline px-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm md:text-base",
};

const base =
  "inline-flex items-center justify-center gap-2 font-semibold tracking-wide uppercase transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none min-h-11";

interface CommonProps {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
}

export function Button({
  variant = "solid-coral",
  size = "md",
  children,
  className,
  icon,
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(base, variantClasses[variant], variant !== "text" && sizeClasses[size], className)}
      {...rest}
    >
      {children}
      {icon}
    </button>
  );
}

export function LinkButton({
  to,
  variant = "solid-coral",
  size = "md",
  children,
  className,
  icon,
}: CommonProps & { to: string }) {
  return (
    <Link
      to={to}
      className={cn(base, variantClasses[variant], variant !== "text" && sizeClasses[size], className)}
    >
      {children}
      {icon}
    </Link>
  );
}

export function ExternalLinkButton({
  href,
  variant = "outline-green",
  size = "md",
  children,
  className,
  icon,
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a
      href={href}
      className={cn(base, variantClasses[variant], variant !== "text" && sizeClasses[size], className)}
      {...rest}
    >
      {children}
      {icon}
    </a>
  );
}
