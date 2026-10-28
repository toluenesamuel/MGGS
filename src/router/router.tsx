import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface RouterContextValue {
  path: string;
  query: URLSearchParams;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextValue | null>(null);

function readHash(): { path: string; query: URLSearchParams } {
  const raw = window.location.hash.replace(/^#/, "") || "/";
  const [path, queryString] = raw.split("?");
  const normalized = path.replace(/\/+$/, "") || "/";
  return { path: normalized, query: new URLSearchParams(queryString ?? "") };
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [{ path, query }, setState] = useState(readHash);

  useEffect(() => {
    const onHashChange = () => setState(readHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    // Scroll to top on route change (but not on in-page hash anchors handled separately)
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [path]);

  const navigate = useCallback((to: string) => {
    if (window.location.hash.replace(/^#/, "") === to) {
      setState(readHash());
      return;
    }
    window.location.hash = to;
  }, []);

  const value = useMemo(() => ({ path, query, navigate }), [path, query, navigate]);

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used within RouterProvider");
  return ctx;
}

export function Link({
  to,
  children,
  className,
  onClick,
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  const { navigate } = useRouter();
  return (
    <a
      href={`#${to}`}
      className={className}
      onClick={(e) => {
        e.preventDefault();
        onClick?.();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
